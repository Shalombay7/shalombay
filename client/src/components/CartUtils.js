const API_URL = process.env.REACT_APP_API_URL || '';

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    return [];
  }
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === product._id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartUpdated'));
};

export const syncCart = async (phone) => {
  const items = getCart();
  if (!phone || items.length === 0) return;
  
  try {
    await fetch(`${API_URL}/api/cart/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, items })
    });
  } catch (e) {
    console.error("Failed to sync cart", e);
  }
};

export const loadCart = async (phone) => {
  if (!phone) return false;
  try {
    const res = await fetch(`${API_URL}/api/cart/${phone}`);
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        localStorage.setItem('cart', JSON.stringify(items));
        window.dispatchEvent(new Event('cartUpdated'));
        return true;
      }
    }
  } catch (e) {
    console.error("Failed to load cart", e);
  }
  return false;
};