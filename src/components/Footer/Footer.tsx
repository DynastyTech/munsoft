import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.logo}>
              <img
                src="/assets/images/Logo_Munsoft_%20Transp.png"
                alt="Munsoft"
                className={styles.logoImage}
              />
            </div>
            <p className={styles.description}>
              Powering smart municipal governance through digital transformation since 2001.
            </p>
          </div>

          <div className={styles.col}>
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/erp">ERP Solutions</Link></li>
              <li><Link to="/ict">ICT Management</Link></li>
              <li><Link to="/advisory">Advisory Services</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Contact</h4>
            <ul>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                011 215 8000
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@munsoft.co.za
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                www.munsoft.co.za
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Locations</h4>
            <p><strong>Sandton Office:</strong> 11 Naivasha Road, Building A, First Floor, Suite 111, Sunninghill, 2157</p>
            <p><strong>Centurion Office:</strong> 5 Bauhinia Street, Cambridge Office Park, Building 6, Highveld Techno Park, Centurion, 0169</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Munsoft. All rights reserved. | Level 1 B-BBEE Contributor</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
