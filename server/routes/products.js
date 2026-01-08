const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get featured products (MUST come before /:id route)
router.get('/featured', async (req, res) => {
  try {
    console.log('🔍 Fetching featured products...');
    console.log('📦 MongoDB connected:', !!Product.collection.conn);
    const featuredProducts = await Product.find({ isFeatured: true }).limit(8);
    console.log('✅ Featured products found:', featuredProducts.length, featuredProducts.map(p => p.name));
    res.json(featuredProducts);
  } catch (error) {
    console.error('❌ Error fetching featured products:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, price, category, stock, imageUrl, isFeatured } = req.body;
  try {
    const product = new Product({ name, description, price, category, stock, imageUrl, isFeatured: isFeatured || false });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product by ID (catch-all - MUST come last)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;