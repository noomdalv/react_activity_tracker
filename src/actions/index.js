import axios from 'axios';

export const NOT_LOGGED_IN = "NOT_LOGGED_IN";
export const LOGGED_IN = "LOGGED_IN";

export const notLoggedIn = () => ({
  type: NOT_LOGGED_IN,
  data: {}
});

export const loggedIn = data => ({
  type: LOGGED_IN,
  data: data
});


export const checkLoginStatus = () => dispatch => {
  axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    .then(response => {
      console.log("new response >", response)
      if (response.data.logged_in) {
        dispatch(loggedIn(response.data))
      } else if (!response.data.logged_in) {
        dispatch(notLoggedIn())
      }
    })
    .catch(error => {
      console.error('logged in error =>', error);
    });
}

// export const loadGlobalStats = data => ({
//   type: LOAD_GLOBAL_STATS,
//   globalStats: data,
// });
// export const getGlobalStats = () => dispatch => axios.get('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', {
//   headers: {
//     'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
//     'x-rapidapi-key': '5c719792d4msh7f9766d6d5c3653p1484ccjsn29e5a49c38b4',
//   },
// })
//   .then(response => {
//     const globalStatsArray = response.data;
//     dispatch(loadGlobalStats(globalStatsArray));
//   });
