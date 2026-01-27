import { useState } from 'react';
import type { FormEvent } from 'react';
import { submitContactForm } from '../../services/api';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    municipality: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await submitContactForm(formData);

      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage(response.message || 'Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          municipality: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(response.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 5000);
    }
  };

  return (
    <div className={styles.contact}>
      {/* Hero Section with Building Image */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <img 
            src="/assets/images/black-and-white-buidling.jpg" 
            alt="City buildings"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroHeader}>
          <div className={styles.logo}>
            <span className={styles.logoText}>MUNSOFT</span>
            <span className={styles.logoSubtext}>municipal financial software</span>
          </div>
          <div className={styles.accentCorner}></div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h1 className={styles.mainTitle}>Contact Us</h1>
          
          {/* Contact Info Bar */}
          <div className={styles.contactBar}>
            <div className={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>011 215 8000</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>info@munsoft.co.za</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>www.munsoft.co.za</span>
            </div>
          </div>

          {/* Office Locations Grid */}
          <div className={styles.locationsGrid}>
            <div className={styles.locationCard}>
              <div className={styles.locationIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.locationTitle}>Johannesburg</h3>
              <address className={styles.locationAddress}>
                Building A, 1st Floor,<br/>
                11 Naivasha Rd<br/>
                Sunninghill, Sandton,<br/>
                2157
              </address>
            </div>

            <div className={styles.locationCard}>
              <div className={styles.locationIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.locationTitle}>Centurion</h3>
              <address className={styles.locationAddress}>
                Building 17,<br/>
                Cambridge Office Park,<br/>
                5 Bauhinia Street,<br/>
                Highveld Technopark,<br/>
                Centurion 0169
              </address>
            </div>

            <div className={styles.locationCard}>
              <div className={styles.locationIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.locationTitle}>Polokwane</h3>
              <address className={styles.locationAddress}>
                The Office Park 10,<br/>
                89 Hans van Rensburg Street,<br/>
                Polokwane,<br/>
                0700
              </address>
            </div>

            <div className={styles.locationCard}>
              <div className={styles.locationIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.locationTitle}>Durban</h3>
              <address className={styles.locationAddress}>
                Regus Business Centre, 21 Aurora Drive,<br/>
                1st Floor Liberty Life Building,<br/>
                Umhlanga Ridge,<br/>
                4319
              </address>
            </div>

            <div className={styles.locationCard}>
              <div className={styles.locationIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className={styles.locationTitle}>Cape Town</h3>
              <address className={styles.locationAddress}>
                Unit A13, First Floor, Block A, Grosvenor Square,<br/>
                12 Park Lane, Century City,<br/>
                Cape Town,<br/>
                7441
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formWrapper}>
              <h2>Send Us a Message</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="municipality">Municipality/Organization</label>
                    <input
                      type="text"
                      id="municipality"
                      value={formData.municipality}
                      onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="service">Service of Interest</label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    <option value="erp">ERP Solutions</option>
                    <option value="ict">ICT Management</option>
                    <option value="advisory">Advisory Services</option>
                    <option value="training">Training & Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    {statusMessage}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>

            <div className={styles.mapWrapper}>
              <div className={styles.mapPlaceholder}>
                <h3>Our Offices</h3>
                <p>We have offices across South Africa to serve you better.</p>
                <div className={styles.officeHours}>
                  <h4>Office Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className={styles.supportNote}>24/7 Technical Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
