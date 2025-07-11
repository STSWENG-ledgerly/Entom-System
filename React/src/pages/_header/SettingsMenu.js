import { useContext, useState } from 'react';
import { BASE_URL, ConfigContext } from '../../ConfigContext';
import styles from './SettingsMenu.module.css';

function SettingsMenu(props) {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { password, setPassword } = useContext(ConfigContext);

    const handleSave = () => {
        if (newPass === '') setSuccessMessage('New password cannot be blank.');
        else setSuccessMessage('');

        if (oldPass !== password) setErrMessage('Password is incorrect.');
        else setErrMessage('');

        if (oldPass === password && newPass !== '') {
            setPassword(newPass);
            saveToDB(newPass);
            setSuccessMessage('Password change successfully!');
        }
    };

    const saveToDB = (newPassword) => {
        fetch(`${BASE_URL}/savePassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword }),
        })
        .then(res => res.json())
        .then(() => {
            console.log('password saved, verifiable with db');
        })
        .catch(err => console.log(err));
    };

    const handleExit = () => {
        setOldPass('');
        setNewPass('');
        setErrMessage('');
        setSuccessMessage('');
        props.setTrigger(false);
    };

    return props.trigger ? (
        <div className={styles.settings}>
            <div className={styles.settingsInner}>
                <div className={`${styles.settingsTitle} ${styles.gridItem}`}>Settings</div>

                <button
                    className={`${styles.closeBtn} ${styles.gridItem}`}
                    onClick={handleExit}
                    aria-label="Close Settings"
                />

                <div className={`${styles.menuItems} ${styles.gridItem}`}>
                    <span>Password</span>
                </div>

                <div className={`${styles.main} ${styles.gridItem}`}>
                    <div className={styles.pass}>
                        <div className={styles.subtitle}>Change Password</div>

                        <div>
                            Old Password<br />
                            <input
                                className={styles.passHolder}
                                type="password"
                                value={oldPass}
                                onChange={(e) => setOldPass(e.target.value)}
                                aria-label="Old Password"  // Added for purposes of testing
                            /><br />
                            <span className={styles.statusMessage}>{errMessage}</span><br />
                        </div><br />

                        <div>
                            New Password<br />
                            <input
                                className={styles.passHolder}
                                type="password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                aria-label="New Password"  // Added for purposes of testing
                            /><br />
                            <span className={styles.statusMessage}>{successMessage}</span><br />
                        </div>
                        <br />
                        <span>
                            <button className={styles.save} onClick={handleSave}>Confirm Changes</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default SettingsMenu;
