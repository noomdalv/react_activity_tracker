import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Record from '../auth/Record';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const Dashboard = ({ status }) => {
  if (status.login === 'LOGGED_IN') {
    return (
      <div id={styles.dashboard}>
        <div id={styles.userDataContainer}>
          <h1>Dashboard</h1>
          <p>
            User:
            { status.user.data.name }
          </p>
          <p>
            Email:
            { status.user.data.email }
          </p>
        </div>

        <div id={styles.recordContainer}>
          <Record />
        </div>

        <Menu />
      </div>
    );
  }
  return (
    <h1>You need to login first</h1>
  );
};

Dashboard.propTypes = {
  status: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(Dashboard);
