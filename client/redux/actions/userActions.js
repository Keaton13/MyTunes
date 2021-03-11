import { FETCH_USERS, NEW_USER, AUTHORIZE_USER_SPOTIFY, SAVE_SPOTIFY_TOKEN } from './types';
import axios from 'axios';

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
      'Accept': 'application/json',
      'mode': 'no-cors',
    }
  })
    .then(res => {
      const data = res.json();
      return data
    })
    .then(data => {
      let url = data.data.url
      window.location = url;
      return window.location.href;
    })
    .then(url => {
      dispach({
        // window.location = url;
        type: AUTHORIZE_USER_SPOTIFY,
        payload: url
      })
    })
    .catch(err => {
      console.error(err);
    });

}

export const saveSpotifyUserToken = token => dispach => {
  if (window.location.href.length >= 32) {
    console.log(token);
    fetch('http://localhost:3000/api/saveSpotifyUserToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: token})
    })
      .then(res => {
        console.log(res)
        return res
      })
      .then(data => {
        console.log(data);
        // dispach({
        //   // window.location = url;
        //   type: AUTHORIZE_USER_SPOTIFY,
        //   payload: data
        // })
      })
      .catch(err => {
        console.error(err);
      });
    dispach({
      type: SAVE_SPOTIFY_TOKEN,
      payload: token
    })
  }
}