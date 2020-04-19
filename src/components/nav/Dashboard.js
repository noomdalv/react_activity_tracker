import React from 'react';
import PropTypes from 'prop-types';
import Record from '../auth/Record'
import { connect } from 'react-redux';
import styles from './Dashboard.module.css';

const Dashboard = ({ status }) => {
  if (status.login === 'LOGGED_IN') {
    return (
      <div id={styles.dashboard}>
        <h1>Dashboard</h1>
        <h2>
          User:
          { status.user.data.name }
        </h2>
        <Record />
        <h3>Records</h3>
        <ul>
          { status.user.records.map(record => {
            return ( <li key={record + record.day}>
              Day: {record.day},
              Description: {record.description}
            </li> )
          }) }
        </ul>

      </div>
    )
  } else {
    return (
      <h1>You need to login first</h1>
    )
  }

}

Dashboard.propTypes = {
  status: PropTypes.instanceOf(Object)
};

const mapStateToProps = state => ({
  status: state.status
})

export default connect(mapStateToProps, null)(Dashboard);
