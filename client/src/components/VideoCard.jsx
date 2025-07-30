import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`/video/${video.videoId}`}
      className="w-64 bg-[#282828] rounded-lg overflow-hidden shadow hover:scale-105 transition"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h4 className="text-white font-semibold text-sm mb-1">{video.title}</h4>
        <Link
          to={`/channel/${video.channelId}`}
          className="text-gray-400 text-xs hover:underline"
          onClick={(e) => e.stopPropagation()} // prevents card click propagation
        >
          {video.uploader}
        </Link>
        <p className="text-gray-500 text-xs">{video.views} views</p>
      </div>
    </Link>
  );
};

export default VideoCard;
