const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const adRoutes = require('./routes/ads');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/', (req, res) => res.send('Health Shop API is running'));

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per IP
}));

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));