// routes/video.js
import express from 'express';
import { getAllVideos, uploadVideo,getVideoById,  } from '../controllers/videoController.js';
import { likeVideo, dislikeVideo } from '../controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllVideos); // <-- This handles GET /api/videos
router.post('/', uploadVideo); // <-- This handles POST /api/videos
router.get('/:id', getVideoById);


router.put('/:videoId/like', protect, likeVideo);
router.put('/:videoId/dislike', protect, dislikeVideo);


export default router;

