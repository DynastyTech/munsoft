import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'erp' | 'ict' | 'advisory';
  rightIcon?: React.ReactNode;
  rightTitle?: string;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  variant = 'erp',
  rightIcon,
  rightTitle 
}: FeatureCardProps) => {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.iconWrapper}>
        <div className={styles.icon}>
          {icon}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {rightIcon && (
            <div className={styles.rightSection}>
              <div className={styles.rightIcon}>{rightIcon}</div>
              {rightTitle && <span className={styles.rightTitle}>{rightTitle}</span>}
            </div>
          )}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
