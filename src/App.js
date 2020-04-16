import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { checkLoginStatus, loggedIn, notLoggedIn } from './actions';
import { connect } from 'react-redux';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    console.log("mounting")
    this.props.checkLoginStatus();
  }

  handleLogin(data) {
    console.log("handling login", data)
    this.props.loggedIn(data);
  }

  handleLogout() {
    this.props.notLoggedIn();
  }

  render() {
    // const { notLoggedIn, loggedIn } = this.props
    console.log("app props >", this.props)
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.props.status.login}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={props => (
                <Dashboard {...props} loggedInStatus={this.props.status.login} />)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.status
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  loggedIn: (data) => dispatch(loggedIn(data)),
  notLoggedIn: () => dispatch(notLoggedIn())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
