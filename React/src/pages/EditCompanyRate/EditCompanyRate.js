import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../ConfigContext';
import global from '../../global.module.css';
import Header from '../_header/Header';
import Sidebar from '../_sidebar/Sidebar';
import styles from './EditCompanyRate.module.css';

const EditCompanyRate = () => {
    const navigate = useNavigate();

    const [standardRate, setStandardRate] = useState('');
    const [holidayRate, setHolidayRate] = useState('');
    const [weekendRate, setWeekendRate] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [companyName, setCompanyName] = useState('');
  useEffect(() => {
    fetchCurrentRates();
  }, []);

  const fetchCurrentRates = async () => {
    try {
      const companyId = sessionStorage.getItem('company');
      
      if (!companyId || companyId.length !== 24) {
        alert('Company ID is missing or invalid. Please log in again.');
        return;
      }

      const response = await fetch(`${BASE_URL}/getCompanyRates?company=${companyId}`); //subject to change depende sa route
      
      if (response.ok) {
        const rates = await response.json();
        setStandardRate(rates.standardRate || '');
        setHolidayRate(rates.holidayRate || '');
        setWeekendRate(rates.weekendRate || '');
      } else {
        // If no rates exist yet, start with empty values
        console.log('No existing rates found, starting with defaults');
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
      alert('Failed to load current rates');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRates = async () => {
    const companyId = sessionStorage.getItem('company');

    if (!companyId || companyId.length !== 24) {
      alert('Company ID is missing or invalid. Please log in again.');
      return;
    }

    // Validation
    if (!standardRate || !holidayRate || !weekendRate) {
      alert('Please fill in all rate fields');
      return;
    }

    if (Number(standardRate) < 0 || Number(holidayRate) < 0 || Number(weekendRate) < 0) {
      alert('Rates cannot be negative');
      return;
    }

    const rateData = {
      company: companyId,
      standardRate: Number(standardRate),
      holidayRate: Number(holidayRate),
      weekendRate: Number(weekendRate)
    };

    setSaving(true);

    try {
      const response = await fetch(`${BASE_URL}/updateCompanyRates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rateData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Company rates have been updated successfully!");
        // Optionally navigate back or stay on page
        // navigate('/MainMenu');
      } else {
        alert(`❌ Failed to update rates: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating rates: ", error);
      alert("Error updating company rates");
    } finally {
      setSaving(false);
    }
  };

  const title = "Edit Company Rates";

  if (loading) {
    return (
      <div className={global.wrapper}>
        <Sidebar />
        <div>
          <Header />
          <div className={global.mainContent}>
            <h1><span className={global.title}>{title}</span></h1>
            <div className={styles.loadingContainer}>
              <p>Loading current rates...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={global.wrapper}>
      <Sidebar />
      <div>
        <Header />
        <div className={global.mainContent}>
          <h1><span className={global.title}>{title}</span></h1>
          
          {companyName && (
            <div className={styles.companyInfo}>
              <h2>Company: <span className={styles.companyName}>{{companyName}}</span></h2>
            </div>
          )}
          <div className={styles.rateContainer}>
            <div className={styles.rateBox}>
              <h3>Company Rate Configuration</h3>
              <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                  <label htmlFor="standardRate">Standard Rate (per hour)</label>
                  <input 
                    id="standardRate" 
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="Enter standard hourly rate" 
                    value={standardRate} 
                    onChange={(e) => setStandardRate(e.target.value)} 
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="holidayRate">Holiday Rate (per hour)</label>
                  <input 
                    id="holidayRate" 
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="Enter holiday hourly rate" 
                    value={holidayRate} 
                    onChange={(e) => setHolidayRate(e.target.value)} 
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="weekendRate">Weekend Rate (per hour)</label>
                  <input 
                    id="weekendRate" 
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="Enter weekend hourly rate" 
                    value={weekendRate} 
                    onChange={(e) => setWeekendRate(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            <div className={styles.ratePreview}>
              <h4>Rate Preview</h4>
              <div className={styles.previewItem}>
                <span>Standard Rate:</span>
                <span>${Number(standardRate || 0).toFixed(2)}/hour</span>
              </div>
              <div className={styles.previewItem}>
                <span>Holiday Rate:</span>
                <span>${Number(holidayRate || 0).toFixed(2)}/hour</span>
              </div>
              <div className={styles.previewItem}>
                <span>Weekend Rate:</span>
                <span>${Number(weekendRate || 0).toFixed(2)}/hour</span>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button 
              id="save-rates-btn" 
              className={styles.saveButton} 
              onClick={handleSaveRates}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Rates'}
            </button>
            
            <button 
              className={styles.cancelButton} 
              onClick={() => navigate('/MainMenu')}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyRate;