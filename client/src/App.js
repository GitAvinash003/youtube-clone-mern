import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div style={{ display: 'flex', backgroundColor: '#181818', color: 'white' }}>
        {isSidebarOpen && <Sidebar />}
        <div style={{ flex: 1, marginLeft: isSidebarOpen ? '200px' : '0' }}>
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div style={{ paddingTop: '60px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

