import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import Video from '../models/Video.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const videos = await Video.find({ owner: req.user.sub }).sort({ createdAt: -1 });
    res.json({ items: videos });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch videos' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findOne({ _id: req.params.id, owner: req.user.sub });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch video' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const video = await Video.create({
      title,
      description,
      owner: req.user.sub,
      status: 'draft',
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create video' });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.sub },
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update video' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({ _id: req.params.id, owner: req.user.sub });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete video' });
  }
});

export default router;
