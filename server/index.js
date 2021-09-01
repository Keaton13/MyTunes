require('dotenv/config');
const express = require('express');
const jwt = require('jwt-simple');
const { jwtSecret } = require('./config/jwt');
const hash = require('./lib/hash');
const db = require('./database');
const ClientError = require('./client-error');
const cors = require('cors');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();
// const { profile } = require('console');
// const querystring = require('querystring');
// const bodyParser = require('body-parser');

app.use(cors());
app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/authorizeUserSpotify', async (req, res, next) => {
  try {
    const scopes = 'user-read-private user-read-email user-top-read user-library-read user-library-modify user-read-recently-played playlist-read-private playlist-modify-private playlist-modify-public';
    const url = 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + process.env.CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(process.env.REDIRECT_URL);
    res.send({
      status: true,
      data: {
        url: url
      }
    });

  } catch (error) {
    next(error);
  }

});

app.get('/api/grabSpotifyUserToken', async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { rows: data = [] } = await db.query(`
    SELECT * FROM "tokenData" WHERE "userId" != ${userId}`
    );
    res.send({
      status: true,
      data: data
    });

  } catch (error) {
    next(error);
  }

});

app.post('/api/saveSpotifyUserToken', async (req, res, next) => {
  try {
    const { token } = req.body;
    // console.log('token ' + token)
    const userId = req.session.userId;
    // console.log(userId);
    const { rows: [tokenData] } = await db.query(`SELECT * FROM "tokenData" WHERE "user_id" = ${userId}`);
    // console.log('Query result ' + tokenData);
    req.session.token = token;
    if (tokenData === undefined) {
      try {
        const { rows: [tokenData] } = await db.query(`
          INSERT INTO "tokenData" 
          ("user_id", spotify_token)
          VALUES ($1, $2)`,
          [req.session.userId, token]
        );

        res.send({
          status: 200,
          message: 'Added spotify api key'
        });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const { rows: [tokenData] } = await db.query(`
          UPDATE "tokenData" 
          SET "spotify_token" = $1 WHERE "user_id" = ${req.session.userId}
          `,
          [token]
        );
        res.send({
          status: 200,
          message: 'Updated spotify api key'
        });
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
  // let token = req.body
  // const token = await db.query(`
  //   INSERT INTO "tokenData"
  //   ("user_id", "spotify_token")
  //   VALUES ($1, $2)
  //   returning "user_id"`,
  //   [res.session.userId, token])
});

app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const errorMessage = 'Invalid email/password combination';

    if (!username) throw new ClientError('Missing users username', 422);
    if (!password) throw new ClientError('Missing users password', 422);

    const { rows: [user = null] } = await db.query(`
      SELECT "user_id", "password" FROM "users"
      WHERE "username" = $1`,
      [username]
    );

    if (!user) {
      throw new ClientError(errorMessage, 500);
    }

    const passMatch = await hash.compare(password, user.password);

    if (!passMatch) {
      throw new ClientError(errorMessage, 401);
    }

    // Create an object with 2 properties save it into a const named "tokenData"
    // - "userId" | set to user.userId
    // - "ts" | set to the current Unix timestamp
    const tokenData = {
      userId: user.userId,
      ts: 1588731932
    };
    req.session.userId = user.user_id;
    req.session.save();
    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    const token = jwt.encode(tokenData, jwtSecret);

    // Send the token to the client
    res.send({
      Token: token,
      userName: username,
      userId: user.user_id,
      status: 200
    });
  } catch (error) {
    res.sendStatus(401)
  }
});

app.post('/api/UserSignUp', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    if (!username) throw new ClientError(`${username} username is not defined`, 404);
    if (!password) throw new ClientError(`${password} password is not defined`, 404);

    const passHash = await hash.generate(password);

    let insertId = null;

    try {
      const { rows: [newUser] } = await db.query(`
        INSERT INTO "users"
        ("username", "password")
        VALUES ($1, $2)
        returning "user_id"`,
        [username, passHash]
      );
      // console.log(newUser);
      insertId = newUser.user_id;
      if (req.session.userId === undefined) {
        req.session.userId = insertId;
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ClientError('email already in use', 422);
      }
      throw new ClientError('error saving user', 500);
    }

    // Create an object with 2 properties save it into a const named "tokenData"
    // - "userId" | set to insertId
    // - "ts" | set to the current Unix timestamp
    const tokenData = {
      user_id: insertId,
      ts: 1588731932,
      status: 200
    };

    const token = jwt.encode(tokenData, jwtSecret);
    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    res.send({
      token: token,
      userId: insertId,
      userName: username,
      status: 200
    });

    // Send the token to the client

  } catch (error) {
    next(error);
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
