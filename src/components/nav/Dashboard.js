import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Dashboard = ({ status }) => {
  console.log('dashboard status >', status)

  if (status.login === 'LOGGED_IN') {
    return (
      <div>
        <h1>Dashboard</h1>
        <h2>
          Status:
          { status.login }
        </h2>
        <h2>
          User:
          { status.user.name }
        </h2>
      </div>
    )
  } else {
    return (
      <h1>Loading Data....</h1>
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
