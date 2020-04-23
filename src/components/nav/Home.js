import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../auth/Login';
import Dashboard from './Dashboard';

const Home = ({ status }) => (
  <div>
    { status.login === 'LOGGED_IN' ? <Dashboard /> : <Login /> }
  </div>
);

Home.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(Home);
