// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // make sure filename is correct
import videoRoutes from './routes/video.js';
import commentRoutes from './routes/commentRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import channelVideosRoutes from './routes/channelVideosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true,              // allow cookies & headers
}));

app.use(express.json());




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

app.use('/api/comments', commentRoutes);
app.use('/api/channels', channelRoutes);

app.use('/api/channel-videos', channelVideosRoutes);


// Root route
app.get('/', (req, res) => {
  res.send('YouTube Clone API is running...');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
