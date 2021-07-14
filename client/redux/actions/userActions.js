import { FETCH_USERS, NEW_USER, CHANGE_DASHBOARD_DISPLAY } from './types';

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

export const changeDashboardDisplay = view => dispach => {
  // let data = {name: display}
  dispach({
    type: CHANGE_DASHBOARD_DISPLAY,
    payload: view
  });
};
