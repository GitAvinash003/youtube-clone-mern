// server/models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploader: String,
  views: Number,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  uploadDate: Date,
  comments: [
    {
      commentId: String,
      userId: String,
      text: String,
      timestamp: Date,
    },
  ],
});


const Video = mongoose.model('Video', videoSchema);

export default Video;

