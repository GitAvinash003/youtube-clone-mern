import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPlayer from './pages/VideoPlayer';
import Channel from './pages/Channel';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div style={{ display: 'flex', backgroundColor: '#181818', color: 'white' }}>
        {isSidebarOpen && <Sidebar />}
        <div style={{ flex: 1, marginLeft: isSidebarOpen ? '200px' : '0' }}>
          <Header
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onSearch={setSearchTerm}
          />
          <div style={{ paddingTop: '60px' }}>
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/channel/:id" element={<Channel />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
