import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: new Date().toLocaleDateString('en-CA'),
    }
    this.handleSubmitRecord = this.handleSubmitRecord.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitRecord(event) {
    event.preventDefault();
    const { day } = this.state;
    axios.post('http://localhost:3001/records', {
      record: {
        day: day
      },
    },
    { withCredentials: true })
    .then(response => {
      if (response.data.status === 'created') {
        console.log("record created >", response.data)
      }
    })
    .catch(error => {
      console.error('Registration error =>', error);
    });
  }

  render() {
    const { day } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmitRecord}>
          <h3>Add a new entry</h3>
          <input type="date" name="day" value={day} onChange={this.handleChange} />
          <button id="saveBtn" type="submit">Save</button>
        </form>
      </div>
      )
  }
}

Record.propTypes = {
  
}

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(Record);
