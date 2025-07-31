import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ toggleSidebar, onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const timerRef = useRef(null);

  // Handle mouse enter
  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setShowDropdown(true);
  };

  // Handle mouse leave with slight delay
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 150); // delay helps prevent flicker
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#202020] text-white flex items-center justify-between px-4 py-2 shadow-md">
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
      <div className="flex items-center gap-3 relative">
        {user ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Profile Icon */}
            <button className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-700 rounded-full hover:bg-gray-600">
              <FaUserCircle className="text-lg" />
              <span className="hidden sm:inline">{user.username}</span>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                <Link
  to="/my-channel"
  className="block px-4 py-2 hover:bg-gray-200"
>
  My Channel
</Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
