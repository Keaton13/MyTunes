import { FETCH_USERS, NEW_USER, CHECK_USER_AUTH_TOKEN } from '../actions/types';

const initalState = {
  user: [],
  userData: {
    username: null,
    password: null
  },
  signUpFormData: {},
  signInData: {}
};

export default function (state = initalState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        signInData: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        signUpFormData: action.payload
      };
    default:
      return state;
  }
}
