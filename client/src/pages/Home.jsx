import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

const Home = ({ searchTerm }) => {
  const [videos, setVideos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React', 'Node.js', 'MongoDB'];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/videos')
      .then((res) => setVideos(res.data))
      .catch((err) => console.error('Error fetching videos:', err));
  }, []);

  const filteredVideos = videos.filter((v) => {
    if (activeFilter === 'All') return true;
    return v.title.toLowerCase().includes(activeFilter.toLowerCase());
  }).filter((v) =>
    v.title.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="p-4 pt-20 min-h-screen bg-[#181818] text-white">
      <div className="mb-4 flex gap-2 flex-wrap">
        {filters.map((label) => (
          <button
            key={label}
            onClick={() => setActiveFilter(label)}
            className={`px-4 py-1 rounded-full text-sm transition ${
              activeFilter === label
                ? 'bg-blue-500'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
