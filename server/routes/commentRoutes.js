import express from 'express';
import {
  addComment,
  getComments,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/:videoId', verifyToken, addComment);         // POST
router.get('/:videoId', getComments);                      // GET
router.put('/:commentId', verifyToken, updateComment);     // PUT
router.delete('/:commentId', verifyToken, deleteComment);  // DELETE



export default router;




