const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });
// Fallback: try loading from root if not found in server folder
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
}

const products = [
  {
    name: "Organic Whey Protein",
    description: "Grass-fed whey protein isolate, vanilla flavor.",
    price: 45.99,
    category: "Supplements",
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=500&q=60",
    isFeatured: true
  },
  {
    name: "Multivitamin Complex",
    description: "Daily essential vitamins and minerals for optimal health.",
    price: 24.99,
    category: "Vitamins",
    stock: 85,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=500&q=60",
    isFeatured: true
  },
  {
    name: "Vitamin C 1000mg",
    description: "High potency Vitamin C for immune support.",
    price: 15.99,
    category: "Vitamins",
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=60",
    isFeatured: true
  },
  {
    name: "Magnesium Glycinate",
    description: "Highly absorbable magnesium for sleep and muscle recovery.",
    price: 19.99,
    category: "Minerals",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=500&q=60",
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is undefined. Check your .env file location.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    await Product.insertMany(products);
    console.log('🌱 Products seeded successfully');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();