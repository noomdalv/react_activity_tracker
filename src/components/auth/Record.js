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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleTimeChange(event) {
    const hours = document.getElementById(`${event.target.name}hours`).value;
    const mins = document.getElementById(`${event.target.name}mins`).value;
    this.setState({
      [event.target.name]: `${hours}.${mins}`,
    });
  }

  handleSubmitRecord(event) {
    event.preventDefault();
    const {
      day, description, sleep, work, exercise, leisure,
    } = this.state;
    const { handleSuccesfulAuth } = this.props;
    axios.post('https://activitytrackerapi.herokuapp.com/records', {
      record: {
        day,
        description,
      },
      details: {
        sleep,
        work,
        exercise,
        leisure,
      },
    },
    { withCredentials: true })
      .then(response => {
        if (response.data.status === 'record_created') {
          this.setState({
            description: '',
          });
          document.getElementById('recordForm').reset();
          document.getElementById('recordDetails').style.display = 'none';
          document.getElementById('sucessMsg').style.display = 'block';
          handleSuccesfulAuth(response.data);
        }
      })
      .catch(error => {
        console.error('Registration error =>', error);
      });
  }

  render() {
    const { day, description } = this.state;
    return (
      <div id={styles.addRecord}>

        <form onSubmit={this.handleSubmitRecord} id="recordForm">
          <h4>ADD A NEW ENTRY</h4>
          <span>Day:</span>
          <input type="date" name="day" value={day} onChange={this.handleChange} />
          <br />
          <textarea
            id={styles.description}
            name="description"
            placeholder="Description..."
            value={description}
            maxLength="40"
            onChange={this.handleChange}
          />
          <br />
          <button
            id="trackBtn"
            type="button"
            onClick={() => {
              document.getElementById('recordDetails').style.display = 'block';
              document.getElementById('sucessMsg').style.display = 'none';
            }}
          >
            Track
          </button>


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

              <div>
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

              <div className={styles.oddGrid}>
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

              <div>
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
        <div id="sucessMsg" className={styles.success}>ENTRY SAVED!</div>
      </div>
    );
  }
}

Record.propTypes = {
  handleSuccesfulAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  handleSuccesfulAuth: data => dispatch(handleSuccesfulAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
