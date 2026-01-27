import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/health - Health check endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

export default router;
