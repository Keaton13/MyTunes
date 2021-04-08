import { AUTHORIZE_USER_SPOTIFY, SAVE_SPOTIFY_TOKEN, GRAB_USER_MOST_PLAYED_SPOTIFY, GRAB_USER_RECENTLY_PLAYED_TRACKS, CHECK_USER_AUTH_TOKEN } from './types';

export const authorizeUserSpotify = () => dispach => {
  fetch('http://localhost:3000/api/authorizeUserSpotify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      mode: 'no-cors'
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      const url = data.data.url;
      window.location = url;
      return window.location.href;
    })
    .then(url => {
      dispach({
        // window.location = url;
        type: AUTHORIZE_USER_SPOTIFY,
        payload: url
      });
    })
    .catch(err => {
      console.error(err);
    });

};

export const saveSpotifyUserToken = token => dispach => {
  if (window.location.href.length >= 32) {
    fetch('http://localhost:3000/api/saveSpotifyUserToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
      .then(res => {
        return res;
      })
      .then(data => {
        dispach({
          // window.location = url;
          type: SAVE_SPOTIFY_TOKEN,
          payload: token
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export const grabUserMostPlayedSpotify = token => dispach => {
  fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: GRAB_USER_MOST_PLAYED_SPOTIFY,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const grabUserRecentlyPlayedSpotify = token => dispach => {
  fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: GRAB_USER_RECENTLY_PLAYED_TRACKS,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const checkUserAuthToken = () => dispach => {
  console.log('token ', token)
  fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      const data = res.json();
      return data;
    })
    .then(data => {
      dispach({
        // window.location = url;
        type: CHECK_USER_AUTH_TOKEN,
        payload: data
      });
    })
    .catch(err => {
      console.error(err);
    });
};
