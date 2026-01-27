import nodemailer from 'nodemailer';
import type { ContactFormData } from '../types';

// Create transporter (configure with your email service)
const createTransporter = () => {
  // For production, use environment variables
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // For development/testing - logs email instead of sending
  return null;
};

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  const transporter = createTransporter();

  // Email content
  const emailContent = `
New Contact Form Submission - Munsoft Website
==============================================

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Municipality/Organization: ${formData.municipality || 'Not provided'}
Service of Interest: ${formData.service || 'Not specified'}

Message:
${formData.message}

---
Submitted at: ${new Date().toISOString()}
  `.trim();

  // If no transporter (development mode), log the email
  if (!transporter) {
    console.log('\n📧 Email would be sent (development mode):');
    console.log('━'.repeat(50));
    console.log(emailContent);
    console.log('━'.repeat(50));
    return true;
  }

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@munsoft.co.za',
      to: process.env.CONTACT_EMAIL || 'info@munsoft.co.za',
      replyTo: formData.email,
      subject: `New Contact Form: ${formData.name} - ${formData.service || 'General Inquiry'}`,
      text: emailContent
    });

    console.log(`✅ Email sent successfully to ${process.env.CONTACT_EMAIL}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
};

// Send auto-reply to user
export const sendAutoReply = async (formData: ContactFormData): Promise<boolean> => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log(`📧 Auto-reply would be sent to ${formData.email}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@munsoft.co.za',
      to: formData.email,
      subject: 'Thank you for contacting Munsoft',
      text: `
Dear ${formData.name},

Thank you for reaching out to Munsoft. We have received your message and will get back to you within 24-48 business hours.

If your inquiry is urgent, please call us directly at 011 216 8000.

Best regards,
The Munsoft Team

---
Munsoft - Powering Smart Municipal Governance Through Digital Transformation
www.munsoft.co.za
      `.trim()
    });

    return true;
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
    return false;
  }
};
