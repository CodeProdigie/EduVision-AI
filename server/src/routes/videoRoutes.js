import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, (_req, res) => {
  res.json({ items: [] });
});

router.post('/', authMiddleware, (_req, res) => {
  res.status(201).json({ message: 'Video upload endpoint ready for implementation.' });
});

export default router;
