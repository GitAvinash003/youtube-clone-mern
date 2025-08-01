import React, { useState } from 'react';
import axios from '../api/axios'; // Your auth-aware axios instance
import { useNavigate } from 'react-router-dom';

const CreateChannel = () => {
  const [form, setForm] = useState({
    channelName: '',
    description: '',
    channelBanner: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/channels', form);
      // Backend may nest channel inside data.channel
      const id =
        res.data.channel?._id?.toString() || res.data._id?.toString();

      if (!id) {
        alert('Channel created, but ID not found — check server response.');
        return;
      }

      alert('Channel created!');
      navigate(`/channel/${id}`);
    } catch (err) {
      console.error('Error creating channel:', err.response?.data);
      alert(
        err.response?.data?.message ||
          JSON.stringify(err.response?.data) ||
          'Failed to create channel'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] text-white w-full max-w-lg p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your Channel
        </h2>

        {/* Channel Name */}
        <label className="block mb-2 text-sm text-gray-300">
          Channel Name
        </label>
        <input
          name="channelName"
          value={form.channelName}
          onChange={handleChange}
          required
          placeholder="e.g. Code with Avinash"
          className="w-full mb-4 px-4 py-2 bg-[#2a2a2a] text-white border rounded focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <label className="block mb-2 text-sm text-gray-300">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          placeholder="Tell viewers what your channel is about..."
          className="w-full mb-4 px-4 py-2 bg-[#2a2a2a] text-white border rounded focus:ring-2 focus:ring-blue-500"
        />

        {/* Banner URL */}
        <label className="block mb-2 text-sm text-gray-300">
          Channel Banner URL
        </label>
        <input
          name="channelBanner"
          value={form.channelBanner}
          onChange={handleChange}
          placeholder="https://example.com/banner.jpg"
          className="w-full mb-6 px-4 py-2 bg-[#2a2a2a] text-white border rounded focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
