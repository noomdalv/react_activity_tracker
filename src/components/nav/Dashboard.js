import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Record from '../auth/Record';
import Footer from './Footer';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const Dashboard = ({ status }) => (
  <div className={styles.dashboard}>
    { status.login === 'LOGGED_IN' ? (
      <div>
        <h1>Dashboard</h1>
        <div className={styles.userDataContainer}>
          <p>
            <b>User: </b>
            { status.user.data.name }
          </p>
          <p>
            <b>Email: </b>
            { status.user.data.email }
          </p>
        </div>

        <div id={styles.recordContainer}>
          <Record />
        </div>
        <Menu />
      </div>
    ) : (
      <div>
        <h1 style={{ paddingTop: 200 }}>You need to login first</h1>
        <Footer />
      </div>
    ) }
  </div>

);

Dashboard.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(Dashboard);
