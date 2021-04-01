import { combineReducers } from 'redux';
import userReducer from './userReducer';
import genreReducer from './genreReducer'

export default combineReducers({
  users: userReducer,
  genreData: genreReducer
});
