import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // 'like' | 'dislike' | null
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error('Failed to load video:', err);
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) return <h2 className="text-white text-center mt-10">Loading...</h2>;

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

      {/* Like/Dislike */}
      <div className="flex items-center gap-4 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            userReaction === 'like' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => {
            if (userReaction === 'like') {
              setUserReaction(null);
              setLikes((prev) => prev - 1);
            } else {
              setUserReaction('like');
              setLikes((prev) => prev + 1);
              if (userReaction === 'dislike') setDislikes((prev) => prev - 1);
            }
          }}
        >
          <FaThumbsUp />
          {likes}
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            userReaction === 'dislike' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => {
            if (userReaction === 'dislike') {
              setUserReaction(null);
              setDislikes((prev) => prev - 1);
            } else {
              setUserReaction('dislike');
              setDislikes((prev) => prev + 1);
              if (userReaction === 'like') setLikes((prev) => prev - 1);
            }
          }}
        >
          <FaThumbsDown />
          {dislikes}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a public comment..."
            className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none"
          />
          <button
            onClick={() => {
              if (newComment.trim()) {
                setComments([{ text: newComment, date: new Date() }, ...comments]);
                setNewComment('');
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Comment
          </button>
        </div>

        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-400 text-sm">No comments yet.</p>
          )}
          {comments.map((comment, idx) => (
            <div key={idx} className="bg-[#1f1f1f] p-3 rounded-lg">
              <p className="text-sm text-white mb-1">{comment.text}</p>
              <p className="text-xs text-gray-500">
                {comment.date.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
