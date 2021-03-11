import { FETCH_USERS, NEW_USER, AUTHORIZE_USER_SPOTIFY, SAVE_SPOTIFY_TOKEN } from '../actions/types';

const initalState = {
  user: [],
  userData: {
    username: null,
    password: null,
  },
  signUpFormData: {},
  tokenData: {}

};

export default function (state = initalState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        signUpFormData: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        signUpFormData: action.payload
      };
    case AUTHORIZE_USER_SPOTIFY:
      return {
        ...state,
        tokenData: action.payload
      }
    case SAVE_SPOTIFY_TOKEN:
      return {
        ...state,
        tokenData: action.payload
      }
    default:
      return state;
  }
}
