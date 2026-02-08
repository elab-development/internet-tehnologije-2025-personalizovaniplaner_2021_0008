import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Use cartItemId for personalized items, otherwise use id
      const itemId = product.cartItemId || product.id;
      const productId = product.productId || product.id; // For stock validation
      
      const existingItem = prevItems.find(item => {
        const existingItemId = item.cartItemId || item.id;
        return existingItemId === itemId;
      });
      
      const itemQuantity = product.quantity || 1;
      
      if (existingItem) {
        //povećanje količine ako proizvod već postoji u korpi, sa validacijom dostupnosti
        const newQuantity = (existingItem.quantity || 1) + itemQuantity;
        
        // Calculate total quantity of this product across all cart items for stock validation
        const totalQuantityOfProduct = prevItems.reduce((total, item) => {
          const itemProductId = item.productId || item.id;
          if (itemProductId === productId) {
            return total + (item.quantity || 1);
          }
          return total;
        }, 0);
        
        const remainingStock = product.availableInStock - totalQuantityOfProduct + (existingItem.quantity || 1);
        
        if (newQuantity > remainingStock) {
          alert(`Cannot add more. Only ${remainingStock} items available in stock.`);
          return prevItems;
        }
        
        return prevItems.map(item => {
          const existingItemId = item.cartItemId || item.id;
          return existingItemId === itemId
            ? { ...item, quantity: newQuantity }
            : item;
        });
      } else {
        //dodavanje novog proizvoda u korpu
        // Calculate total quantity of this product across all cart items
        const totalQuantityOfProduct = prevItems.reduce((total, item) => {
          const itemProductId = item.productId || item.id;
          if (itemProductId === productId) {
            return total + (item.quantity || 1);
          }
          return total;
        }, 0);
        
        const remainingStock = product.availableInStock - totalQuantityOfProduct;
        
        if (remainingStock <= 0) {
          alert('This product is out of stock.');
          return prevItems;
        }
        
        if (itemQuantity > remainingStock) {
          alert(`Cannot add ${itemQuantity}. Only ${remainingStock} items available in stock.`);
          return prevItems;
        }
        
        return [...prevItems, { ...product, id: itemId, quantity: itemQuantity }];
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
