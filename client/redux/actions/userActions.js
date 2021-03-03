import { FETCH_USERS, NEW_USER } from './types';

export const fetchUsers = () => dispach => {
  fetch('http://localhost:3000/api/grabUserLoginData', {
    method: 'GET'
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
  console.log('action called', userData);
  dispach({
    type: NEW_USER,
    payload: userData
  });
  // fetch('http://localhost:3000/api/UserSignUp', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  // })
  //     .then(res => {
  //         return res.json();
  //     })
  //     .then(data => dispach({
  //         type: NEW_USER,
  //         payload: userData
  //     }))
  //     .catch(err => {
  //         console.error(err);
  //     });
};
