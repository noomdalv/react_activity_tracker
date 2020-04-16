import React from 'react';
import axios from 'axios';
import Registration from './auth/Registration.js';
import Login from './auth/Login.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccesfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/dashboard');
  }

  handleLogoutClick() {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.error('Logout error', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>
          Status:
          {this.props.loggedInStatus}
        </h2>
        <button type="button" onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccesfulAuth={this.handleSuccesfulAuth} />
        <Login handleSuccesfulAuth={this.handleSuccesfulAuth} />
      </div>
    );
  }
}

export default Home;
