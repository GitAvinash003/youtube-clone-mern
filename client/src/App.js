import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPlayer from './pages/VideoPlayer';
import Channel from './pages/Channel';
import CreateChannel from './pages/CreateChannel';
import ChannelPage from './pages/ChannelPage';
import EditChannel from './pages/EditChannel';
import UploadVideo from './pages/UploadVideo';
import EditVideo from './pages/EditVideo';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="flex bg-[#181818] text-white min-h-screen">
        {/* Sidebar always rendered */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 ml-0 sm:ml-44 transition-all duration-300">
          <Header
            toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            onSearch={setSearchTerm}
          />

          <main className="pt-16 px-4 pb-8">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/channel/:userId/videos" element={<Channel />} />
              <Route path="/create-channel" element={<CreateChannel />} />
              <Route path="/channel/:channelId" element={<ChannelPage />} />
              <Route path="/edit-channel/:id" element={<EditChannel />} />
              <Route path="/my-channel" element={<ChannelPage />} />
              <Route path="/upload-video" element={<UploadVideo />} />
              <Route path="/edit-video/:videoId" element={<EditVideo />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
