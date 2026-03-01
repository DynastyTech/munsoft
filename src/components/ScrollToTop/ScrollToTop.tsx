import { useEffect, useState } from 'react';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      const nextVisible = window.scrollY > 500;
      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    toggleVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`${styles.scrollButton} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

export default ScrollToTop;
