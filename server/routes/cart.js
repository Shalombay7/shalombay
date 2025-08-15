const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.json({ items: [], total: 0 });
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [], total: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => {
      return sum + (item.quantity * product.price);
    }, 0);

    await cart.save();
    res.json(await Cart.findOne({ userId: req.params.userId }).populate('items.productId'));
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    cart.total = cart.items.reduce((sum, item) => {
      return sum + (item.quantity * item.productId.price);
    }, 0);

    await cart.save();
    res.json(await Cart.findOne({ userId }).populate('items.productId'));
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (quantity > product.stock) return res.status(400).json({ message: 'Insufficient stock' });

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.total = cart.items.reduce((sum, item) => {
      return sum + (item.quantity * product.price);
    }, 0);

    await cart.save();
    res.json(await Cart.findOne({ userId }).populate('items.productId'));
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;