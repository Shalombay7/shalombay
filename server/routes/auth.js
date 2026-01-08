const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No account with that email' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const frontend = process.env.FRONTEND_URL || process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontend}/reset-password?token=${token}`;
    // In production you'd email the resetLink. For now return it in the response for testing.
    return res.json({ message: 'Password reset link generated', resetLink });
  } catch (err) {
    console.error('forgot-password error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/change-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Missing token or password' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    user.password = password;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('change-password error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
