const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = new Review({ productId, userId, rating, comment });
    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;