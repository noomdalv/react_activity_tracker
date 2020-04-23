import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import loginReducer from './login_reducer';
import recordsReducer from './records_reducer';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  status: loginReducer,
  recordData: recordsReducer,
});

export default persistReducer(persistConfig, rootReducer);
