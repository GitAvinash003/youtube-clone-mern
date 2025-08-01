import User from '../models/User.js';
import Channel from '../models/Channel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Step 1: Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }

    // Step 2: Create and save new user
    const user = new User({ username, email, password });
    const savedUser = await user.save();

    // Step 3: Create default channel for this user
    const channel = new Channel({
      channelName: `${username}'s Channel`,
      description: 'Welcome to my channel!',
      owner: savedUser._id,
    });

    const savedChannel = await channel.save();

    // Step 4: Create JWT token (optional, for immediate login)
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Step 5: Respond with success
    res.status(201).json({
      message: 'User registered and default channel created.',
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
      channel: savedChannel,
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      msg: 'Server error during registration',
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Step 2: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Step 3: Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Step 4: Respond with token and user
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};
