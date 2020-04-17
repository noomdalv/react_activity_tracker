import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from '../../actions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Navbar.module.css';

const Navbar = ({ handleLogout }) => {
    return (
      <div id={styles.navbar}>
        <div id={styles.divlink}>
          <ul id={styles.linklist}>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <button type="button" onClick={() => handleLogout()}>Logout</button>
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

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(handleLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
