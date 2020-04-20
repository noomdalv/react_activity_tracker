import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleLogout } from '../../actions';
import styles from './Navbar.module.css';

const Navbar = ({ handleLogout,  status }) => {
  return (
    <div id={styles.navbar}>
      <div id={styles.divlink}>
        <ul id={styles.linklist}>
          <li>
            {status.login === 'LOGGED_IN' ? (
              <Link to="#">
                user:
                {status.user.data.name}
              </Link>
            )
              : <Link to="/signup">Sign Up</Link> }
          </li>
          <li>
            {status.login === 'LOGGED_IN' ? <Link to="/" onClick={() => handleLogout()}>Logout</Link>
              : <Link to="/">Login</Link> }
          </li>
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  status: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(handleLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
