import {
  AUTHORIZE_USER_SPOTIFY,
  SAVE_SPOTIFY_TOKEN,
  GRAB_USER_MOST_PLAYED_SPOTIFY,
  GRAB_USER_RECENTLY_PLAYED_TRACKS,
  SAVE_DUPLICATE_TRACKS,
  SAVE_DUPLICATE_ARTISTS,
  SAVE_TOP_TRACKS,
  SAVE_TOP_ARTISTS,
  SAVE_SPOTIFY_RECOMMENDATIONS,
  SAVE_SPOTIFY_CURRENTLY_PLAYING,
  SAVE_SPOTIFY_LIKED_STATUS,
  SAVE_USERS_SPOTIFY_PLAYLISTS,
  SAVE_USERS_SPOTIFY_PROFILE,
  SAVE_TRACK_TO_SPOTIFY_PLAYLIST,
  CHECK_USER_AUTH_TOKEN,
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
  duplicateStatus: false,
  spotifyRecommended: {},
  spotifyRecommendedStatus: false,
  currentlyPlaying: {},
  youtubeSearch: {},
  spotifyLikedStatus: null,
  spotifyUserPlaylists: null,
  spotifyUserProfile: null,
  spotifyAddToPlaylistStatus: null
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
    case SAVE_SPOTIFY_RECOMMENDATIONS:
      return {
        ...state,
        spotifyRecommended: action.payload,
        spotifyRecommendedStatus: true
      };
    case SAVE_SPOTIFY_CURRENTLY_PLAYING:
      return {
        ...state,
        currentlyPlaying: action.payload
      };
    case SAVE_SPOTIFY_LIKED_STATUS:
      return {
        ...state,
        spotifyLikedStatus: action.payload
      };
    case SAVE_USERS_SPOTIFY_PLAYLISTS:
      return {
        ...state,
        spotifyUserPlaylists: action.payload
      };
    case SAVE_USERS_SPOTIFY_PROFILE:
      return {
        ...state,
        spotifyUserProfile: action.payload
      };
    case SAVE_TRACK_TO_SPOTIFY_PLAYLIST:
      return {
        ...state,
        spotifyAddToPlaylistStatus: action.payload
      };
    case CHECK_USER_AUTH_TOKEN:
      return {
        ...state,
        tokenData: action.payload
      }
    default:
      return state;
  }
}
