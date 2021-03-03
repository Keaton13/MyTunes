require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/grabUserLoginData', async (req, res, next) => {
  // if (!req.user) {
  //   throw new ClientError('Not authorized', 401);
  // }
  // const { rows: products = [] } = await db.query(`SELECT * FROM "users" WHERE "user_id" != ${req.session.userId}`);
  const dummyData = {
    username: 'Modzzz',
    password: 'test'
  };
  res.status(200).send(dummyData);
});

app.post('/api/UserSignUp', async (req, res, next) => {
  console.log(req.body);
  // try {
  //   const {username, password} = req.body;
  //   if (!email) throw new ClientError(`${email} email is not defined`, 404);
  //   if (!password) throw new ClientError(`${password} password is not defined`, 404);

  //   const passHash = await hash.generate(password);

  //   let insertId = null;

  //   try {
  //     const { rows: [newUser] } = await db.query(`
  //       INSERT INTO "users"
  //       ("username", "password")
  //       VALUES ($1, $2)
  //       returning "user_id"`,
  //     [username, passHash]
  //     );
  //     // console.log(newUser);
  //     insertId = newUser.user_id;
  //     if (req.session.userId === undefined) {
  //       req.session.userId = insertId;
  //     }
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       throw new ClientError('email already in use', 422);
  //     }
  //     throw new ClientError('error saving user', 500);
  //   }

  //   // Create an object with 2 properties save it into a const named "tokenData"
  //   // - "userId" | set to insertId
  //   // - "ts" | set to the current Unix timestamp
  //   const tokenData = {
  //     user_id: insertId,
  //     ts: 1588731932
  //   };

  //   const token = jwt.encode(tokenData, jwtSecret);
  //   // Use jwt to encode the tokenData object
  //   // Save the token into a const named "token"
  //   res.send({
  //     token: token,
  //     userId: insertId,
  //     userName: username
  //   });

  //   // Send the token to the client

  // } catch (error) {
  //   next(error);
  // }
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
