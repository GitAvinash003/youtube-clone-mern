import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <button onClick={toggleSidebar} style={styles.menu}>☰</button>
      <h1 style={styles.logo}>YouTube Clone</h1>

      <div style={styles.auth}>
        {user ? (
          <>
            <span style={styles.username}>👤 {user.username}</span>
            <button onClick={logout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.signIn}>Sign In</button>
        )}
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
    gap: '10px',
  },
  username: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  signIn: {
    padding: '8px 12px',
    background: '#ff0000',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
  },
  logout: {
    padding: '6px 10px',
    background: '#555',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Header;
