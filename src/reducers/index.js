import { combineReducers } from 'redux';
import loginReducer from './login_reducer';

const rootReducer = combineReducers({
  status: loginReducer,
});

export default rootReducer;
