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