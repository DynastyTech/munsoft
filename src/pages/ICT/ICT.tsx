import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ICT.module.css';

const ictProducts = [
  {
    title: 'Munsoft ICT Management',
    products: [
      'Connectivity - C',
      'Extended Disaster Recovery (E &G)',
      'Essential ICT Services'
    ]
  }
];

const ICT = () => {
  const heroAnim = useScrollAnimation();
  const servicesAnim = useScrollAnimation();

  return (
    <div className={styles.ict}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img 
            src="/assets/images/city-1.jpg" 
            alt="City background"
            className={styles.heroBgImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroHeader}>
          <div className={styles.logo}>
            <img
              src="/assets/images/Logo_Munsoft_%20Transp.png"
              alt="Munsoft"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.cityCorner}>
            <img src="/assets/images/city-2.jpg" alt="City" className={styles.cornerImage} />
          </div>
        </div>
        <div 
          ref={heroAnim.ref}
          className={`${styles.heroContent} ${heroAnim.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.sidebarLabel}>
            <div className={styles.sidebarImage}>
              <img src="/assets/images/city-3.jpg" alt="ICT Team" />
            </div>
            <h2>ICT Services</h2>
            <p>
              Providing all IT 
              services from 
              traditional IT 
              functions right 
              through to advanced 
              IT security and cloud 
              hosting services.
            </p>
          </div>
        </div>
      </section>

      {/* Products Table Section */}
      <section className={styles.productsSection}>
        <div 
          ref={servicesAnim.ref}
          className={`${styles.productsTable} ${servicesAnim.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Solutions/ Services</div>
            <div className={styles.headerCell}>Solution Group</div>
            <div className={styles.headerCell}>Solution/ Product List</div>
          </div>
          
          {ictProducts.map((group, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.groupCell}>
                <span className={styles.groupTitle}>{group.title}</span>
              </div>
              <div className={styles.productsCell}>
                {group.products.map((product, pIndex) => (
                  <div key={pIndex} className={styles.productItem}>{product}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Key ICT Capabilities</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
            </div>
            <h3>Cloud Services</h3>
            <p>Secure cloud hosting and disaster recovery solutions ensuring business continuity.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Security</h3>
            <p>Advanced IT security measures to protect municipal data and systems.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Connectivity</h3>
            <p>Reliable network infrastructure and connectivity solutions.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Support</h3>
            <p>24/7 technical support and system maintenance services.</p>
          </div>
        </div>
      </section>

      {/* City Background */}
      <section className={styles.citySection}>
        <div className={styles.cityImageWrapper}>
          <img 
            src="/assets/images/city-3.jpg" 
            alt="City skyline"
            className={styles.cityBgImage}
          />
        </div>
        <div className={styles.curvedOverlay}></div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Optimize Your ICT Infrastructure</h2>
          <p>Let our experts help you build a robust and secure IT environment</p>
          <a href="/contact" className={styles.ctaButton}>Get Started</a>
        </div>
      </section>
    </div>
  );
};

export default ICT;
