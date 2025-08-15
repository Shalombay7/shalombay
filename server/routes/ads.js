const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;