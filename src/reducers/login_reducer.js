import { NOT_LOGGED_IN, LOGGED_IN } from '../actions';

const defaultState = {
  login: NOT_LOGGED_IN,
  data: {},
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NOT_LOGGED_IN:
      console.log('not logged in');
      return defaultState;
    case LOGGED_IN:
      console.log('logged in');
      return ({
        login: LOGGED_IN,
        user: action.data.user,
      });
    default:
      console.log('default login reducer', action.type);
      return { ...state };
  }
};

export default loginReducer;
