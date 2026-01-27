import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  minLoadTime?: number;
}

const LoadingScreen = ({ onLoadComplete, minLoadTime = 1500 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    
    // Track image loading
    const images = document.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;

    const updateProgress = () => {
      loadedImages++;
      const imageProgress = totalImages > 0 ? (loadedImages / totalImages) * 100 : 100;
      setProgress(Math.min(imageProgress, 100));
    };

    // Check if images are already loaded or add load listeners
    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress); // Count errors as loaded to prevent hanging
      }
    });

    // If no images, set progress to 100
    if (totalImages === 0) {
      setProgress(100);
    }

    // Minimum display time for better UX
    const checkComplete = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / minLoadTime) * 100, 100);
      
      setProgress((prev) => Math.max(prev, timeProgress));

      if (elapsed >= minLoadTime && loadedImages >= totalImages) {
        clearInterval(checkComplete);
        setIsExiting(true);
        setTimeout(onLoadComplete, 600); // Wait for exit animation
      }
    }, 50);

    return () => {
      clearInterval(checkComplete);
      images.forEach((img) => {
        img.removeEventListener('load', updateProgress);
        img.removeEventListener('error', updateProgress);
      });
    };
  }, [onLoadComplete, minLoadTime]);

  return (
    <div className={`${styles.loadingScreen} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>MUNSOFT</h1>
          <span className={styles.tagline}>municipal financial software</span>
        </div>

        {/* Loading Animation */}
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>
            <div className={styles.loaderBar} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressText}>{Math.round(progress)}%</span>
        </div>

        {/* Animated dots */}
        <div className={styles.dotsContainer}>
          <span className={styles.dot} style={{ animationDelay: '0ms' }} />
          <span className={styles.dot} style={{ animationDelay: '150ms' }} />
          <span className={styles.dot} style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
