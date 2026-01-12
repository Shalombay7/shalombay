const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

// Get all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;