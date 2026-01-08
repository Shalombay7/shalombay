const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const products = [
  {
    name: 'Organic Immunity Booster',
    description: 'Natural blend to strengthen immune defense.',
    rating: 4.9,
    status: 'In Store',
    price: 29.99,
    stock: 50,
    isFeatured: true,
  },
  {
    name: 'Detox Herbal Tea',
    description: 'Cleansing herbal tea for digestion.',
    rating: 4.4,
    status: 'Sold Out',
    price: 12.99,
    stock: 0,
    isFeatured: true,
  },
  {
    name: 'Omega-3 Wellness Capsules',
    description: 'Supports heart and brain health.',
    rating: 4.8,
    status: 'In Store',
    price: 24.99,
    stock: 75,
    isFeatured: true,
  },
  {
    name: 'Natural Blood Tonic',
    description: 'Boosts blood quality and energy.',
    rating: 4.5,
    status: 'In Store',
    price: 18.99,
    stock: 40,
  },
  {
    name: "Men's Vitality Formula",
    description: 'Supports stamina and strength.',
    rating: 4.7,
    status: 'In Store',
    price: 34.99,
    stock: 60,
  },
  {
    name: "Women's Hormonal Balance Tea",
    description: 'Supports hormonal balance.',
    rating: 4.6,
    status: 'Sold Out',
    price: 14.99,
    stock: 0,
  },
  {
    name: 'Herbal Pain Relief Oil',
    description: 'Fast relief for muscles and joints.',
    rating: 4.8,
    status: 'In Store',
    price: 19.99,
    stock: 45,
  },
  {
    name: 'Daily Multivitamin',
    description: 'Complete daily nutrition.',
    rating: 4.9,
    status: 'In Store',
    price: 22.99,
    stock: 100,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
