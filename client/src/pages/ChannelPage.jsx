import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ChannelPage = () => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get('/channels/me');
        setChannel(res.data.channel);
        setVideos(res.data.videos);
      } catch (err) {
        console.error('Error fetching channel:', err);
        alert('Failed to load channel');
      }
    };

    fetchChannel();
  }, []);

  if (!channel) return <div className="text-center text-white mt-8">Loading...</div>;

  const isOwner = channel.owner === user?._id || channel.owner?._id === user?._id;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white">
      {/* Channel Header */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        {channel.channelBanner && (
          <img
            src={channel.channelBanner}
            alt="Channel Banner"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        )}
        <h1 className="text-3xl font-bold mb-1">{channel.channelName}</h1>
        <p className="text-gray-300 mb-2">{channel.description}</p>
        <p className="text-sm text-gray-400">Subscribers: {channel.subscribers || 0}</p>

        {isOwner && (
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/upload-video"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload New Video
            </Link>
            <Link
              to={`/edit-channel/${channel._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit Channel
            </Link>
          </div>
        )}
      </div>

      {/* Video Grid */}
      <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>

      {videos.length === 0 ? (
        <p className="text-gray-400">No videos uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{video.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>

                {isOwner && (
                  <div className="flex justify-between items-center mt-3">
                    <Link
                      to={`/edit-video/${video._id}`}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        const confirmDelete = window.confirm('Delete this video?');
                        if (!confirmDelete) return;
                        await axios.delete(`/videos/${video._id}`);
                        setVideos((prev) => prev.filter((v) => v._id !== video._id));
                      }}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
