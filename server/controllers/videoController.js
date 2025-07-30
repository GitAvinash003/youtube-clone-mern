import Video from '../models/Video.js';


export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (err) {
    console.error('Error fetching video by ID:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    console.error('Failed to fetch videos:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    console.error('Video upload error:', err.message);
    res.status(400).json({ error: 'Failed to upload video' });
  }
};

// controllers/videoController.js

export const likeVideo = async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.id;

  try {
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      },
      { new: true }
    );
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like video' });
  }
};

export const dislikeVideo = async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.id;

  try {
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId },
      },
      { new: true }
    );
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike video' });
  }
};
