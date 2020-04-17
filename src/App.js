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
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  handleLogin(data) {
    const { loggedIn } = this.props;
    loggedIn(data);
  }

  handleLogout() {
    const { notLoggedIn } = this.props;
    notLoggedIn();
  }

  render() {
    const { status } = this.props;
    return (
      <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                status={status}
              />
            )}
          />
          <Route path="/signup" component={Registration} />
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard {...props} status={status} />)}
          />
        </Switch>
      </Router>
      </div>
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
