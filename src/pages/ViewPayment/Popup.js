
import React from 'react';
import styles from './Popup.module.css';
import {useState, useContext} from 'react';
import {ConfigContext, BASE_URL} from '../../ConfigContext';

function Popup (props)  {

    const handleExit = () => {
        props.setTrigger(false);
    }

    const handleDelete = () => {
       const company = sessionStorage.getItem('company');
       console.log('→ Deleting with company:', company);
       
        fetch(
              `${BASE_URL}/deletePayment/${props.pid}?company=${encodeURIComponent(company)}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              }
            )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            props.setUserPayments(up => up.filter(p => p._id !== props.pid));
          })
          .catch((err) => console.log(err));

        props.setTrigger(false);
    }


    return (props.trigger) ? (
      <div className={styles.popup}>
        <div className={styles.popupInner}>
            <span>ARE YOU SURE?</span>
            <div>
                <button className={styles.yes} onClick={handleDelete}>YES</button>
                <button className={styles.closeBtn} onClick={handleExit}>NO</button>
            </div>

        </div>
      </div>
    ) : "";
};
  
