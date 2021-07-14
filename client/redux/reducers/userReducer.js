import { FETCH_USERS, NEW_USER, CHANGE_DASHBOARD_DISPLAY } from '../actions/types';

const initalState = {
  user: [],
  userData: {
    username: null,
    password: null
  },
  signUpFormData: {},
  signInData: {},
  dashboardDisplayValue: {
    name: 'Display'
  }
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
    case CHANGE_DASHBOARD_DISPLAY:
      return {
        ...state,
        dashboardDisplayValue: {
          name: action.payload
        }
      };
    default:
      return state;
  }
}
