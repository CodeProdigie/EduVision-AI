import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (_req, res) => {
  const token = jwt.sign({ sub: 'demo-user', role: 'student' }, process.env.JWT_SECRET || 'development-secret', { expiresIn: '7d' });
  res.json({ token, user: { id: 'demo-user', name: 'Demo User', email: 'demo@example.com', role: 'student' } });
});

router.post('/register', (_req, res) => {
  const token = jwt.sign({ sub: 'demo-user', role: 'student' }, process.env.JWT_SECRET || 'development-secret', { expiresIn: '7d' });
  res.json({ token, user: { id: 'demo-user', name: 'Demo User', email: 'demo@example.com', role: 'student' } });
});

export default router;
