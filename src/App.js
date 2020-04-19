import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { checkLoginStatus } from './actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './components/nav/Navbar';
import Home from './components/nav/Home';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Dashboard from './components/nav/Dashboard';
import styles from './App.module.css';

export const history = createBrowserHistory()

class App extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props
    checkLoginStatus();
    console.log("mounted app checkLoginStatus")
  }

  render() {
  const { status } = this.props
  console.log("App rendered status...", status)

    return (
      <Router history={history}>
        <div id={styles.app}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
