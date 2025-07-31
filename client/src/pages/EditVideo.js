import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${id}`);
        setVideo({ title: res.data.title, description: res.data.description });
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    };
    fetchVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/videos/${id}`, video);
      navigate(-1); // Go back to the previous page (Channel page)
    } catch (err) {
      console.error('Error updating video:', err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Video</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={video.title}
          onChange={(e) => setVideo({ ...video, title: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          required
        />
        <label className="block mb-2">Description</label>
        <textarea
          value={video.description}
          onChange={(e) => setVideo({ ...video, description: e.target.value })}
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
