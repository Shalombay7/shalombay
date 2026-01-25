const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Save cart
router.post('/save', async (req, res) => {
  try {
    const { phone, items } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number required' });

    await Cart.findOneAndUpdate(
      { phone },
      { items, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Load cart
router.get('/:phone', async (req, res) => {
  try {
    const cart = await Cart.findOne({ phone: req.params.phone });
    res.json(cart?.items || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;