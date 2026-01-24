const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews - Create a review (Guest)
router.post('/', async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;
    
    const newReview = new Review({
      productId,
      userName,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

// GET /api/reviews/product/:productId - Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reviews - Get all reviews (Admin)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;