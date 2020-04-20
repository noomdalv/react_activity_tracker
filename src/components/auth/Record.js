import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../nav/Dashboard.module.css';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: new Date().toLocaleDateString('en-CA'),
      description: '',
      sleep: '',
      work: '',
      exercise: '',
      leisure: '',
    };
    this.handleSubmitRecord = this.handleSubmitRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.loadRecordDetails = this.loadRecordDetails.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleTimeChange(event) {
    console.log(event.target.value);
    const hours = document.getElementById(`${event.target.name}hours`).value;
    const mins = document.getElementById(`${event.target.name}mins`).value;
    this.setState({
      [event.target.name]: `${hours}.${mins}`,
    });
  }

  handleSubmitRecord(event) {
    event.preventDefault();
    const { day, description, sleep, work, exercise, leisure } = this.state;
    axios.post('http://localhost:3001/records', {
      record: {
        day,
        description,
      },
      details : {
        sleep,
        work,
        exercise,
        leisure
      }
    },
    { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          console.log('record created >', response.data);
        }
      })
      .catch(error => {
        console.error('Registration error =>', error);
      });
  }

  loadRecordDetails() {
    const z = document.getElementById('recordDetails');
    z.style.display = 'block';
  }

  render() {    
    const { day, description } = this.state;
    return (
      <div id={styles.addRecord}>
        <form onSubmit={this.handleSubmitRecord} id="recordForm">
          <h3>Add a new entry</h3>
          <span>Day:</span>
          <input type="date" name="day" value={day} onChange={this.handleChange} />
          <br />
          <textarea
            id={styles.description}
            name="description"
            placeholder="Description..."
            value={description}
            onChange={this.handleChange}
          />
          <br />
          <button id="trackBtn" type="button" onClick={this.loadRecordDetails}>Track</button>
          <div id="recordDetails" className={styles.recordDetails}>
            <h3>Time Tracker</h3>
            <div id={styles.trackerGrid}>
              <div>
                <h6>Activity</h6>
                <h6>Hours</h6>
                <h6>Minutes</h6>
              </div>
              <div className={styles.oddGrid}>
                <span>Sleep</span>
                <input
                  type="number"
                  id="sleephours"
                  min="0"
                  max="24"
                  name="sleep"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  id="sleepmins"
                  min="0"
                  max="60"
                  name="sleep"
                  onChange={this.handleTimeChange}
                />
              </div>

              <div>
                <span>Work/Study</span>
                <input
                  type="number"
                  id="workhours"
                  min="0"
                  max="24"
                  name="work"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  id="workmins"
                  min="0"
                  max="60"
                  name="work"
                  onChange={this.handleTimeChange}
                />
              </div>

              <div className={styles.oddGrid}>
                <span>Exercise</span>
                <input
                  type="number"
                  id="exercisehours"
                  min="0"
                  max="24"
                  name="exercise"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  id="exercisemins"
                  min="0"
                  max="60"
                  name="exercise"
                  onChange={this.handleTimeChange}
                />
              </div>

              <div>
                <span>Leisure/Relax</span>
                <input
                  type="number"
                  id="leisurehours"
                  min="0"
                  max="24"
                  name="leisure"
                  onChange={this.handleTimeChange}
                />
                <input
                  type="number"
                  id="leisuremins"
                  min="0"
                  max="60"
                  name="leisure"
                  onChange={this.handleTimeChange}
                />
              </div>
              <button type="submit">Save</button>
              <button
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
      </div>
    );
  }
}

Record.propTypes = {
  records: PropTypes.instanceOf(Object),
  recordDetails: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
