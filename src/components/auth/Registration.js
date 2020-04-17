import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name, email, password, passwordConfirmation,
    } = this.state;
    axios.post('http://localhost:3001/registrations', {
      user: {
        name,
        email,
        password,
        passwordConfirmation,
      },
    },
    { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          const { handleSuccesfulAuth } = this.props;
          handleSuccesfulAuth(response.data);
        }
        console.log('registration response =>', response);
      })
      .catch(error => {
        console.error('Registration error =>', error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      name, email, password, passwordConfirmation,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChange}
            required
          />

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

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={passwordConfirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

Registration.propTypes = {
  handleSuccesfulAuth: PropTypes.func.isRequired,
};

export default Registration;
