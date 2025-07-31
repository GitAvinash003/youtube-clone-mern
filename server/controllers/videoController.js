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


export const getVideosByChannel = async (req, res) => {
  try {
    const userId = req.params.userId;
    const videos = await Video.find({ userId });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching channel videos' });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    console.log('Video uploader:', video.uploader);
    console.log('User ID:', req.user.id);

    if (!video.uploader || !req.user || !req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (video.uploader.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can delete only your own videos' });
    }

    await video.deleteOne();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (!video.uploader || video.uploader.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can update only your own videos' });
    }

    const { title, description, thumbnailUrl, videoUrl } = req.body;

    video.title = title || video.title;
    video.description = description || video.description;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
    video.videoUrl = videoUrl || video.videoUrl;

    const updated = await video.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

