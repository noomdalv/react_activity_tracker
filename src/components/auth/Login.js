import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSuccesfulAuth } from '../../actions';
import { history } from '../../App';
import Footer from '../nav/Footer';
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

  handleSubmit(event) {
    event.preventDefault();
    document.getElementById("alertmsg").style.visibility = "hidden";
    const { email, password } = this.state;
    axios.post('https://activitytrackerapi.herokuapp.com/sessions', {
      user: {
        email,
        password,
      },
    }, { withCredentials: true })
      .then(response => {
        console.log('login response:', response);
        if (response.data.logged_in) {
          const { handleSuccesfulAuth } = this.props;
          handleSuccesfulAuth(response.data);
          history.push('/dashboard');
        } else {
          console.log("user error, alert")
          document.getElementById("alertmsg").style.visibility = "visible";
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
      <div className={styles.login}>
        <div id="alertmsg" className={styles.alertmsg}>VERIFY YOUR INFORMATION</div>
        <form className={styles.loginForm} onSubmit={this.handleSubmit}>
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
          <button className={styles.loginBtn} type="submit">Login</button>
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
});

export default connect(null, mapDispatchToProps)(Login);
