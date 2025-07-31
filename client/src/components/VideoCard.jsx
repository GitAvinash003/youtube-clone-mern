import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <Link
        to={`/video/${video._id}`}
        className="block bg-[#282828] rounded-lg overflow-hidden shadow hover:scale-[1.02] transition-transform"
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-40 sm:h-44 object-cover"
        />
        <div className="p-3">
          <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {video.title}
          </h4>
          <Link
            to={`/channel/${video.channelId}`}
            className="text-gray-400 text-xs hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {video.uploader}
          </Link>
          <p className="text-gray-500 text-xs mt-1">{video.views} views</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
