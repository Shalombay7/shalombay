const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  category: { type: String },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  status: { type: String, enum: ['In Store', 'Sold Out'], default: 'In Store' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);