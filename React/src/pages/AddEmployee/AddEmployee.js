import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import global from '../../global.module.css';
import Header from '../_header/Header';
import styles from './AddEmployee.module.css';

const AddEmployee = () => {
  const handleExit = () => {
    sessionStorage.removeItem('userValid');
  };

  return (
    <div className={global.wrapper}>
      <Sidebar></Sidebar>
      <div>
        <Header></Header>
      </div>
    </div>




  );
};
export default AddEmployee;
