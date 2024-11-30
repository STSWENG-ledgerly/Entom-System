import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import global from '../../global.module.css';
import TempHeader from '../_header/Header';
import Sidebar from '../_sidebar/Sidebar';
import styles from './SetDefaults.module.css'
import {ConfigContext} from '../../ConfigContext';

const SetDefaults = () => {
    const {config, setConfig} = useContext(ConfigContext);
    const [isVisible, setIsVisible] = useState(false);
    const [newConfig, setNewConfig] = useState({
        rate: '',
        basic: '',
    });

    useEffect(() => {
      setNewConfig(config);
    }, [config]);

    const handleSubmit = (e) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        rate: newConfig.rate,
        basic: newConfig.basic,
      }));
      saveToDB(newConfig.rate, newConfig.basic)
      handleFadeOut();
    };

    const handleFadeOut = () => {
      setIsVisible(false); 
      setTimeout(() => setIsVisible(true)); 
    };

    const saveToDB = (rate, basic) => {
      console.log(config);

      const nc = {
        rate: rate, 
        basic: basic
      }
      fetch('http://localhost:8000/saveConfig', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nc)
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    }

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

                  <div className={`${styles.status} ${isVisible ? global.fadeOut : global.opacity0}`}> Saved! </div>
                
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