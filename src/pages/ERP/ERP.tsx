import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ERP.module.css';

// Product list data from brochure
const productGroups = [
  {
    title: 'Munsoft FMS',
    products: ['Munsoft Financial Management System']
  },
  {
    title: 'Munsoft Asset Management',
    products: [
      'Electronic Meter Reading (F)',
      'Asset Verification Equipment(T)',
      'Field Worker Application (U)',
      'Munsoft Asset Management & Maintenance (Technical) (U)'
    ]
  },
  {
    title: 'Munsoft Training Academy',
    products: ['Training (O)', 'Online Academy (Q)']
  },
  {
    title: 'Munsoft Performance Management (EPMS)',
    products: [
      'Electronic Performance Management System (K1)',
      'System Support K2)',
      'Operational Support - Organisational (K3)',
      'Operational Support - Individual Performance (K4)'
    ]
  },
  {
    title: 'HR and Payroll',
    products: [
      'Payroll & HR (P)',
      'E-recruitment',
      'Time and attendance',
      'Employee Assistance'
    ]
  },
  {
    title: 'Planning, Prioritization and Project Management',
    products: [
      'Munsoft Project & Programme Management (S)',
      'Munsoft Planning - License (W1)',
      'Munsoft Planning - Training (W2)',
      'Munsoft Planning - Process Support (W2)',
      'Planning - eIDP, Prioritisation, eSDBIP (SDBIP Component 4 and 5) and Project Support (W4)',
      'Capital Expenditure Framework (W3)'
    ]
  },
  {
    title: 'Munsoft Value Adding Services',
    products: [
      'Traffic Management, Fleet Management etc (V)',
      'Document Management, ERDMS (D)',
      'Statement Printing (H)',
      'Bidder Vetting'
    ]
  },
  {
    title: 'Munsoft BI Dashboards and Reports',
    products: [
      'Consumer Dashboard (L1)',
      'Consumer Analytics (X+L1)',
      'Financial Ratios Dashboards (L2)',
      'Munsoft Reporting/ Caseware (R)'
    ]
  },
  {
    title: 'Munsoft Customer Care',
    products: [
      'eServices/ Consumer (J), Printing of Statements, Consumer App',
      'Consumer Dashboard (L1)'
    ]
  },
  {
    title: 'Revenue Utility Management',
    products: ['Credit Control and Debt collecting', 'Indigent Management']
  },
  {
    title: 'Land use and Building Control',
    products: [
      'Munsoft Town Planning Application Management System (V1)',
      'Munsoft Building Plans Application Management System (V2)',
      'Munsoft Wayleaves Application Management System (V6)'
    ]
  },
  {
    title: 'Real Estate and Resource Management',
    products: [
      'Munsoft Real Estate Management (Municipal Properties) (V3)',
      'Munsoft Cemetery Management System (V4)',
      'Munsoft Advertising Application System (V7)'
    ]
  }
];

const ERP = () => {
  const heroAnim = useScrollAnimation();
  const tableAnim = useScrollAnimation();

  return (
    <div className={styles.erp}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img 
            src="/assets/images/city-2.jpg" 
            alt="City background"
            className={styles.heroBgImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroHeader}>
          <div className={styles.logo}>
            <span className={styles.logoText}>MUNSOFT</span>
            <span className={styles.logoSubtext}>municipal financial software</span>
          </div>
          <div className={styles.cityCorner}>
            <img src="/assets/images/city-3.jpg" alt="City" className={styles.cornerImage} />
          </div>
        </div>
        <div 
          ref={heroAnim.ref}
          className={`${styles.heroContent} ${heroAnim.isVisible ? styles.visible : ''}`}
        >
          <div className={styles.sidebarLabel}>
            <div className={styles.sidebarImage}>
              <img src="/assets/images/city-1.jpg" alt="Team" />
            </div>
            <h2>Software:<br/>Enterprise<br/>Resource Planner</h2>
            <p>
              Providing an ERP solution and internal 
              control systems that 
              enable municipalities 
              and their entities 
              across Southern Africa 
              to ensure financial 
              accountability, 
              transparency and 
              compliance with the 
              required national & 
              provincial government 
              regulations and 
              standards.
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
          
          {productGroups.map((group, index) => (
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

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Transform Your Municipal Operations</h2>
          <p>Discover how our ERP solution can streamline your financial management</p>
          <a href="/contact" className={styles.ctaButton}>Request a Demo</a>
        </div>
      </section>
    </div>
  );
};

export default ERP;
