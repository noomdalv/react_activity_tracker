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
  data
})

export const fetchRecords = data => (dispatch, getState) => {
  axios.get("http://localhost:3001/records", { withCredentials: true })
  .then(response => {
    console.log("fetchRecords action response", response)
    if (response.status === 200) {
      dispatch(loadRecords(response.data))
      console.log("fetchRecords action getState", getState())
    }
  })
  .catch(error => {
    console.error('Logout error', error);
  });
}

export const handleSuccesfulAuth = data => dispatch => {
  dispatch(loggedIn(data));
};

export const handleLogout = () => dispatch => {
  axios.delete('http://localhost:3001/logout', { withCredentials: true })
    .then(response => {
      console.log('handle logout response >', response);
      dispatch(notLoggedIn());
      history.push('/login');
    })
    .catch(error => {
      console.error('Logout error', error);
    });
};

export const checkLoginStatus = () => (dispatch, getState) => {
  axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    .then(response => {
      console.log('checkLoginStatus response >', response);
      console.log("checkLoginStatus getState", getState())
      if (response.data.logged_in && getState().status.login === 'NOT_LOGGED_IN') {
        console.log('logged in');
        dispatch(loggedIn(response.data));
      } else if (!response.data.logged_in && getState().status.login === 'LOGGED_IN') {
        console.log('not logged in');
        dispatch(notLoggedIn());
      }
    })
    .catch(error => {
      console.error('logged in error =>', error);
    });
};
