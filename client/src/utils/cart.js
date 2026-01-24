const CART_KEY = 'shalombay_cart';

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateQty = (productId, qty) => {
  const cart = getCart()
    .map(item =>
      item._id === productId ? { ...item, qty } : item
    )
    .filter(item => item.qty > 0);

  saveCart(cart);
  return cart;
};
