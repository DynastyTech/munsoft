import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './Advisory.module.css';

const advisoryProducts = [
  {
    title: 'Operational Support',
    products: [
      'Operational Support - In-Year Reporting (B1)',
      'Operational Support - Annual Reporting (B2)',
      'Operational Support - Asset Management (B3)',
      'Operational Support - Asset Monthly Reporting (B3.1)',
      'Operational Support - Field work and asset verification (B3.2)',
      'Operational Support Revenue - Data Management (M)',
      'Operational Support Revenue - Credit Control Management (M)',
      'Operational Support Revenue - Indigent Management (M)',
      'Operational Support - Budget Reporting (N)'
    ]
  }
];

const Advisory = () => {
  const heroAnim = useScrollAnimation();
  const tableAnim = useScrollAnimation();
  const benefitsAnim = useScrollAnimation();

  return (
    <div className={styles.advisory}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img 
            src="/assets/images/city-3.jpg" 
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
            <img src="/assets/images/city-1.jpg" alt="City" className={styles.cornerImage} />
          </div>
        </div>
        <div 
          ref={heroAnim.ref}
          className={`${styles.heroContent} ${heroAnim.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.sidebarLabel}>
            <div className={styles.sidebarImage}>
              <img src="/assets/images/city-2.jpg" alt="Advisory Team" />
            </div>
            <h2>Advisory Services</h2>
            <p>
              Providing technical 
              and professional 
              support to 
              municipalities to 
              enhance public 
              finance management, 
              build capacity, and 
              improve service 
              delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Products Table Section */}
      <section className={styles.productsSection}>
        <div 
          ref={tableAnim.ref}
          className={`${styles.productsTable} ${tableAnim.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Solutions/ Services</div>
            <div className={styles.headerCell}>Solution Group</div>
            <div className={styles.headerCell}>Solution/ Product List</div>
          </div>
          
          {advisoryProducts.map((group, index) => (
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

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>How We Support Your Municipality</h2>
        <div 
          ref={benefitsAnim.ref}
          className={`${styles.benefitsGrid} ${benefitsAnim.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Capacity Building</h3>
            <p>Build internal capacity and expertise through comprehensive training programs.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h3>Compliance Support</h3>
            <p>Ensure compliance with MFMA, mSCOA and other regulatory requirements.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Financial Analysis</h3>
            <p>In-depth financial analysis and reporting to support decision making.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>Technical Support</h3>
            <p>24/7 technical helpdesk and ongoing system optimization consulting.</p>
          </div>
        </div>
      </section>

      {/* City Background */}
      <section className={styles.citySection}>
        <div className={styles.cityImageWrapper}>
          <img 
            src="/assets/images/city-2.jpg" 
            alt="City skyline"
            className={styles.cityBgImage}
          />
        </div>
        <div className={styles.curvedOverlay}></div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Partner With Our Experts</h2>
          <p>Get the advisory support you need to excel in municipal financial management</p>
          <a href="/contact" className={styles.ctaButton}>Request Consultation</a>
        </div>
      </section>
    </div>
  );
};

export default Advisory;
