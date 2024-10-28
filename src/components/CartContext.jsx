import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
 
    const existingProduct = cart.find((item) => item.id === product.id);
         if (existingProduct) {
  
      setCart(cart.map((item) =>
             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      setCart(cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
