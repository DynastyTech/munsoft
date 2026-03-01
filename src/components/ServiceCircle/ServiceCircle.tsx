import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceCircle.module.css';

const ServiceCircle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Donut parameters
  const size = 600;
  const strokeWidth = 155; // Thicker ring (+2%)
  const radius = (size / 2) - (strokeWidth / 2); // 222.5 - keeps outer edge at boundary
  const circumference = 2 * Math.PI * radius; // ~1398
  const segmentLength = circumference / 3; // ~466 (each segment is 120°)

  return (
    <div className={styles.circleWrapper}>
      <div 
        ref={containerRef}
        className={`${styles.donutContainer} ${isVisible ? styles.animate : ''}`}
      >
        {/* SVG Donut Ring - Y-shaped 3-star layout */}
        <svg 
          className={styles.donutSvg} 
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <linearGradient id="erpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6720" />
              <stop offset="100%" stopColor="#E85A24" />
            </linearGradient>
            <linearGradient id="ictGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#768692" />
              <stop offset="100%" stopColor="#5f6c76" />
            </linearGradient>
            <linearGradient id="advisoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#222222" />
            </linearGradient>
          </defs>
          
          {/* ERP Segment - Orange - TOP-LEFT (150° to 270°) */}
          <circle
            className={`${styles.segment} ${styles.erpSegment}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#erpGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={0}
            style={{ transform: 'rotate(150deg)', transformOrigin: 'center' }}
          />
          
          {/* ICT Segment - Teal - TOP-RIGHT (270° to 30°) */}
          <circle
            className={`${styles.segment} ${styles.ictSegment}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#ictGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={0}
            style={{ transform: 'rotate(270deg)', transformOrigin: 'center' }}
          />
          
          {/* Advisory Segment - Gray - BOTTOM (30° to 150°) */}
          <circle
            className={`${styles.segment} ${styles.advisorySegment}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#advisoryGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={0}
            style={{ transform: 'rotate(30deg)', transformOrigin: 'center' }}
          />
        </svg>

        {/* Center Logo */}
        <div className={styles.center}>
          <img
            src="/assets/images/Logo_Munsoft_%20Transp.png"
            alt="Munsoft"
            className={styles.centerLogoImage}
          />
        </div>

        {/* Labels positioned on their respective segments */}
        {/* ERP Label - TOP-LEFT segment */}
        <Link to="/erp" className={`${styles.segmentLabel} ${styles.erpLabel}`}>
          <div className={styles.labelIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="8" width="4" height="13"/>
              <rect x="10" y="5" width="4" height="16"/>
              <rect x="17" y="2" width="4" height="19"/>
            </svg>
          </div>
          <h3>ERP</h3>
          <p>Municipal<br/>management<br/>compliance<br/>accountability<br/>controlling</p>
        </Link>

        {/* ICT Label - TOP-RIGHT segment */}
        <Link to="/ict" className={`${styles.segmentLabel} ${styles.ictLabel}`}>
          <div className={styles.labelIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
          </div>
          <h3>ICT</h3>
          <p>Management<br/>government<br/>concentrating<br/>data processes<br/>consultants<br/>control/flow</p>
        </Link>

        {/* Advisory Label - BOTTOM segment */}
        <Link to="/advisory" className={`${styles.segmentLabel} ${styles.advisoryLabel}`}>
          <div className={styles.labelIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Advisory</h3>
          <p>Finance Instructors,<br/>analysing financial<br/>organisations</p>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCircle;
