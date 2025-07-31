import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const EditVideo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`/videos/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    fetchVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/videos/${id}`, { title, description });
    navigate(-1);
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-[#121212] border border-gray-600"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-[#121212] border border-gray-600"
        />
        <button className="bg-green-500 px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVideo;
