import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Menu = () => (
  <div id={styles.menu}>
    <div className="menuItem">
      <Link to="/dashboard"><h5>Dashboard</h5></Link>
    </div>
    <div className="menuItem">
      <Link to="/stats"><h5>Stats</h5></Link>
    </div>
    <div className="menuItem">
      <Link to="/history"><h5>History</h5></Link>
    </div>
  </div>
);

export default Menu;
