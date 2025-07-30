import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Comment from '../components/Comment';

const VideoPlayer = () => {
  const { id } = useParams(); // videoId from URL
  const { user } = useContext(AuthContext);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${id}`);
        const data = res.data;
        setVideo(data);

        if (user) {
          setIsLiked(data.likes.includes(user.id));
          setIsDisliked(data.dislikes.includes(user.id));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching video:', err);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return alert("Please sign in to like the video.");
    try {
      await axios.put(`/videos/like/${id}`);
      setIsLiked(true);
      setIsDisliked(false);
      setVideo(prev => ({
        ...prev,
        likes: [...new Set([...prev.likes, user.id])],
        dislikes: prev.dislikes.filter(uid => uid !== user.id),
      }));
    } catch (err) {
      console.error('Error liking video:', err);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("Please sign in to dislike the video.");
    try {
      await axios.put(`/videos/dislike/${id}`);
      setIsDisliked(true);
      setIsLiked(false);
      setVideo(prev => ({
        ...prev,
        dislikes: [...new Set([...prev.dislikes, user.id])],
        likes: prev.likes.filter(uid => uid !== user.id),
      }));
    } catch (err) {
      console.error('Error disliking video:', err);
    }
  };

  if (loading) return <h2 className="text-white text-center mt-10">Loading...</h2>;
  if (!video) return <h2 className="text-red-500 text-center mt-10">Video not found</h2>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          className="w-full h-[400px] rounded-lg"
          src={video.videoUrl}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <h2 className="text-2xl font-semibold mb-2">{video.title}</h2>
      <p className="text-sm text-gray-400 mb-4">
        {video.views} views • {new Date(video.uploadDate).toLocaleDateString()}
      </p>
      <p className="text-base text-gray-200 mb-6">{video.description}</p>

      {/* 👍 Like / 👎 Dislike Buttons */}
      <div className="flex items-center space-x-4 mt-2">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <FaThumbsUp /> <span>{video.likes.length}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center space-x-1 ${isDisliked ? 'text-red-500' : 'text-gray-400'}`}
        >
          <FaThumbsDown /> <span>{video.dislikes.length}</span>
        </button>
      </div>

      {/* 🗨️ Comments */}
      <Comment videoId={video._id} user={user} />
    </div>
  );
};

export default VideoPlayer;
