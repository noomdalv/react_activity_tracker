import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSuccesfulAuth } from '../../actions';
import { history } from '../../App';
import Footer from '../nav/Footer';
import styles from './Login.module.css';

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
    axios.post('https://activitytrackerapi.herokuapp.com/registrations', {
      user: {
        name,
        email,
        password,
        passwordConfirmation,
      },
    }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          const { handleSuccesfulAuth } = this.props;
          handleSuccesfulAuth(response.data);
          history.push('/dashboard');
        }
      })
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
      <div className={styles.signup}>
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
            name="passwordConfirmation"
            placeholder="Password confirmation"
            value={passwordConfirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
        <Footer />
      </div>
    );
  }
}

Registration.propTypes = {
  handleSuccesfulAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleSuccesfulAuth: data => dispatch(handleSuccesfulAuth(data)),
});


export default connect(null, mapDispatchToProps)(Registration);
