import { LOAD_RECORDS } from '../actions';

const initialState = {
  records: {}
}

const recordsReducer = (state = initialState, action) => {
  if(action.type === LOAD_RECORDS) {
    console.log("load records reducer executed", action)
    return action.data;
  }
  return initialState;
}

export default recordsReducer;
