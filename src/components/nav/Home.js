import React from 'react';
import { checkLoginStatus } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../auth/Login';

const Home = ({ status }) => {
  console.log("checkLoginStatus from Home", status)

  return (
    <div>
      <Login />
    </div>
  )
}

Home.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  checkLoginStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  status: state.status
})

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
