import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ServiceCircle, ServiceCard, CountUp, AnimatedText } from '../../components';
import styles from './Home.module.css';

const heroSlides = [
  {
    id: 'brochure',
    title: 'PRODUCT BROCHURE',
    subtitle: '2026',
    description: 'Powering Smart Municipal Governance Through Digital Transformation',
    color: 'primary',
    animationType: 1 as const
  },
  {
    id: 'erp',
    title: 'ERP',
    subtitle: 'Enterprise Resource Planner',
    description: 'Financial accountability, transparency and compliance with municipal regulations across Southern Africa.',
    color: 'erp',
    link: '/erp',
    animationType: 2 as const
  },
  {
    id: 'ict',
    title: 'ICT',
    subtitle: 'Information & Communication Technology',
    description: 'From traditional IT functions to advanced IT security, cloud hosting, and data management services.',
    color: 'ict',
    link: '/ict',
    animationType: 3 as const
  },
  {
    id: 'advisory',
    title: 'ADVISORY',
    subtitle: 'Expert Consultation',
    description: 'Technical support ensuring public finance management through capacity building and compliance.',
    color: 'advisory',
    link: '/advisory',
    animationType: 4 as const
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'enter' | 'exit'>('enter');
  
  const introAnim = useScrollAnimation();
  const servicesAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation();
  const softwareAnim = useScrollAnimation();
  const ictAnim = useScrollAnimation();
  const advisoryAnim = useScrollAnimation();
  const heroRef = useRef<HTMLElement>(null);
  const cityBgRef = useRef<HTMLDivElement>(null);

  // Text animations are now handled by autoPlay on AnimatedText components
  // with key={currentSlide} forcing remount on slide change

  // Auto-cycle through slides
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('exit');
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setSlideDirection('enter');
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 600);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Parallax effect for hero background
  useEffect(() => {
    const handleScroll = () => {
      if (cityBgRef.current && heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        if (scrollY <= heroHeight) {
          cityBgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className={styles.home}>
      {/* Hero Section - Animated Slider */}
      <section ref={heroRef} className={styles.hero}>
        {/* City Background - Left Side with Parallax */}
        <div ref={cityBgRef} className={styles.cityBackground}>
          <img 
            src="/assets/images/city-1.jpg" 
            alt="City skyline"
            className={styles.cityBgImage}
          />
          <div className={styles.cityOverlay}></div>
        </div>
        
        {/* Gray Diagonal Overlay */}
        <div className={styles.grayDiagonal}></div>
        <div className={styles.grayDiagonalLight}></div>
        
        {/* Animated Content */}
        <div className={styles.heroContent}>
          <div className={`${styles.heroTextSection} ${styles[`slide${currentSlideData.color}`]}`}>
            {/* Animated Title */}
            <div className={`${styles.heroTitle} ${isAnimating ? styles[slideDirection] : styles.visible}`}>
              <h2 className={styles.slideTitle}>
                <AnimatedText
                  key={`title-${currentSlide}`}
                  text={currentSlideData.title}
                  animationType={currentSlideData.animationType}
                  tag="span"
                  duration={400}
                  letterDelay={20}
                  autoPlay
                />
              </h2>
              <span className={styles.slideSubtitle}>
                <AnimatedText
                  key={`subtitle-${currentSlide}`}
                  text={currentSlideData.subtitle}
                  animationType={currentSlideData.animationType}
                  tag="span"
                  delay={300}
                  duration={350}
                  letterDelay={15}
                  autoPlay
                />
              </span>
              
              {/* Animated Line */}
              <div className={styles.animatedLineContainer}>
                <div className={styles.animatedLine}></div>
              </div>
              
              {/* Description */}
              <p key={`desc-${currentSlide}`} className={styles.slideDescription}>
                {currentSlideData.description}
              </p>
              
              {/* Link for service slides */}
              {currentSlideData.link && (
                <Link 
                  key={`link-${currentSlide}`}
                  to={currentSlideData.link} 
                  className={`${styles.slideLink} ${styles[`link${currentSlideData.color}`]}`}
                >
                  Learn More
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>
          
          {/* Lady Image - positioned to overlap with gray area */}
          <div className={styles.personContainer}>
            <img 
              src="/assets/images/lady.png" 
              alt="Munsoft representative"
              className={styles.personImage}
            />
          </div>
        </div>

        {/* Slide Indicators */}
        <div className={styles.slideIndicators}>
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => {
                if (!isAnimating && index !== currentSlide) {
                  setSlideDirection('exit');
                  setIsAnimating(true);
                  
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setSlideDirection('enter');
                    setTimeout(() => setIsAnimating(false), 600);
                  }, 400);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Animated Wave at Bottom */}
        <div className={styles.waveContainer}>
          <svg className={styles.wave} viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              className={styles.wavePath1}
              d="M0,60 C150,120 350,0 500,60 C650,120 800,0 1000,60 C1150,120 1300,0 1440,60 L1440,120 L0,120 Z"
            />
            <path 
              className={styles.wavePath2}
              d="M0,80 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1350,30 1400,80 1440,70 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
        
        {/* Tagline at bottom */}
        <div className={styles.taglineSection}>
          <p className={styles.taglinePrimary}>Powering Smart Municipal Governance</p>
          <p className={styles.taglineSecondary}>Through Digital Transformation</p>
        </div>
      </section>

      {/* Introduction Section - Page 1 Style */}
      <section className={styles.intro}>
        <div className={styles.introHeader}>
          <div className={styles.logoSmall}>
            <span className={styles.logoText}>MUNSOFT</span>
            <span className={styles.logoSubtext}>municipal financial software</span>
          </div>
          <div className={styles.cityCornerImage}>
            <img 
              src="/assets/images/city-3.jpg" 
              alt="City view"
              className={styles.cornerImage}
            />
          </div>
        </div>
        
        <div 
          ref={introAnim.ref} 
          className={`${styles.introContent} ${introAnim.isVisible ? styles.visible : ''}`}
        >
          <p className={styles.introText}>
            Munsoft is committed to partnering with municipalities to make them the best-run in 
            the world by being the leading municipal ERP solutions and services company. We 
            provide Enterprise Resource Planner, Advisory and ICT solutions that align with the 
            Municipal Finance Management Act (MFMA), the Municipal Standard Chart of 
            Accounts (mSCOA) and other key governance instruments. This product list outlines the 
            full range of Munsoft's offerings, reflecting our role as a strategic partner to 
            municipalities in advancing good governance and sustainable development.
          </p>
        </div>
        
        {/* Service Descriptions with Circular Images */}
        <div className={styles.serviceDescriptions}>
          <div 
            ref={softwareAnim.ref}
            className={`${styles.serviceRow} ${softwareAnim.isVisible ? styles.visible : ''}`}
          >
            <div className={styles.serviceTextContent}>
              <h3 className={styles.serviceTitle}>Software: Enterprise Resource Planner</h3>
              <p className={styles.serviceDescription}>
                We provide an ERP solution and internal control systems that 
                enable municipalities and their entities across Southern Africa 
                to ensure financial accountability, transparency and 
                compliance with the required national & provincial government 
                regulations and standards.
              </p>
              <div className={styles.serviceLine}></div>
            </div>
            <div className={styles.serviceImageWrapper}>
              <div className={styles.circularImage}>
                <img 
                  src="/assets/images/city-2.jpg" 
                  alt="ERP Services"
                />
              </div>
            </div>
          </div>
          
          <div 
            ref={ictAnim.ref}
            className={`${styles.serviceRow} ${ictAnim.isVisible ? styles.visible : ''}`}
          >
            <div className={styles.serviceTextContent}>
              <h3 className={styles.serviceTitle}>ICT</h3>
              <p className={styles.serviceDescription}>
                Ensuring that the Financial Management and Control systems 
                are in place and working optimally. This ensures accurate 
                information for decision making as well as enabling the 
                implementation of effective business processes and optimizing 
                data security and recovery.
              </p>
              <div className={styles.serviceLine}></div>
            </div>
            <div className={styles.serviceImageWrapper}>
              <div className={styles.circularImage}>
                <img 
                  src="/assets/images/city-1.jpg" 
                  alt="ICT Services"
                />
              </div>
            </div>
          </div>
          
          <div 
            ref={advisoryAnim.ref}
            className={`${styles.serviceRow} ${advisoryAnim.isVisible ? styles.visible : ''}`}
          >
            <div className={styles.serviceTextContent}>
              <h3 className={styles.serviceTitle}>Advisory</h3>
              <p className={styles.serviceDescription}>
                We can supplement the municipality's capacity with our 
                internal specialists as well as various partners. Our Advisory 
                services assist in compliance with the Municipal Standard 
                Chart of Accounts (mSCOA), budget reforms and other 
                reporting requirements as per the Municipal Finance 
                Management Act (MFMA).
              </p>
              <div className={styles.serviceLine}></div>
            </div>
            <div className={styles.serviceImageWrapper}>
              <div className={styles.circularImage}>
                <img 
                  src="/assets/images/city-3.jpg" 
                  alt="Advisory Services"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Circle Section - Donut Chart */}
      <section className={styles.servicesCircle}>
        <div className={styles.circleIntro}>
          <p className={styles.circleIntroText}>
            <strong>Munsoft</strong> is committed to partnering with municipalities to 
            be the best-run in the world by being the leading municipal 
            ERP solution provider. We align with the Municipal Finance Management Act (MFMA) to provide comprehensive solutions in 
            three core areas:
          </p>
        </div>
        <div 
          ref={servicesAnim.ref}
          className={`${styles.circleSection} ${servicesAnim.isVisible ? styles.visible : ''}`}
        >
          <ServiceCircle />
        </div>
      </section>

      {/* Service Cards Section */}
      <section className={styles.serviceCards}>
        <div 
          ref={cardsAnim.ref}
          className={`${styles.cardsGrid} ${cardsAnim.isVisible ? styles.visible : ''}`}
        >
          <ServiceCard
            variant="erp"
            icon={
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            }
            title="ERP"
            description="Enterprise Resource Planner solutions that ensure financial accountability, transparency, and compliance with municipal regulations."
            link="/erp"
          />
          
          <ServiceCard
            variant="ict"
            icon={
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
            }
            title="ICT"
            description="Comprehensive IT management from traditional IT functions to advanced IT security and cloud hosting services."
            link="/ict"
          />
          
          <ServiceCard
            variant="advisory"
            icon={
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            }
            title="Advisory"
            description="Advisory services providing technical support to councils ensuring public finance management through capacity building."
            link="/advisory"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsBackground}>
          <img 
            src="/assets/images/city-2.jpg" 
            alt="City background"
            className={styles.statsBgImage}
          />
        </div>
        <div className={styles.statsOverlay}></div>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>
              <CountUp end={25} duration={2000} suffix="+" />
            </h3>
            <p className={styles.statLabel}>Years of Excellence</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>
              <CountUp end={60} duration={2000} suffix="+" />
            </h3>
            <p className={styles.statLabel}>Municipalities Served</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>
              <CountUp end={200} duration={2500} suffix="+" />
            </h3>
            <p className={styles.statLabel}>Skilled Employees</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>
              <CountUp end={3} duration={1500} />
            </h3>
            <p className={styles.statLabel}>Countries</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
