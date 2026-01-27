import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  variant?: 'erp' | 'ict' | 'advisory';
}

const ServiceCard = ({ icon, title, description, link, variant = 'erp' }: ServiceCardProps) => {
  // Custom icons matching the brochure design
  const getIcon = () => {
    switch (variant) {
      case 'erp':
        return (
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="20" width="48" height="36" rx="2" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="26" width="10" height="10" fill="currentColor" opacity="0.3"/>
            <rect x="27" y="26" width="10" height="10" fill="currentColor" opacity="0.3"/>
            <rect x="40" y="26" width="10" height="10" fill="currentColor" opacity="0.3"/>
            <rect x="14" y="40" width="10" height="10" fill="currentColor" opacity="0.3"/>
            <rect x="27" y="40" width="10" height="10" fill="currentColor" opacity="0.3"/>
            <rect x="40" y="40" width="10" height="10" fill="currentColor" opacity="0.3"/>
            <path d="M24 8L32 4L40 8V20H24V8Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="32" cy="12" r="2" fill="currentColor"/>
          </svg>
        );
      case 'ict':
        return (
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 24C48 24 44 20 36 20C28 20 24 24 24 32C24 40 28 44 36 44H48C52 44 56 40 56 36C56 32 52 28 48 28" stroke="currentColor" strokeWidth="2"/>
            <circle cx="20" cy="32" r="12" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 28L24 36" stroke="currentColor" strokeWidth="2"/>
            <path d="M24 28L16 36" stroke="currentColor" strokeWidth="2"/>
            <circle cx="48" cy="36" r="4" fill="currentColor" opacity="0.3"/>
          </svg>
        );
      case 'advisory':
        return (
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 52V48C8 40 14 34 24 34C34 34 40 40 40 48V52" stroke="currentColor" strokeWidth="2"/>
            <circle cx="44" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M56 52V48C56 42 52 38 44 38" stroke="currentColor" strokeWidth="2"/>
            <rect x="18" y="42" width="12" height="8" rx="2" fill="currentColor" opacity="0.3"/>
          </svg>
        );
      default:
        return icon;
    }
  };

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>
          {getIcon()}
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link to={link} className={styles.link}>
        Learn More
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
};

export default ServiceCard;
