import React from 'react';
import { FaHome, FaFire, FaYoutube, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const items = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaFire />, label: 'Trending' },
    { icon: <FaYoutube />, label: 'Subscriptions' },
    { icon: <FaUser />, label: 'You' },
  ];

  return (
    <aside style={styles.sidebar}>
      {items.map(({ icon, label }) => (
        <div key={label} style={styles.item}>
          <span style={styles.icon}>{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    background: '#212121',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    paddingTop: '60px',
    paddingLeft: '10px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 10px',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  icon: {
    fontSize: '18px',
  },
};

export default Sidebar;
