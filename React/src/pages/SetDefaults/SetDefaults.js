import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import global from '../../global.module.css';
import TempHeader from '../_header/TempHeader';
import Sidebar from '../_sidebar/Sidebar';
import styles from './SetDefaults.module.css'
import {ConfigContext} from '../../ConfigContext';

const SetDefaults = () => {
    const {config, setConfig} = useContext(ConfigContext);
    const navigate = useNavigate();

    const [newConfig, setNewConfig] = useState({
        rate: config.rate,
        basic: config.basic,
        sss: config.sss,
        philHealth: config.philHealth,
        pagIbig: config.pagIbig
    });

    const handleSubmit = (e) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        rate: newConfig.rate,
        basic: newConfig.basic,
        sss: newConfig.sss,
        philHealth: newConfig.philHealth,
        pagIbig: newConfig.pagIbig
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

              <div className={`${styles.deductions} ${styles.group}`}>
                <span>DEDUCTIONS</span>

                <div>
                  <div className={styles.inputField2}>
                  <label>SSS</label><br></br>
                  <input type='number' min='0' value={newConfig.sss} step='any' onChange={(e)=>setNewConfig({...newConfig, sss: e.target.value})}></input><br></br>
                  </div>
                  
                  <div className={styles.inputField2}>
                  <label>PhilHealth</label><br></br>
                  <input type='number' min='0' value={newConfig.philHealth} step='any' onChange={(e)=>setNewConfig({...newConfig, philHealth: e.target.value})}></input><br></br>
                  </div>
                  
                  <div className={styles.inputField2}>
                  <label>Pag-Ibig</label><br></br>
                  <input type='number' min='0' value={newConfig.pagIbig} step='any' onChange={(e)=>setNewConfig({...newConfig, pagIbig: e.target.value})}></input>
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