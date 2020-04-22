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
  axios.get(`https://activitytrackerapi.herokuapp.com/?id=${id}`)
    .then(response => {
      console.log('fetchrecords response', response);
      console.log('fetchrecords url', `https://activitytrackerapi.herokuapp.com/?id=${id}`);
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
  axios.delete('https://activitytrackerapi.herokuapp.com/logout')
    .then(response => {
      console.log('handleLogout response', response);
      dispatch(notLoggedIn());
      history.push('/login');
    })
    .catch(error => {
      console.error('Logout error', error);
    });
};
