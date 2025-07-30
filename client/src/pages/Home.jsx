import axios from 'axios'; // Make sure this is imported
import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';

const Home = ({ searchTerm }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/videos') // ✅ Full backend URL
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
      });
  }, []);

  return (
    <div className="p-4 pt-20 min-h-screen bg-[#181818] text-white">
      <div className="mb-4 flex gap-2 flex-wrap">
        {['All', 'React', 'Node.js', 'MongoDB'].map((label) => (
          <button key={label} className="bg-gray-700 px-4 py-1 rounded-full text-sm">
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        {videos
          .filter((v) =>
            v.title.toLowerCase().includes(searchTerm?.toLowerCase() || '')
          )
          .map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
      </div>
    </div>
  );
};

export default Home;
