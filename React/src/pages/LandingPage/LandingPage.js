import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.background}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <img src="/images/ledger.png" alt="ledgerly" />
          </div>
          <div className={styles.navLinks}>
            <Link to="/Login" className={styles.loginBtn}>Login</Link>
            <Link to="/AccountRegistration" className={styles.signupBtn}>Sign Up</Link>
          </div>
        </div>
      </nav>

      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Streamline Your <span className={styles.highlight}>Payroll Management</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Efficiently manage employee payrolls, generate detailed reports, and ensure accurate 
              salary calculations with our comprehensive payroll management system.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/AccountRegistration" className={styles.primaryBtn}>
                Sign up now
              </Link>
              <Link to="/Login" className={styles.secondaryBtn}>
                Login to Your Account
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/images/salary.jpg" alt="Payroll Management" />
          </div>
        </div>
      </main>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose ledger.ly?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img src="/images/generate.png" alt="Calculate Payroll" />
              </div>
              <h3>Automated Calculations</h3>
              <p>Automatically calculate salaries, overtime, deductions, and bonuses with precision.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img src="/images/history.png" alt="Payroll History" />
              </div>
              <h3>Complete <br></br>History</h3>
              <p>Track and view comprehensive payroll history for all employees with detailed records.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img src="/images/add.png" alt="Employee Management" />
              </div>
              <h3>Employee Management</h3>
              <p>Easily add, edit, and manage employee information and payroll settings.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img src="/images/set.png" alt="Default Rates" />
              </div>
              <h3>Flexible Configuration</h3>
              <p>Set default rates, customize deductions, and configure payroll parameters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Simplify Your Payroll?</h2>
            <p>Join companies that trust ledger.ly for their payroll management needs.</p>
            <Link to="/AccountRegistration" className={styles.ctaBtn}>
              Sign your company up now
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <img src="/images/ledger.png" alt="ledgerly" />
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 ledger.ly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;