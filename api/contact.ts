import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  municipality?: string;
  service?: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: {
        phone: '011 216 8000',
        email: 'info@munsoft.co.za',
        headquarters: {
          address: 'Building A, Bd Floor, JT Bechom',
          city: 'Johannesburg',
          country: 'South Africa'
        },
        offices: [
          'Johannesburg',
          'Tshwane',
          'Polokwane',
          'Pietermaritzburg',
          'Cape Town',
          'Windhoek (Namibia)'
        ],
        hours: {
          weekdays: '8:00 AM - 5:00 PM',
          weekend: 'Closed',
          support: '24/7 Technical Support Available'
        }
      }
    });
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, municipality, service, message } = req.body as ContactFormData;

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields'
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      // Log the submission (in production, send email or save to database)
      console.log('Contact form submission:', {
        name,
        email,
        phone: phone || 'Not provided',
        municipality: municipality || 'Not provided',
        service: service || 'Not specified',
        message,
        timestamp: new Date().toISOString()
      });

      // Here you would typically:
      // 1. Send an email using a service like SendGrid, Resend, or Nodemailer
      // 2. Save to a database
      // 3. Send to a webhook (Slack, Discord, etc.)

      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit contact form. Please try again.'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
