import { combineReducers } from 'redux';
import loginReducer from './login_reducer';
import recordsReducer from './records_reducer';

const rootReducer = combineReducers({
  status: loginReducer,
  recordData: recordsReducer,
});

export default rootReducer;
