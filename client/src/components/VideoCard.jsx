import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div style={styles.card}>
      <img src={video.thumbnailUrl} alt={video.title} style={styles.thumb} />
      <h4>{video.title}</h4>
      <p>{video.uploader}</p>
      <p>{video.views} views</p>
    </div>
  );
};

const styles = {
  card: {
  width: '250px',
  margin: '10px',
  color: 'white',
  backgroundColor: '#282828',
  padding: '10px',
  borderRadius: '8px',
},
thumb: {
  width: '100%',
  borderRadius: '8px',
  marginBottom: '8px',
},

};

export default VideoCard;
