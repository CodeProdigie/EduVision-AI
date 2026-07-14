import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipelineService } from '../services/pipelineService.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/process', async (req, res) => {
  try {
    const { filePath } = req.body;
    if (!filePath) {
      return res.status(400).json({ message: 'filePath is required' });
    }

    const fullPath = path.resolve(__dirname, '../../', filePath);
    const result = await pipelineService.run(fullPath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Pipeline failed' });
  }
});

export default router;
