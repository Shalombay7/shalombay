const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  items: Array,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);