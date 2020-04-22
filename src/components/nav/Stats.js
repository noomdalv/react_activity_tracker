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
    let time = 0;
    recordData.record_details.map(item => time += parseFloat(item[activity]));
    return time.toFixed(2);
  };

  if (status.login === 'LOGGED_IN') {
    return (
      <div id={styles.stats}>
        <h1>Stats</h1>
        { recordData.records.length > 0 ? (
          <div id={styles.statsInfo}>
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
        ) : (<h1>No Stats Found...</h1>) }

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
