import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Menu = () => (
  <div className={styles.menu}>
    <div className="menuItem">
      <Link to="/dashboard"><h3>TRACKER</h3></Link>
    </div>
    <div className="menuItem">
      <Link to="/stats"><h3>STATS</h3></Link>
    </div>
    <div className="menuItem">
      <Link to="/history"><h3>HISTORY</h3></Link>
    </div>
  </div>
);

export default Menu;
