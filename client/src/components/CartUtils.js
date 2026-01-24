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