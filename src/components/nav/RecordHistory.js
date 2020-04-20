import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const RecordHistory = ({ status }) => {
  if (status.login === 'LOGGED_IN') {
    return (
      <div id={styles.history}>
        <h1>History</h1>
        <div id={styles.recordHistory}>
          <h3>Records</h3>
          <ul>
            { status.user.records.map(record => (
              <li key={record + record.day} className={styles.record}>
                Day:
                {' '}
                {record.day}
                ,
                Description:
                {record.description}
              </li>
            )) }
          </ul>
        </div>
        <Menu />
      </div>
    );
  }
  return (
    <h1>You need to login first</h1>
  );
};

RecordHistory.propTypes = {
  status: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(RecordHistory);
