import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function Cart() {
  const [cart, setCart] = useState([]);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/cart', { // Relative path
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/payment/create-checkout-session', {}, { // Relative path
        headers: { Authorization: `Bearer ${token}` }
      });
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map(item => (
        <div key={item.productId._id}>
          <h3>{item.productId.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.productId.price * item.quantity}</p>
        </div>
      ))}
      <button onClick={handleCheckout} disabled={!stripe}>Checkout</button>
    </div>
  );
}

export default Cart;