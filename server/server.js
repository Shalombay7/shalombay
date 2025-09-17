const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables first
dotenv.config();

const app = express();

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing. Check your .env file or Render env variables.");
  process.exit(1);
}
console.log("✅ MONGODB_URI loaded");

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'https://shalombay.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' })); // Add size limit
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes - these should come BEFORE static file serving
try {
  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/products');
  const cartRoutes = require('./routes/cart');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);
} catch (error) {
  console.error('❌ Error loading route files:', error.message);
  process.exit(1);
}

// Placeholder routes
app.use('/api/ads', (req, res) => {
  res.json([]); // Placeholder for ads
});

// Static files - serve these AFTER API routes
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve React app static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// API 404 handler - for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: `API endpoint ${req.method} ${req.path} not found` });
});

// Catch-all handler - serve React app (only for non-API routes)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  
  // Handle specific error types
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS policy violation' });
  }
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message 
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
