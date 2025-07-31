// routes/video.js
import express from 'express';
import { getAllVideos, uploadVideo,getVideoById,deleteVideo,updateVideo } from '../controllers/videoController.js';
import { likeVideo, dislikeVideo } from '../controllers/videoController.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

router.get('/', getAllVideos); // <-- This handles GET /api/videos
router.post('/', uploadVideo); // <-- This handles POST /api/videos
router.get('/:id', getVideoById);


// router.put('/:videoId/like', protect, likeVideo);
// router.put('/:videoId/dislike', protect, dislikeVideo);

router.put('/like/:id', verifyToken, likeVideo);
router.put('/dislike/:id', verifyToken, dislikeVideo);

// Get videos by channelId
router.get('/channel/:channelId', async (req, res) => {
  try {
    const videos = await Video.find({ channelId: req.params.channelId });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/videos/:id
router.delete('/:id', verifyToken, deleteVideo);
// routes/videoRoutes.js or channelVideosRoutes.js
router.put('/:id', verifyToken, updateVideo);


export default router;

