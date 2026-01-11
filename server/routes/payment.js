const express = require('express');
const Stripe = require('stripe');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    // Find the active cart for this user
    const cart = await Order.findOne({ userId: req.user.userId, status: 'cart' }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.productId.name },
        unit_amount: Math.round(item.productId.price * 100), // Stripe expects integers (cents)
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://shalombay.onrender.com/success',
      cancel_url: 'https://shalombay.onrender.com/cart',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;