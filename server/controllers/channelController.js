import Channel from '../models/Channel.js';
import Video from '../models/Video.js';

// Create a channel
export const createChannel = async (req, res) => {
  try {
    const existing = await Channel.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Channel already exists' });
    }

    const newChannel = new Channel({
      channelName: req.body.channelName,
      owner: req.user._id,
      description: req.body.description,
      channelBanner: req.body.channelBanner,
    });

    const saved = await newChannel.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Create Channel Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get channel by ID with videos
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId).populate('owner', 'username');
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    const videos = await Video.find({ channelId: channel._id });
    res.json({ channel, videos });
  } catch (err) {
    console.error('Get Channel Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user's channel and videos
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user._id });
    if (!channel) return res.status(404).json({ message: 'No channel found' });

    const videos = await Video.find({ channelId: channel._id });
    res.json({ channel, videos });
  } catch (err) {
    console.error('Get My Channel Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    channel.channelName = req.body.channelName || channel.channelName;
    channel.description = req.body.description || channel.description;
    channel.channelBanner = req.body.channelBanner || channel.channelBanner;

    const updated = await channel.save();
    res.json(updated);
  } catch (err) {
    console.error('Error updating channel:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Delete a channel
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await channel.deleteOne();
    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (err) {
    console.error('Delete Channel Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
