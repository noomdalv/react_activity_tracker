import axios from 'axios';
import { history } from '../App';

export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOAD_RECORDS = 'LOAD_RECORDS';

export const notLoggedIn = () => ({
  type: NOT_LOGGED_IN,
  data: {},
});

export const loggedIn = data => ({
  type: LOGGED_IN,
  data,
});

export const loadRecords = data => ({
  type: LOAD_RECORDS,
  data,
});

export const fetchRecords = id => dispatch => {
  axios.get(`http://localhost:3001/records/?id=${id}`, { withCredentials: true })
    .then(response => {
      if (response.status === 200) {
        dispatch(loadRecords(response.data));
      }
    });
};

export const handleSuccesfulAuth = data => dispatch => {
  dispatch(loggedIn(data));
};

export const handleLogout = () => dispatch => {
  axios.delete('http://localhost:3001/logout', { withCredentials: true })
    .then(() => {
      dispatch(notLoggedIn());
      history.push('/login');
    });
};
