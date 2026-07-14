import express from 'express';
import cors from 'cors';
import { connectDatabase } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import videoRoutes from './src/routes/videoRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import videoEngineRoutes from './src/routes/videoEngineRoutes.js';
import assistantRoutes from './src/routes/assistantRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { rateLimiter } from './src/middleware/rateLimiter.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'papervideo-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/video', videoEngineRoutes);
app.use('/api/assistant', assistantRoutes);

app.get('*', (_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
  });
