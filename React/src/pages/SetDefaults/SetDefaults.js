import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import global from '../../global.module.css';
import TempHeader from '../_header/Header';
import Sidebar from '../_sidebar/Sidebar';
import styles from './SetDefaults.module.css'
import {ConfigContext} from '../../ConfigContext';

const SetDefaults = () => {
    const {config, setConfig} = useContext(ConfigContext);
    const navigate = useNavigate();

    const [newConfig, setNewConfig] = useState({
        rate: config.rate,
        basic: config.basic,
    });

    const handleSubmit = (e) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        rate: newConfig.rate,
        basic: newConfig.basic,
      }));
      navigate('/MainMenu');
    };

    return (
      <div className={global.wrapper}>
        <Sidebar></Sidebar>
        <div>
          <TempHeader></TempHeader>
          <div className={global.mainContent}>
            <h1><span className={global.title}>SET DEFAULT RATES</span></h1>

              <div className={styles.content}>
              <div className={`${styles.payroll} ${styles.group}`}>
                <span>PAYROLL</span>
                <div>

                  <div className={styles.inputField}>
                  <label>Rate</label><br></br>
                  <input type='number' min='0' value={newConfig.rate} step='any' onChange={(e)=>setNewConfig({...newConfig, rate: e.target.value})}></input><br></br>
                  </div>
                  
                  <div className={styles.inputField}>
                  <label>Basic</label><br></br>
                  <input type='number' min='0' value={newConfig.basic} step='any' onChange={(e)=>setNewConfig({...newConfig, basic: e.target.value})}></input>
                  </div>
                
                </div>
              </div>

              <button className={styles.confirm} onClick={handleSubmit}> CONFIRM CHANGES </button><br/>
              </div>
          </div>
        </div>
      </div>
    );
  };
  
export default SetDefaults;