import React from 'react';
import logo from './logo.svg';
import styles from './TempHeader.module.css';

const TempHeader = () => {
    return (
      <div className={styles.background}>
        <img src={logo}></img>
      </div>
    );
  };
  
export default TempHeader;