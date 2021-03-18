import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_USERS, NEW_USER, AUTHORIZE_USER_SPOTIFY, SAVE_SPOTIFY_TOKEN, GRAB_USER_MOST_PLAYED_SPOTIFY, GRAB_USER_RECENTLY_PLAYED_TRACKS, CHECK_USER_AUTH_TOKEN } from './types';

export const fetchUsers = userData => dispach => {
  fetch('http://localhost:3000/api/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(res => {
      return res.json();
    })
    .then(userInfo => dispach({
      type: FETCH_USERS,
      payload: userInfo
    }))
    .catch(err => {
      console.error(err);
    });
};

export const createUserProfile = userData => dispach => {
  fetch('http://localhost:3000/api/UserSignUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(res => {
      const data = res.json();
      console.log(data);
      return data;
    })
    .then(data => dispach({
      type: NEW_USER,
      payload: data
    }))
    .catch(err => {
      console.error(err);
    });
};

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
    console.log(token);
    fetch('http://localhost:3000/api/saveSpotifyUserToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
      .then(res => {
        console.log(res);
        return res;
      })
      .then(data => {
        console.log(data);
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
  console.log('userAction ', token);
  fetch('https://api.spotify.com/v1/me/top/tracks', {
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
      console.log(data);
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
      console.log(data);
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
      console.log(data);
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
