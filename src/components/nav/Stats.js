import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from './Menu';
import styles from './Dashboard.module.css';

const Stats = ({ status }) => {
  if (status.login === 'LOGGED_IN') {
    return (
      <div id={styles.stats}>
        <h1>Stats</h1>
        <Menu />
      </div>
    );
  }
  return (
    <h1>You need to login first</h1>
  );
};

Stats.propTypes = {
  status: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps, null)(Stats);
