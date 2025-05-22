import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request body:', req.body);
    const { role, name, email, password, contactInfo, industry, companySize, website, socialMedia, description, categories } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup failed: User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      name,
      email,
      password: hashedPassword,
      contactInfo,
      industry: role === 'company' ? industry : undefined,
      companySize: role === 'company' ? companySize : undefined,
      website: role === 'company' ? website : undefined,
      socialMedia: role === 'influencer' ? socialMedia : undefined,
      description,
      categories: role === 'influencer' ? categories : undefined,
    });

    await user.save();
    console.log('User created successfully:', user._id);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({
      token,
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Profile Route
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
});

// Update Profile Route
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, contactInfo, industry, companySize, website, socialMedia, description, categories } = req.body;

    if (name !== undefined) user.name = name;
    if (contactInfo !== undefined) user.contactInfo = contactInfo;
    if (user.role === 'company') {
      if (industry !== undefined) user.industry = industry;
      if (companySize !== undefined) user.companySize = companySize;
      if (website !== undefined) user.website = website;
    } else if (user.role === 'influencer') {
      if (socialMedia !== undefined) user.socialMedia = socialMedia;
      if (categories !== undefined) user.categories = categories;
    }
    if (description !== undefined) user.description = description;

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Notifications Route
router.get('/notifications', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('notifications');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all influencers (for company discover page) with search/filter
router.get('/influencers', async (req, res) => {
  try {
    const { search, categories, minFollowers, maxFollowers } = req.query;
    const query = { role: 'influencer' };
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (categories) {
      const cats = Array.isArray(categories) ? categories : categories.split(',');
      query.categories = { $in: cats };
    }
    // Followers filter (aggregate sum of all socialMedia.followers)
    let influencers = await User.find(query).select('-password');
    if (minFollowers || maxFollowers) {
      influencers = influencers.filter((inf) => {
        const totalFollowers = (inf.socialMedia || []).reduce((sum, s) => sum + (s.followers || 0), 0);
        if (minFollowers && totalFollowers < Number(minFollowers)) return false;
        if (maxFollowers && totalFollowers > Number(maxFollowers)) return false;
        return true;
      });
    }
    res.json(influencers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;