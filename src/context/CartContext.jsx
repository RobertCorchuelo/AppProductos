import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Intentar obtener el carrito del localStorage al iniciar
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Si el producto no existe, añadirlo con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          if (newQuantity > item.stock) return item; // No se actualiza si supera el stock
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener el número total de items en el carrito
  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartItemsCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};