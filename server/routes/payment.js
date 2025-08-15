const express = require('express');
const Stripe = require('stripe');
const User = require('../models/User');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('cart.productId');
    const lineItems = user.cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.productId.name },
        unit_amount: item.productId.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
    });

    // Create order
    const order = new Order({
      userId: req.user.userId,
      items: user.cart,
      total: user.cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0),
    });
    await order.save();

    // Clear cart
    user.cart = [];
    user.orders.push(order._id);
    await user.save();

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;