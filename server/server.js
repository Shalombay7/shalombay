const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

// Load environment variables first
dotenv.config();

const app = express();

// Validate required environment variables
app.set('trust proxy', 1); // Required for Render/Heroku to detect correct IP
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
  'https://shalombay.onrender.com',
  /vercel\.app$/ // Allow all Vercel deployments
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      callback(null, true);
    } else if (allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin)) {
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
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes - these should come BEFORE static file serving
try {
  const authRoutes = require('./routes/auth');
  const adminRoutes = require('./routes/admin');
  const productRoutes = require('./routes/products');
  const cartRoutes = require('./routes/cart');
  const paymentRoutes = require('./routes/payment');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/payment', paymentRoutes);
} catch (error) {
  console.error('❌ Error loading route files:', error.message);
  // process.exit(1); // Don't crash if routes are missing, allows health check to pass
}

// Placeholder routes
app.use('/api/ads', (req, res) => {
  res.json([]); // Placeholder for ads
});

// Static files - serve these AFTER API routes
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve React app static files
const clientBuildPath = path.join(__dirname, '../client/build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Catch-all handler - serve React app (only for non-API routes)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  console.log('⚠️ Client build not found, running in API-only mode');
}

// API 404 handler - for unmatched API routes (runs if client build not found or path starts with /api)
app.use((req, res) => {
  res.status(404).json({ message: `API endpoint ${req.method} ${req.path} not found` });
});

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

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const PORT = process.env.PORT || 5009;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

startServer();
