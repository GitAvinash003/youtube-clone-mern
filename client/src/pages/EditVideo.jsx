import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${videoId}`);
        setForm({
          title: res.data.title || '',
          description: res.data.description || '',
          thumbnailUrl: res.data.thumbnailUrl || '',
          videoUrl: res.data.videoUrl || ''
        });
        setLoading(false);
      } catch (err) {
        alert('Failed to fetch video');
        console.error(err);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/videos/${videoId}`, form);
      alert('Video updated successfully!');
      navigate('/my-channel'); // or redirect wherever needed
    } catch (err) {
      alert('Failed to update video');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center text-white mt-8">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white  text-gray-900 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Video</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
          rows="3"
        />

        <input
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={form.thumbnailUrl}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          name="videoUrl"
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
