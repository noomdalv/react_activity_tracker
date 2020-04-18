import axios from 'axios';
import { history } from '../App';

export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGGED_IN = 'LOGGED_IN';

export const notLoggedIn = () => ({
  type: NOT_LOGGED_IN,
  data: {},
});

export const loggedIn = data => ({
  type: LOGGED_IN,
  data,
});

export const handleSuccesfulAuth = data => dispatch => {
  dispatch(loggedIn(data));
  history.push('/dashboard');
}

export const handleLogout = (event) => dispatch => {  
  axios.delete('http://localhost:3001/logout', { withCredentials: true })
    .then(response => {
      console.log('handle logout response >', response);
      dispatch(notLoggedIn());
      history.push('/');
    })
    .catch(error => {
      console.error('Logout error', error);
    });
}


export const checkLoginStatus = () => (dispatch, getState) => {
  axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    .then(response => {
      console.log("checkLoginStatus response >", response)
      if (response.data.logged_in && getState().status.login === 'NOT_LOGGED_IN') {
        console.log("logged in")
        dispatch(loggedIn(response.data));
      } else if (!response.data.logged_in && getState().status.login === 'LOGGED_IN') {
        console.log("not logged in")
        dispatch(notLoggedIn());
      }
    })
    .catch(error => {
      console.error('logged in error =>', error);
    });
};
