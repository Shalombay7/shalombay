const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Order.findOne({ userId: req.params.userId, status: 'cart' })
      .populate('items.productId');
    res.json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/:userId', async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.userId;

  try {
    let cart = await Order.findOne({ userId, status: 'cart' });
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (!cart) {
      // Create new cart
      cart = new Order({
        userId,
        items: [{ productId, quantity }],
        total: product.price * quantity
      });
    } else {
      // Update existing cart
      const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      
      // Recalculate total (simplified)
      cart.total += product.price * quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;