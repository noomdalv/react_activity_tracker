import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSuccesfulAuth } from '../../actions';
import styles from '../nav/Dashboard.module.css';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: new Date().toLocaleDateString('en-CA'),
      description: '',
      sleep: 0,
      work: 0,
      exercise: 0,
      leisure: 0,
    };
    this.handleSubmitRecord = this.handleSubmitRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTimeChange(event) {
    const hours = document.getElementById(`${event.target.name}hours`).value;
    const mins = document.getElementById(`${event.target.name}mins`).value;
    this.setState({ [event.target.name]: `${hours}.${mins}` });
  }

  handleSubmitRecord(event) {
    event.preventDefault();
    const { status, handleSuccesfulAuth } = this.props;
    const {
      day, description, sleep, work, exercise, leisure,
    } = this.state;
    axios.post('https://activitytrackerapi.herokuapp.com/records', {
      user: { id: status.user.data.id },
      record: { day, description },
      details: {
        sleep, work, exercise, leisure,
      },
    }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'record_created') {
          this.setState({ description: '' });
          document.getElementById('recordForm').reset();
          document.getElementById('recordDetails').style.display = 'none';
          document.getElementById('sucessMsg').style.display = 'block';
          handleSuccesfulAuth(response.data);
        }
      });
  }

  render() {
    const { day, description } = this.state;
    return (
      <div className={styles.addRecord}>
        <form onSubmit={this.handleSubmitRecord} id="recordForm">
          <div className={styles.addEntry}>
            <div className={styles.addEntryText}>
              <h4>ADD A NEW ENTRY</h4>
              <ol>
                <li>Select a Day</li>
                <li>Add Description</li>
                <li>Track Activities</li>
              </ol>
            </div>
            <div className={styles.addEntryData}>
              <span>Day</span>
              <input type="date" name="day" value={day} onChange={this.handleChange} />
              <span>Description</span>
              <textarea
                className={styles.description}
                name="description"
                placeholder="Description..."
                value={description}
                maxLength="40"
                onChange={this.handleChange}
              />
              <button
                className={styles.trackBtn}
                type="button"
                onClick={() => {
                  document.getElementById('recordDetails').style.display = 'block';
                  document.getElementById('sucessMsg').style.display = 'none';
                }}
              >
                Track Activities
              </button>
            </div>

          </div>

          <div id="recordDetails" className={styles.recordDetails}>
            <h3>Time Tracker</h3>
            <div className={styles.trackerGrid}>
              <div>
                <h6>Activity</h6>
                <h6>Hours</h6>
                <h6>Minutes</h6>
              </div>
              <div className={styles.activity}>
                <span>Sleep</span>
                <input
                  type="number"
                  defaultValue={0}
                  id="sleephours"
                  min="0"
                  max="24"
                  name="sleep"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  defaultValue={0}
                  id="sleepmins"
                  min="0"
                  max="60"
                  name="sleep"
                  onChange={this.handleTimeChange}
                />
              </div>

              <div className={styles.activity}>
                <span>Work/Study</span>
                <input
                  type="number"
                  defaultValue={0}
                  id="workhours"
                  min="0"
                  max="24"
                  name="work"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  defaultValue={0}
                  id="workmins"
                  min="0"
                  max="60"
                  name="work"
                  onChange={this.handleTimeChange}
                />
              </div>

              <div className={styles.activity}>
                <span>Exercise</span>
                <input
                  type="number"
                  defaultValue={0}
                  id="exercisehours"
                  min="0"
                  max="24"
                  name="exercise"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  defaultValue={0}
                  id="exercisemins"
                  min="0"
                  max="60"
                  name="exercise"
                  onChange={this.handleTimeChange}
                />
              </div>

              <div className={styles.activity}>
                <span>Leisure/Relax</span>
                <input
                  type="number"
                  defaultValue={0}
                  id="leisurehours"
                  min="0"
                  max="24"
                  name="leisure"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  defaultValue={0}
                  id="leisuremins"
                  min="0"
                  max="60"
                  name="leisure"
                  onChange={this.handleTimeChange}
                />
              </div>
              <button className={styles.activityBtn} type="submit">Save</button>
              <button
                className={styles.activityBtn}
                type="button"
                onClick={() => {
                  document.getElementById('recordDetails').style.display = 'none';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </form>
        <div id="sucessMsg" className={styles.success}>ENTRY SAVED!</div>
      </div>
    );
  }
}

Record.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
  handleSuccesfulAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  handleSuccesfulAuth: data => dispatch(handleSuccesfulAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
