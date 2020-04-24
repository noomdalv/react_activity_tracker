import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecords } from '../../actions';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const Stats = ({ status, fetchRecords, recordData }) => {
  useEffect(() => {
    fetchRecords(status.user.data.id);
  }, [fetchRecords, status.user.data.id]);

  const getStats = activity => {
    let hours = 0;
    let mins = 0;
    recordData.record_details.forEach(item => {
      hours += parseInt(item[activity].split('.')[0], 10);
      mins += parseFloat(item[activity].split('.')[1], 10);
    });
    if (mins / 60 > 0) {
      hours += parseInt(mins / 60, 10);
      mins %= 60;
    }
    return (`${hours}.${mins}`);
  };

  if (status.login === 'LOGGED_IN') {
    return (
      <div className={styles.stats}>
        <h1>Stats</h1>
        <div className={styles.navHeader}>
          <p> SUMMARY OF STATISTICS </p>
        </div>
        { recordData.records.length > 0 ? (
          <div className={styles.statsInfo}>
            <p>
              <b>Account created on:</b>
              <br />
              {' '}
              { status.user.data.created_at.slice(0, 10) }
            </p>
            <p>
              <b>Total days tracked:</b>
              <br />
              {' '}
              { recordData.records.length }
            </p>
            <p>
              <b>Total sleep hours:</b>
              <br />
              {' '}
              { getStats('sleep') }
            </p>
            <p>
              <b>Total work hours:</b>
              <br />
              {' '}
              { getStats('work') }
            </p>
            <p>
              <b>Total exercise hours:</b>
              <br />
              {' '}
              { getStats('exercise') }
            </p>
            <p>
              <b>Total leisure hours:</b>
              <br />
              {' '}
              { getStats('leisure') }
            </p>
          </div>
        ) : (<div className={styles.notfound}><h1>No Stats Found...</h1></div>) }

        <Menu />
      </div>
    );
  }
  return (
    <h1>No Stats Found...</h1>
  );
};

Stats.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  recordData: PropTypes.instanceOf(Object).isRequired,
  fetchRecords: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
  recordData: state.recordData,
});

const mapDispatchToProps = dispatch => ({
  fetchRecords: id => dispatch(fetchRecords(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
