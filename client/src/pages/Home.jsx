import React from 'react';
import VideoCard from '../components/VideoCard';

const dummyVideos = [
  {
    videoId: 'video01',
    title: 'Learn React in 30 Minutes',
    thumbnailUrl: 'https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg',
    uploader: 'CodeWithJohn',
    views: 15200,
  },
  {
    videoId: 'video02',
    title: 'Express Basics Tutorial',
    thumbnailUrl: 'https://i.ytimg.com/vi/L72fhGm1tfE/hqdefault.jpg',
    uploader: 'NodeNinja',
    views: 8900,
  },
];

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        {['All', 'React', 'Node.js', 'MongoDB'].map((label) => (
          <button key={label} style={styles.filterButton}>{label}</button>
        ))}
      </div>
      <div style={styles.grid}>
        {dummyVideos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    flex: 1,
    background: '#181818',
    color: 'white',
    minHeight: '100vh',
  },
  filters: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 16px',
    background: '#3d3d3d',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'flex-start',
  },
};

export default Home;
