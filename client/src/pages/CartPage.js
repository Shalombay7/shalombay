import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, increment, decrement, clear } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const checkoutViaWhatsApp = () => {
    const phone = '233542447318';
    const message = `Hello ShalomBay 👋

I want to order:
${cart.map(i => `• ${i.name} x${i.qty}`).join('\n')}

Total: GHS ${total}
`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (!cart.length) return <p>Your cart is empty.</p>;

  return (
    <div className="container">
      <h2>🛒 Your Cart</h2>

      {cart.map(item => (
        <div
          key={item._id}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <div>
            <strong>{item.name}</strong>
            <p className="mb-0">GHS {item.price}</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => decrement(item._id)}
            >
              −
            </button>

            <span>{item.qty}</span>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => increment(item._id)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <h4>Total: GHS {total}</h4>

      <button className="btn btn-success w-100 mb-2" onClick={checkoutViaWhatsApp}>
        <i className="bi bi-whatsapp"></i> Checkout via WhatsApp
      </button>

      <button className="btn btn-outline-danger w-100" onClick={clear}>
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
