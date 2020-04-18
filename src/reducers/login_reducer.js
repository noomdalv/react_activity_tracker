import { NOT_LOGGED_IN, LOGGED_IN } from '../actions';

const defaultState = {
  login: NOT_LOGGED_IN,
  data: {},
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NOT_LOGGED_IN:
      console.log('reducer not_logged_in action >', action);
      return state;
    case LOGGED_IN:
      console.log('reducer logged_in action >', action);
      return ({
        login: LOGGED_IN,
        user: action.data.user,
      });
    default:
      console.log('reducer defaulState >', defaultState);
      return state;
  }
};

export default loginReducer;
