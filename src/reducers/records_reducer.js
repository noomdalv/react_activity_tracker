import { LOAD_RECORDS } from '../actions';

const initialState = {
  records: {},
};

const recordsReducer = (state = initialState, action) => {
  if (action.type === LOAD_RECORDS) {
    return action.data;
  }
  return state;
};

export default recordsReducer;
