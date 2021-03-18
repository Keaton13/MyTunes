import { FETCH_USERS, NEW_USER, AUTHORIZE_USER_SPOTIFY, SAVE_SPOTIFY_TOKEN, GRAB_USER_MOST_PLAYED_SPOTIFY, GRAB_USER_RECENTLY_PLAYED_TRACKS, CHECK_USER_AUTH_TOKEN } from '../actions/types';

const initalState = {
  user: [],
  userData: {
    username: null,
    password: null
  },
  auth: {
    status: false
  },
  signUpFormData: {},
  signInData: {},
  tokenData: {},
  mostPlayedTracks: {},
  recentlyPlayedTracks: {}
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
    case AUTHORIZE_USER_SPOTIFY:
      return {
        ...state,
        tokenData: action.payload
      };
    case SAVE_SPOTIFY_TOKEN:
      return {
        ...state,
        tokenData: {
          token: action.payload
        },
        auth: {
          status: true
        }
      };
    case GRAB_USER_MOST_PLAYED_SPOTIFY:
      return {
        ...state,
        mostPlayedTracks: action.payload
      };
    case GRAB_USER_RECENTLY_PLAYED_TRACKS:
      return {
        ...state,
        recentlyPlayedTracks: action.payload
      };
    default:
      return state;
  }
}
