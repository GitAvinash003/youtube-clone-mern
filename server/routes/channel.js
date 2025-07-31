// routes/channel.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import Channel from '../models/Channel.js';
import Video from '../models/Video.js';

const router = express.Router();

// Create channel
router.post('/create', verifyToken, async (req, res) => {
  try {
    const channel = new Channel({
      name: req.body.name,
      description: req.body.description,
      owner: req.user.id,
    });
    const saved = await channel.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get videos by channel
router.get('/:id/videos', async (req, res) => {
  try {
    const videos = await Video.find({ channelId: req.params.id });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);


export default router;
