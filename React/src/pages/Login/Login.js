
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { ConfigContext, BASE_URL } from '../../ConfigContext';
import officeImage from '../Login/office.jpg';


<<<<<<< Updated upstream
  const Login = () => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();

    // Use admin credentials from context
  const { username, passwordHash } = useContext(ConfigContext);

    useEffect(() => {
      sessionStorage.removeItem('userValid');
    }, []);
=======

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('userValid');
    sessionStorage.removeItem('company');
    sessionStorage.removeItem('username');
  }, []);
>>>>>>> Stashed changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/getAdminAccount?username=${userName}`);
      if (!res.ok) {
        setErrMessage('Username not found');
        return;
      }

      const data = await res.json();

      if (userPassword === data.password) {
          sessionStorage.setItem('userValid', true);
        sessionStorage.setItem('company', data.company); 
        sessionStorage.setItem('username', data.username); 
        navigate('/MainMenu');
      } else {
        setErrMessage('Password is incorrect');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.rect}>
        <div className={styles.leftrect}>
          <img src={officeImage} alt='bruh'></img>
        </div>
        <div className={styles.rightrect}>
          <text className={styles.prompt}>Login to your system</text>
          <form className={styles.formSection} onSubmit={handleSubmit}>
            <input className={styles.usernameHolder}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
            <input className={styles.passwordHolder}
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Admin Password"
            />
            <span className={styles.errMessage}>{errMessage}</span><br></br>
            <button className={styles.submitButton} type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </div>

  );
};
<<<<<<< Updated upstream
=======

export default Login;
>>>>>>> Stashed changes
