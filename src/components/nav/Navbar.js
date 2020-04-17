import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
      <div id={styles.navbar}>
        <div id={styles.divlink}>
          <ul id={styles.linklist}>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    )
};

Navbar.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired
}

const mapStateToProps = state => ({
  status: state.status
})

export default connect(mapStateToProps, null)(Navbar);
