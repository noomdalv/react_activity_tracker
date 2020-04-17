import React from 'react';
import { checkLoginStatus } from '../../actions';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../auth/Login';

class Home extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus()
  }

  render() {
    const { status } = this.props;
    console.log("home status >", status)
        return (
          <div>
            <Login />
          </div>
        )
    }
}

Home.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  status: state.status
})

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
