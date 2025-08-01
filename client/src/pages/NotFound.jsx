import React from 'react';
import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-6 text-center">
      <div className="max-w-md">
        <div className="flex justify-center mb-6">
           <MdErrorOutline className="text-7xl text-red-500 mb-4" />
        </div>

        <h1 className="text-5xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6 text-lg font-bold">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-500 text-white  text-lg font-medium hover:bg-red-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
