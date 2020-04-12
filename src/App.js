import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {

      }
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/"
              render={props => (<Home {...props}
                handleLogin={this.handleLogin}
                loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path="/dashboard"
              render={props => (
                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          </Switch>
        </Router>
      </div>
    )
  }
};

export default App;
