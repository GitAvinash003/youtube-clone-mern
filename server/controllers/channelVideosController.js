import Channel from '../models/Channel.js';
import Video from '../models/Video.js';

export const uploadVideoToChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user._id });
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      thumbnailUrl: req.body.thumbnailUrl,
      videoUrl: req.body.videoUrl,
      uploader: req.user._id,
      channelId: channel._id,
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to upload video' });
  }
};

export const getChannelVideos = async (req, res) => {
  try {
    const { channelId } = req.params;
    const videos = await Video.find({ channelId });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

// Update
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(video, req.body);
    await video.save();
    res.json(video);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional: Get one video
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};