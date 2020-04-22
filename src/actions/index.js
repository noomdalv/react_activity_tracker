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

export const fetchRecords = () => dispatch => {
  axios.get('https://activitytrackerapi.herokuapp.com/records', { withCredentials: true })
    .then(response => {
      console.log('fetchrecords response', response);
      if (response.status === 200) {
        dispatch(loadRecords(response.data));
      }
    })
    .catch(error => {
      console.error('FetchRecords error', error);
    });
};

export const handleSuccesfulAuth = data => dispatch => {
  dispatch(loggedIn(data));
};

export const handleLogout = () => dispatch => {
  axios.delete('https://activitytrackerapi.herokuapp.com/logout', { withCredentials: true })
    .then(response => {
      console.log('handleLogout response', response);
      dispatch(notLoggedIn());
      history.push('/login');
    })
    .catch(error => {
      console.error('Logout error', error);
    });
};

export const checkLoginStatus = () => (dispatch, getState) => {
  axios.get('https://activitytrackerapi.herokuapp.com/logged_in', { withCredentials: true })
    .then(response => {
      console.log('checkLoginStatus response', response);
      if (response.data.logged_in && getState().status.login === 'NOT_LOGGED_IN') {
        dispatch(loggedIn(response.data));
      } else if (!response.data.logged_in && getState().status.login === 'LOGGED_IN') {
        dispatch(notLoggedIn());
      }
    })
    .catch(error => {
      console.error('checkLoginStatus in error =>', error);
    });
};
