import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ toggleSidebar, onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <button onClick={toggleSidebar} style={styles.menu}>☰</button>
      <h1 style={styles.logo}>YouTube Clone</h1>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.auth}>
        {user ? (
          <>
            <span style={styles.username}>👤 {user.username}</span>
            <button onClick={logout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.signIn}>
            <FaUserCircle style={styles.signInIcon} />
            Sign in
          </button>
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
  search: {
    padding: '6px 10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    background: '#121212',
    color: 'white',
    outline: 'none',
    margin: '0 20px',
    width: '250px',
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    background: 'transparent',
    color: '#3ea6ff',
    border: '1px solid #3ea6ff',
    borderRadius: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
  },
  signInIcon: {
    fontSize: '18px',
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
