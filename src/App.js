import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoginStatus } from './actions';
import Navbar from './components/nav/Navbar';
import Home from './components/nav/Home';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/nav/Dashboard';
import Stats from './components/nav/Stats';
import RecordHistory from './components/nav/RecordHistory';
import styles from './App.module.css';

export const history = createBrowserHistory();

class App extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    return (
      <Router history={history}>
        <div id={styles.app}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/stats" component={Stats} />
            <Route exact path="/history" component={RecordHistory} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});


export default connect(null, mapDispatchToProps)(App);
