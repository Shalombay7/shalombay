const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const Ad = require('../models/Ad');

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
  },
  {
    name: "Zinc Picolinate",
    description: "Essential mineral for immune function and skin health.",
    price: 12.99,
    category: "Minerals",
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=60",
    isFeatured: false
  },
  {
    name: "B-Complex Energy",
    description: "Full spectrum B-vitamins for energy metabolism.",
    price: 18.50,
    category: "Vitamins",
    stock: 110,
    imageUrl: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=500&q=60",
    isFeatured: true
  },
  {
    name: "Omega-3 Fish Oil",
    description: "High potency EPA & DHA for heart and brain health.",
    price: 29.99,
    category: "Supplements",
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=500&q=60",
    isFeatured: true
  },
  {
    name: "Probiotic Daily",
    description: "50 Billion CFU for digestive and immune health.",
    price: 34.50,
    category: "Supplements",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=60",
    isFeatured: false
  }
];

const ads = [
  {
    title: "Summer Sale",
    description: "Get 20% off on all vitamins this summer!",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "New Arrivals",
    description: "Check out our latest organic protein powders.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=60"
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is undefined. Check your .env file location.');
    }

    let uri = process.env.MONGODB_URI;
    // Auto-fix: Switch to 'shalombay' database if 'healthshop' is detected
    if (uri.includes('/healthshop')) {
      console.log('🔄 Automatically switching database from "healthshop" to "shalombay"');
      uri = uri.replace('/healthshop', '/shalombay');
    }

    // Log masked URI for debugging
    const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
    console.log(`🔌 Attempting to connect to: ${maskedUri}`);

    // Extract and log database name
    const dbName = uri.split('/').pop().split('?')[0];
    console.log(`🎯 Target Database: ${dbName}`);

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    await Ad.deleteMany({});
    console.log('🗑️ Cleared existing ads');

    await Product.insertMany(products);
    await Ad.insertMany(ads);
    console.log('🌱 Products seeded successfully');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    if (err.code === 8000 || err.name === 'MongoServerError' || (err.errmsg && err.errmsg.includes('bad auth'))) {
      console.error('\n💡 TIP: Authentication failed. Check your username and password in .env.');
      console.error('   If your password has special characters (like @, !, #), they must be URL encoded (e.g., @ -> %40).');
    }
    process.exit(1);
  }
};

seedDB();