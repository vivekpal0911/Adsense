import express from 'express';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to get current user from token
const getUserFromToken = async (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await User.findById(decoded.userId);
};

// List all conversations for current user
router.get('/conversations', async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({ message: 'No token or user' });
    // Find all users this user has messaged or received from
    const sent = await Message.find({ sender: user._id }).distinct('receiver');
    const received = await Message.find({ receiver: user._id }).distinct('sender');
    const userIds = Array.from(new Set([...sent, ...received])).filter(id => id.toString() !== user._id.toString());
    const users = await User.find({ _id: { $in: userIds } }).select('name email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get messages with a specific user
router.get('/:userId', async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({ message: 'No token or user' });
    const otherId = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: user._id, receiver: otherId },
        { sender: otherId, receiver: user._id },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Send a message
router.post('/', async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({ message: 'No token or user' });
    const { receiver, content } = req.body;
    if (!receiver || !content) return res.status(400).json({ message: 'Receiver and content required' });
    const msg = new Message({ sender: user._id, receiver, content });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all users except current (for starting new chat)
router.get('/users', async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    if (!user) return res.status(401).json({ message: 'No token or user' });
    const users = await User.find({ _id: { $ne: user._id } }).select('_id name role email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router; 