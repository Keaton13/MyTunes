let lastId = 0;

export default function reducer(state = [], action) {
  if (action.type === 'userAdded') {
    return [
      ...state,
      {
        id: ++lastId,
        userName: action.payload.user,
        password: action.payload.password,
        resolved: false
      }
    ];
  } else if (action.type === 'User Added') {
    return state.filter(bug => bug.id !== action.payload.id);
  } else {
    return state;
  }

}
