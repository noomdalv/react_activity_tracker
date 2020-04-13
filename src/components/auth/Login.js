import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password} = this.state
    axios.post("http://localhost:3001/sessions", {
      user: {
        email: email,
        password: password,
      }
    },
    { withCredentials: true })
    .then(response => {
      console.log(response)
      if (response.data.logged_in) {
        this.props.handleSuccesfulAuth(response.data)
      }
    })
    .catch(error => {
      console.error("Login error =>", error)
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email"
            value={this.state.email} onChange={this.handleChange} required />

          <input type="password" name="password" placeholder="Password"
            value={this.state.password} onChange={this.handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
