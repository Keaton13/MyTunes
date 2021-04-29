import {
  AUTHORIZE_USER_SPOTIFY,
  SAVE_SPOTIFY_TOKEN,
  GRAB_USER_MOST_PLAYED_SPOTIFY,
  GRAB_USER_RECENTLY_PLAYED_TRACKS,
  CHECK_USER_AUTH_TOKEN,
  SAVE_DUPLICATE_TRACKS,
  SAVE_DUPLICATE_ARTISTS,
  SAVE_TOP_TRACKS,
  SAVE_TOP_ARTISTS
} from '../actions/types';

const initalState = {
  tokenData: {},
  auth: {
    status: false
  },
  mostPlayedTracks: {},
  recentlyPlayedTracks: {},
  duplicateTracks: {},
  duplicateArtists: {},
  topTracks: {},
  topArtists: {},
  duplicateStatus: false
};

export default function (state = initalState, action) {
  switch (action.type) {
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
    case SAVE_DUPLICATE_TRACKS:
      return {
        ...state,
        duplicateTracks: action.payload,
        duplicateStatus: true
      };
    case SAVE_DUPLICATE_ARTISTS:
      return {
        ...state,
        duplicateArtists: action.payload
      };
    case SAVE_TOP_TRACKS:
      return {
        ...state,
        topTracks: action.payload
      };
    case SAVE_TOP_ARTISTS:
      return {
        ...state,
        topArtists: action.payload
      };
    default:
      return state;
  }
}
