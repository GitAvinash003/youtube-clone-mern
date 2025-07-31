import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const ChannelVideoPage = () => {
  const { channelId } = useParams();
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(`/videos/channel/${channelId}`);
        setVideos(res.data);
      } catch (err) {
        console.error('Error loading channel videos:', err.response?.data || err.message);
      }
    };

    fetchChannelVideos();
  }, [channelId]);

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/videos/${videoId}`); // ✅ Correct route
      setVideos((prev) => prev.filter((video) => video._id !== videoId));
      alert('Video deleted successfully');
    } catch (err) {
      console.error('Failed to delete video:', err.response?.data || err.message);
      alert('Failed to delete video');
    }
  };

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Channel's Uploaded Videos</h1>
        {user?.id === channelId && (
          <Link
            to="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Upload New Video
          </Link>
        )}
      </div>

      {videos.length === 0 ? (
        <p>No videos found for this channel.</p>
      ) : (
        videos.map((video) => (
          <div key={video._id} className="mb-4 border-b border-gray-600 pb-2">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p>{video.description}</p>

            {user?.id === video.uploader && (
              <div className="mt-2 flex space-x-4">
                <Link
                  to={`/video/edit/${video._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ChannelVideoPage;
