import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      //da li je proizvod već u korpi
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        //povećanje količine ako proizvod već postoji u korpi, sa validacijom dostupnosti
        const newQuantity = (existingItem.quantity || 1) + 1;
        if (newQuantity > product.availableInStock) {
          alert(`Cannot add more. Only ${product.availableInStock} items available in stock.`);
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        //dodavanje novog proizvoda u korpu
        if (product.availableInStock === 0) {
          alert('This product is out of stock.');
          return prevItems;
        }
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => {
          if (item.id === productId) {
            if (quantity > item.availableInStock) {
              alert(`Cannot set quantity above ${item.availableInStock}. Only ${item.availableInStock} items available in stock.`);
              return item;
            }
            return { ...item, quantity };
          }
          return item;
        })
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.offerPrice || item.price;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
