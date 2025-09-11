const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured products
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // Optional for now
  price: { type: Number, required: true },
  category: { type: String }, // Optional for now
  stock: { type: Number, required: true },
  imageUrl: { type: String },
  isFeatured: { type: Boolean, default: false } // Add this for featured filtering
});

module.exports = mongoose.model('Product', productSchema);

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, price, category, stock, imageUrl, isFeatured } = req.body;
  try {
    const product = new Product({ name, description, price, category, stock, imageUrl, isFeatured: isFeatured || false });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;