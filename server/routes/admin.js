const express = require('express');
const router = express.Router();

// Simple password-based admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }

  if (password === adminPassword) {
    // Set secure cookie
    res.cookie('admin', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json({ success: true });
  }

  res.status(401).json({ error: 'Invalid password' });
});

// Admin logout
router.post('/logout', (req, res) => {
  res.clearCookie('admin');
  res.json({ success: true });
});

// Check if user is admin
router.get('/check', (req, res) => {
  const isAdmin = req.cookies.admin === 'true';
  res.json({ isAdmin });
});

module.exports = router;
