import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createChannel,
  getChannelById,
  getMyChannel,
  //updateVideo,
  deleteChannel,
  updateChannel,
} from '../controllers/channelController.js';

const router = express.Router();

router.post('/', protect, createChannel);
router.get('/me', protect, getMyChannel);
router.get('/:channelId', getChannelById);
//router.put('/video/:id', protect, updateVideo); // For video edit
router.delete('/:id', protect, deleteChannel);  // For channel delete
router.put('/:id', protect, updateChannel);


export default router;
