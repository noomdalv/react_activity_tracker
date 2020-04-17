import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:3001/sessions', {
      user: {
        email,
        password,
      },
    },
    { withCredentials: true })
      .then(response => {
        console.log('handleSubmit response >', response);
        if (response.data.logged_in) {
          const { handleSuccesfulAuth } = this.props;
          console.log('handling success auth');
          handleSuccesfulAuth(response.data);
        }
      })
      .catch(error => {
        console.error('Login error =>', error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleSuccesfulAuth: PropTypes.func.isRequired,
};

export default Login;
