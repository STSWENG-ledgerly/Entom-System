import React from 'react';
import logo from './logo.svg';
import styles from './Header.module.css';

const Header = () => {
    return (
      <div className={styles.background}>
        <img src={logo}></img>
      </div>
    );
  };
  
export default Header;