import React, { useState, useEffect} from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../context/AuthContext';

const EditChannel = () => {
  const [form, setForm] = useState({
    channelName: '',
    description: '',
    channelBanner: '',
  });
  const [channelId, setChannelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get('/channels/me');
        const channel = res.data.channel;

        setForm({
          channelName: channel.channelName || '',
          description: channel.description || '',
          channelBanner: channel.channelBanner || '',
        });
        setChannelId(channel._id); // ✅ save real channel ID
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch channel:', err);
        alert('Failed to fetch channel');
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!channelId) return alert('Missing channel ID');

      const res = await axios.put(`/channels/${channelId}`, form); // ✅ use correct ID
      alert('Channel updated successfully!');
      navigate('/my-channel'); // or '/my-channel' depending on your route
    } catch (err) {
      console.error('Error updating channel:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to update channel');
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded text-white shadow-md w-full border max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Your Channel</h2>

        <input
          name="channelName"
          placeholder="Channel Name"
          value={form.channelName}
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
          name="channelBanner"
          placeholder="Banner URL"
          value={form.channelBanner}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Channel
        </button>
      </form>
    </div>
  );
};

export default EditChannel;
