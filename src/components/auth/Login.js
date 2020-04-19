import React from 'react';
import axios from 'axios';
import { handleSuccesfulAuth } from '../../actions';
import { checkLoginStatus } from '../../actions';
import Footer from '../nav/Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Login.module.css';

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

  componentDidMount() {
    const { checkLoginStatus } = this.props
    checkLoginStatus();
    console.log("mounted login, checkLoginStatus")
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
      <div id={styles.login}>
        <form id={styles.loginForm} onSubmit={this.handleSubmit}>
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
        <button id={styles.loginBtn} type="submit">Login</button>
        </form>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  handleSuccesfulAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleSuccesfulAuth: data => dispatch(handleSuccesfulAuth(data)),
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});

export default connect(null, mapDispatchToProps)(Login);
