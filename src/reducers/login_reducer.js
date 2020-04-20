import { NOT_LOGGED_IN, LOGGED_IN } from '../actions';

const defaultState = {
  login: NOT_LOGGED_IN,
  data: {},
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NOT_LOGGED_IN:
      return defaultState;
    case LOGGED_IN:
      return ({
        login: LOGGED_IN,
        user: action.data.user,
      });
    default:
      return defaultState;
  }
};

export default loginReducer;
