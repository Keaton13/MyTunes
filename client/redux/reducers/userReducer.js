import { FETCH_USERS, NEW_USER } from '../actions/types';

const initalState = {
  user: [],
  userData: {
    username: null,
    password: null
  },
  signUpFormData: {}

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
    default:
      return state;
  }
}
