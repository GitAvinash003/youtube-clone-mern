import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaYoutube, FaUser, FaFire, FaClock, FaHistory } from 'react-icons/fa';
import { MdOutlineVideoLibrary } from 'react-icons/md';

const navItems = [
  { label: 'Home', icon: <FaHome />, path: '/' },
  { label: 'Shorts', icon: <FaFire /> },
  { label: 'Subscriptions', icon: <FaYoutube />  },
  { label: 'Library', icon: <MdOutlineVideoLibrary /> },
  { label: 'History', icon: <FaHistory />  },
  { label: 'Watch Later', icon: <FaClock />},
  { label: 'You', icon: <FaUser />, path: '/my-channel' },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`
      fixed top-14 left-0 w-20 h-full bg-dark z-40  
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      sm:translate-x-0
    `}>
      {navItems.map(({ label, icon, path }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition ${
              isActive ? 'text-black font-semibold' : ''
            }`
          }
        >
          <span className="text-xl mb-1">{icon}</span>
          <span className="whitespace-nowrap">{label}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
