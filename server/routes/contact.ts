import { Router, Request, Response } from 'express';
import { sendContactEmail } from '../services/email';
import type { ContactFormData } from '../types';

const router = Router();

// Validation middleware
const validateContactForm = (req: Request, res: Response, next: Function) => {
  const { name, email, message } = req.body;

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

  next();
};

// POST /api/contact - Submit contact form
router.post('/', validateContactForm, async (req: Request, res: Response) => {
  try {
    const formData: ContactFormData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      municipality: req.body.municipality || '',
      service: req.body.service || '',
      message: req.body.message
    };

    // Send email
    const emailSent = await sendContactEmail(formData);

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    } else {
      // If email fails, still log the data and respond
      console.log('Contact form submission (email not sent):', formData);
      res.status(200).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form. Please try again.'
    });
  }
});

// GET /api/contact - Get contact information
router.get('/', (req: Request, res: Response) => {
  res.json({
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
});

export default router;
