import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import VideoCard from '../components/VideoCard';

// Dummy channel data (can remove if using backend response)
export const dummyChannel = {
  id: 'channel01',
  name: 'CodeWithJohn',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
  subscribers: 21500,
  description: 'Coding tutorials on React, Node.js, and more!',
};

const Channel = () => {
  const { id } = useParams(); // channelId from route
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // If using backend:
        const res = await axios.get(`/channels/${id}`);
        setChannel(res.data.channel);
        setVideos(res.data.videos);

        // You can also get subscription status from backend here if needed
      } catch (err) {
        console.error('Failed to load channel:', err);

        // Fallback to dummy data
        setChannel(dummyChannel);
        setVideos([]);
      }
    };
    fetchChannelData();
  }, [id]);

  if (!channel) return <h2 className="text-white text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <img
            src={channel.avatarUrl}
            alt="Channel Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{channel.name}</h2>
            <p className="text-gray-400 text-sm">{channel.subscribers} subscribers</p>
          </div>
        </div>

        <button
          onClick={() => setIsSubscribed((prev) => !prev)}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            isSubscribed ? 'bg-gray-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Videos by Channel */}
      <div className="flex flex-wrap gap-6">
        {videos.length === 0 && (
          <p className="text-gray-400 text-sm">This channel has no videos yet.</p>
        )}
        {videos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Channel;
