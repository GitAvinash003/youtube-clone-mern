import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Channel = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`/videos/channel/${user.id}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error('Failed to fetch channel videos:', err);
      }
    };

    fetchUserVideos();
  }, [user]);

  const handleEdit = (videoId) => {
    navigate(`/edit-video/${videoId}`);
  };

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/videos/${videoId}`);
      setVideos((prev) => prev.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error('Failed to delete video:', err);
    }
  };
   

  if (!user) return <h2 className="text-white text-center mt-10">Sign in to view your channel</h2>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-4">My Channel</h2>
      {videos.length === 0 ? (
        <p className="text-gray-400">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video._id} className="bg-[#2a2a2a] p-4 rounded">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="w-full h-48 mb-2 rounded"
                allowFullScreen
              />
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{video.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(video._id)} className="bg-blue-500 px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(video._id)} className="bg-red-500 px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Channel;
