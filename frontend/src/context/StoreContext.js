"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "Grace Sterling",
    email: "grace@aria.com",
    phone: "+91 98765 43210",
    address: "Skyline Apartments, Penthouse B, Mumbai, MH - 400001",
    joined: "March 2024"
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart and auth from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('aria_cart');
    const savedAuth = localStorage.getItem('aria_auth');
    const savedUser = localStorage.getItem('aria_user');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    
    if (savedAuth) {
      setIsLoggedIn(savedAuth === 'true');
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('aria_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('aria_auth', isLoggedIn.toString());
    }
  }, [isLoggedIn, isInitialized]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('aria_user', JSON.stringify(user));
    }
  }, [user, isInitialized]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <StoreContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoggedIn,
      login,
      logout,
      user,
      setUser,
      isInitialized
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
