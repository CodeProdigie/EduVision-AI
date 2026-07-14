import { Router } from 'express';
import { renderPipeline } from '../video/renderPipeline.js';

const router = Router();

router.post('/render', async (req, res) => {
  try {
    const { storyboardJson } = req.body;
    if (!storyboardJson) {
      return res.status(400).json({ message: 'storyboardJson is required' });
    }

    const result = await renderPipeline.run(storyboardJson);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Video rendering failed' });
  }
});

export default router;
