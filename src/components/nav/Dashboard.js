import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Record from '../auth/Record';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const Dashboard = ({ status }) => ((status.login === 'LOGGED_IN') ? (
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
) : (<h1>You need to login first</h1>));

Dashboard.defaultProps = {

};

Dashboard.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(Dashboard);
