import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateChannel = () => {
  const [form, setForm] = useState({
    channelName: '',
    description: '',
    channelBanner: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/channels', form);
      alert('Channel created!');
      navigate(`/channel/${res.data._id}`);
    } catch (err) {
      console.error('Error creating channel:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to create channel');
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

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Channel Name
          </label>
          <input
            type="text"
            name="channelName"
            value={form.channelName}
            onChange={handleChange}
            required
            placeholder="e.g. Code with Avinash"
            className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Tell viewers what your channel is about..."
            className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Channel Banner URL
          </label>
          <input
            type="text"
            name="channelBanner"
            value={form.channelBanner}
            onChange={handleChange}
            placeholder="https://example.com/banner.jpg"
            className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition duration-200"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
