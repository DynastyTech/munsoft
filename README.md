# Munsoft Website

> Powering Smart Municipal Governance Through Digital Transformation

A modern React + TypeScript website with Node.js backend for Munsoft - South Africa's leading municipal financial software provider.

## Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router** - Client-side Routing
- **CSS Modules** - Scoped Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **TypeScript** - Type Safety
- **Nodemailer** - Email Service
- **Vercel Serverless Functions** - Production API

## Features

- Light & Dark Mode with persistence
- Fully Responsive Design
- Smooth Scroll Animations
- Contact Form with API backend
- Email notifications
- Modern UI matching brochure design
- Fast loading with Vite
- SEO Optimized

## Quick Start

```bash
# Install dependencies
npm install

# Start frontend only
npm run dev

# Start backend only
npm run dev:server

# Start both frontend and backend
npm run dev:all

# Build for production
npm run build
```

## Project Structure

```
munsoft/
├── api/                     # Vercel serverless functions
│   ├── contact.ts          # Contact form API
│   └── health.ts           # Health check API
├── server/                  # Express backend (for local dev)
│   ├── index.ts            # Server entry point
│   ├── routes/             # API routes
│   │   ├── contact.ts
│   │   └── health.ts
│   ├── services/           # Business logic
│   │   └── email.ts
│   └── types/              # TypeScript types
│       └── index.ts
├── src/                     # React frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API client
│   ├── context/            # React Context
│   ├── hooks/              # Custom hooks
│   └── styles/             # Global styles
├── public/
│   └── assets/images/      # Static images
├── package.json
├── vercel.json             # Vercel configuration
├── tsconfig.json           # Frontend TypeScript config
└── tsconfig.server.json    # Backend TypeScript config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/contact` | Get contact information |
| POST | `/api/contact` | Submit contact form |

### Contact Form Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "011 123 4567",
  "municipality": "City of Johannesburg",
  "service": "erp",
  "message": "I would like to learn more about your ERP solutions."
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Vite API URL (for frontend)
VITE_API_URL=http://localhost:5000

# SMTP Configuration (optional - for email)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_FROM=noreply@munsoft.co.za

# Contact Email
CONTACT_EMAIL=info@munsoft.co.za
```

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Munsoft website with backend"
git branch -M main
git remote add origin https://github.com/DynastyTech/munsoft.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import `DynastyTech/munsoft` repository
5. Vercel will auto-detect the configuration
6. Add environment variables if needed
7. Click "Deploy"

The frontend and API will be deployed together automatically!

### Step 3: Test the API

After deployment, test the endpoints:

```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Get contact info
curl https://your-domain.vercel.app/api/contact

# Submit contact form
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## Local Development

### Frontend Only (Port 3000)
```bash
npm run dev
```

### Backend Only (Port 5000)
```bash
npm run dev:server
```

### Both Together
```bash
npm run dev:all
```

## Adding Images

Extract images from the brochure and place them in `public/assets/images/`:

1. **munsoft-person.png** - Lady with Munsoft t-shirt (transparent background)
2. **city-bg.jpg** - City buildings background
3. **city-skyline.jpg** - City skyline for ERP page
4. **city-corner.jpg** - Small city image for ICT page

### Recommended Image Extraction Tools (Free):

- **[Photopea](https://www.photopea.com)** - Free online Photoshop alternative
- **[Remove.bg](https://www.remove.bg)** - Remove background from person image
- **[Canva](https://www.canva.com)** - General image editing
- **[GIMP](https://www.gimp.org)** - Free desktop software

## Email Configuration

For production email sending, you can use:

1. **SendGrid** - Reliable email API
2. **Resend** - Modern email API
3. **AWS SES** - Amazon's email service
4. **Gmail SMTP** - For small volumes

Example with SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Color Scheme

- Primary Orange: `#E85A24`
- Secondary Blue: `#5B8FA3`
- Tertiary Gray: `#6B7280`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend development server |
| `npm run dev:server` | Start backend development server |
| `npm run dev:all` | Start both servers concurrently |
| `npm run build` | Build frontend for production |
| `npm run start:server` | Start backend server |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

© 2025 Munsoft. All rights reserved.

## Contact

- Phone: 011 216 8000
- Email: info@munsoft.co.za
- Website: [munsoft.co.za](https://www.munsoft.co.za)
