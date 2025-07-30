import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ toggleSidebar, onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#202020]  text-white flex items-center justify-between px-4 py-2 shadow-md">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl"
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <h1 className="text-xl font-semibold whitespace-nowrap">YouTube Clone</h1>
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden sm:flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full bg-[#121212] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right: Auth */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm font-medium hidden sm:inline">👤 {user.username}</span>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-400 border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
          >
            <FaUserCircle className="text-lg" />
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
