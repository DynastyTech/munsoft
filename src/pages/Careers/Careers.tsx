import styles from './Careers.module.css';

const Careers = () => {
  return (
    <div className={styles.careers}>
      <section className={styles.hero}>
        <img
          src="/assets/images/black-and-white-buidling.jpg"
          alt="Careers hero"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Careers</h1>
        </div>
      </section>

      <section className={styles.searchSection}>
        <div className={styles.searchCard}>
          <input type="text" placeholder="Keyword" aria-label="Keyword" />
          <select aria-label="All Job Category">
            <option>All Job Category</option>
          </select>
          <select aria-label="All Job Type">
            <option>All Job Type</option>
          </select>
          <select aria-label="All Job Location">
            <option>All Job Location</option>
          </select>
          <button className={styles.searchButton} type="button">Search Job</button>
          <button className={styles.resetButton} type="button" aria-label="Reset search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        </div>
        <p className={styles.noJobs}>No Job found</p>
      </section>
    </div>
  );
};

export default Careers;
