import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoginStatus, loggedIn, notLoggedIn } from './actions';
import Navbar from './components/nav/Navbar';
import Home from './components/nav/Home';
import Dashboard from './components/nav/Dashboard';
import Registration from './components/auth/Registration';

export const history = createBrowserHistory()

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Registration} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  notLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  loggedIn: data => dispatch(loggedIn(data)),
  notLoggedIn: () => dispatch(notLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
