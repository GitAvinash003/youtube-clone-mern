import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    channelId: '',
  });

  const [loading, setLoading] = useState(false);
  const [myChannel, setMyChannel] = useState(null);
  const navigate = useNavigate();

  // Fetch user's channel info on mount
  useEffect(() => {
    const fetchMyChannel = async () => {
      try {
        const res = await axios.get('/channels/me');
        setMyChannel(res.data.channel);
        setForm((prev) => ({ ...prev, channelId: res.data.channel._id }));
      } catch (err) {
        alert('Create your channel first');
        navigate('/create-channel');
      }
    };
    fetchMyChannel();
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/channel-videos', form);
      alert('Video uploaded successfully!');
      navigate('/my-channel'); // (or your ChannelPage route path)
    } catch (err) {
      console.error('Upload error:', err);
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  if (!myChannel) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded  shadow-md w-full max-w-lg text-gray-900"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Upload New Video</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          rows="3"
        />

        <input
          name="thumbnailUrl"
          placeholder="Thumbnail Image URL"
          value={form.thumbnailUrl}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <input
          name="videoUrl"
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
