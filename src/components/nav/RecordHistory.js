import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecords } from '../../actions';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const RecordHistory = ({ status, fetchRecords, recordData }) => {
  useEffect(() => {
    fetchRecords(status.user.data.id);
  }, [fetchRecords, status.user.data.id]);

  if (status.login === 'LOGGED_IN') {
    return (
      <div className={styles.history}>
        <h1>History</h1>
        <div className={styles.navHeader}>
          <p> PAST RECORDS </p>
        </div>
        <div className={styles.recordHistory}>
          <div>
            { recordData.records.length > 0 ? recordData.records.map(record => {
              const details = recordData.record_details.filter(rec => rec.record_id === record.id);
              const [info] = details;
              return (
                <div key={`record_${record.id}`} className={styles.record}>
                  <div className={styles.recordInfo}>
                    <p>
                      <b>Day:</b>
                      <span>{record.day}</span>
                    </p>
                    <p className={styles.recordDescription}>
                      <b>Description:</b>
                      <br />
                      <span>{record.description}</span>
                    </p>
                  </div>
                  <div className={styles.details}>
                    <b>Sleep:</b>
                    <span>{info.sleep}</span>
                    <b>Work:</b>
                    <span>{info.work}</span>
                    <b>Leisure:</b>
                    <span>{info.leisure}</span>
                    <b>Exercise:</b>
                    <span>{info.exercise}</span>
                  </div>
                </div>
              );
            }) : <div className={styles.notfound}><h1>No Records Found...</h1></div> }
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordHistory);
