import { combineReducers } from 'redux';
import userReducer from './userReducer';
import genreReducer from './genreReducer';
import spotifyReducer from './spotifyReducer';

export default combineReducers({
  users: userReducer,
  genreData: genreReducer,
  spotifyData: spotifyReducer
});
