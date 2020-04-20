import React, { useEffect } from 'react';
import { checkLoginStatus, fetchRecords } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const RecordHistory = ({ checkLoginStatus, status, fetchRecords, recordData }) => {
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  if (status.login === 'LOGGED_IN') {
    return (
      <div id={styles.history}>
        <h1>History</h1>
        <div id={styles.recordHistory}>
          <h3>Records</h3>
          <div>
            { console.log("recorddata >", recordData)}
            { recordData.records.length > 0 ? recordData.records.map(record => {
              let details = recordData.record_details.filter(details => details.record_id === record.id);
              details = details[0];
              console.log("details", details);
              return (
              <div key={"record_"+record.id} className={styles.record}>
                <div className={styles.recordInfo}>
                  <p><b>Day:</b>{record.day}</p>
                  <p className={styles.recordDescription}><b>Description:</b><br/>
                    {record.description}
                  </p>
                </div>
                <div className={styles.details}>
                  <b>Sleep: <br/>{details.sleep}</b>
                  <b>Work: <br/>{details.work}</b>
                  <b>Leisure: <br/>{details.leisure}</b>
                  <b>Exercise: <br/>{details.exercise}</b>
                </div>
              </div>
            )}) : <h1>No Records Found...</h1> }
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
  status: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  status: state.status,
  recordData: state.recordData
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  fetchRecords: () => dispatch(fetchRecords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordHistory);
