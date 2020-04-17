import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ status }) => (
  <div>
    {console.log('dashboard status >', status)}
    <h1>Dashboard</h1>
    <h2>
      Status:
      {status.login}
    </h2>
    <h2>
      User:
    </h2>
  </div>
);

Dashboard.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

export default Dashboard;
