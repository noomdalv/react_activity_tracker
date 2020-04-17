import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Login from '../auth/Login';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccesfulAuth(data) {
    const { handleLogin, history } = this.props;
    handleLogin(data);
    history.push('/dashboard');
  }

  handleLogoutClick() {
    const { handleLogout } = this.props;
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        console.log('handle logout response >', response);
        handleLogout();
      })
      .catch(error => {
        console.error('Logout error', error);
      });
  }

  render() {
    const { status } = this.props;
    return (
      <div>
        <h1>Home</h1>
        <h2>
          Status:
          {status.login}
        </h2>
        <button type="button" onClick={() => this.handleLogoutClick()}>Logout</button>        
        <Login handleSuccesfulAuth={this.handleSuccesfulAuth} />
      </div>
    );
  }
}

Home.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
