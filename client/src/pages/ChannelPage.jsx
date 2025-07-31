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

  if (!channel) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  const isOwner = channel.owner === user?._id || channel.owner?._id === user?._id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      {/* Channel Banner & Info */}
      <div className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg mb-8">
        {channel.channelBanner && (
          <img
            src={channel.channelBanner}
            alt="Channel Banner"
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-5">
          <h1 className="text-3xl font-bold">{channel.channelName}</h1>
          <p className="text-gray-300 mt-1">{channel.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            Subscribers: {channel.subscribers || 0}
          </p>

          {isOwner && (
            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to="/upload-video"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm transition"
              >
                Upload New Video
              </Link>
              <Link
                to={`/edit-channel/${channel._id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md text-sm transition"
              >
                Edit Channel
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Videos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>

        {videos.length === 0 ? (
          <p className="text-gray-400">No videos uploaded yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <Link to={`/video/${video._id}`}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                </Link>

                <div className="p-4">
                  <h3 className="text-lg font-medium truncate">{video.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                    {video.description}
                  </p>

                  {isOwner && (
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <Link
                        to={`/edit-video/${video._id}`}
                        className="text-blue-400 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={async () => {
                          const confirmDelete = window.confirm('Delete this video?');
                          if (!confirmDelete) return;
                          try {
                            await axios.delete(`/videos/${video._id}`);
                            setVideos((prev) => prev.filter((v) => v._id !== video._id));
                          } catch (err) {
                            console.error('Delete failed:', err);
                            alert('Delete failed.');
                          }
                        }}
                        className="text-red-500 hover:underline"
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
    </div>
  );
};

export default ChannelPage;
