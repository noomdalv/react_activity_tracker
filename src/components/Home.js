import React from 'react';
import Registration from './auth/Registration.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this)
  }

  handleSuccesfulAuth(data) {
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Status: {this.props.loggedInStatus}</h2>
        <Registration handleSuccesfulAuth={this.handleSuccesfulAuth} />
      </div>
    );
  }
}

export default Home;
