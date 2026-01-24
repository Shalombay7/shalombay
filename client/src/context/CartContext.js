import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCart, saveCart } from '../utils/cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const add = (product) =>
    setCart(prev => {
      const index = prev.findIndex(i => i._id === product._id);
      if (index > -1) {
        const updated = [...prev];
        updated[index].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });

  const increment = (id) =>
    setCart(prev =>
      prev.map(i =>
        i._id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );

  const decrement = (id) =>
    setCart(prev =>
      prev
        .map(i =>
          i._id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );

  const clear = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, add, increment, decrement, clear }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
