import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header style={styles.header}>
      <button onClick={toggleSidebar} style={styles.menu}>☰</button>
      <h1 style={styles.logo}>YouTube Clone</h1>
      <div style={styles.auth}>
        <button style={styles.signIn}>Sign In</button>
      </div>
    </header>
  );
};


const styles = {
  header: {
  height: '60px',
  background: '#202020',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
},

  menu: {
    fontSize: '24px',
    background: 'transparent',
    border: 'none',
    color: 'white',
  },
  logo: {
    margin: 0,
    fontSize: '20px',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
  },
  signIn: {
    padding: '8px 12px',
    background: '#ff0000',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
  },
};

export default Header;
