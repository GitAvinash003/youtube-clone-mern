import express from 'express';
import { uploadVideoToChannel, getChannelVideos,getVideoById,updateVideo,deleteVideo } from '../controllers/channelVideosController.js';
import { protect } from '../middleware/authMiddleware.js';
 


const router = express.Router();

// POST /api/channel-videos → Upload video for logged-in user's channel
router.post('/', protect, uploadVideoToChannel);

// GET /api/channel-videos/:channelId → Get videos for a channel
router.get('/:channelId', getChannelVideos);

// Update video
router.put('/:id', protect, updateVideo);

// Delete video
router.delete('/:id', protect, deleteVideo);

// Optional: Get a video by ID
router.get('/:id', getVideoById);




export default router;
