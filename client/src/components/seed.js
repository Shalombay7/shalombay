const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Premium Multivitamin',
    description: 'Complete daily nutrition for optimal health and energy.',
    price: 29.99,
    category: 'Health & Wellness',
    stock: 100,
    imageUrl: 'https://placehold.co/400x400?text=Multivitamin',
    isFeatured: true,
    rating: 4.8,
    status: 'In Store'
  },
  {
    name: 'Organic Whey Protein',
    description: 'Grass-fed whey protein isolate for muscle recovery.',
    price: 49.99,
    category: 'Health & Wellness',
    stock: 50,
    imageUrl: 'https://placehold.co/400x400?text=Protein',
    isFeatured: true,
    rating: 4.9,
    status: 'In Store'
  },
  {
    name: 'Omega-3 Fish Oil',
    description: 'High potency Omega-3s for heart and brain health.',
    price: 24.99,
    category: 'Health & Wellness',
    stock: 75,
    imageUrl: 'https://placehold.co/400x400?text=Fish+Oil',
    isFeatured: true,
    rating: 4.7,
    status: 'In Store'
  },
  {
    name: 'Vitamin C Booster',
    description: 'Immune system support with bioflavonoids.',
    price: 15.99,
    category: 'Health & Wellness',
    stock: 120,
    imageUrl: 'https://placehold.co/400x400?text=Vitamin+C',
    isFeatured: true,
    rating: 4.6,
    status: 'In Store'
  },
  {
    name: 'Magnesium Complex',
    description: 'Supports muscle relaxation and restful sleep.',
    price: 19.99,
    category: 'Health & Wellness',
    stock: 60,
    imageUrl: 'https://placehold.co/400x400?text=Magnesium',
    isFeatured: true,
    rating: 4.8,
    status: 'In Store'
  },
  {
    name: 'Probiotic Daily',
    description: 'Advanced probiotic formula for digestive health.',
    price: 34.99,
    category: 'Health & Wellness',
    stock: 0,
    imageUrl: 'https://placehold.co/400x400?text=Probiotic',
    isFeatured: true,
    rating: 4.5,
    status: 'Sold Out'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await Product.deleteMany({});
      console.log('Cleared existing products');
      await Product.insertMany(products);
      console.log('Seeded products successfully');
    } catch (err) {
      console.error('Error seeding database:', err);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });