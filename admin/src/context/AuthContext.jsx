import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('aria_admin_auth') === 'true';
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('aria_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('aria_admin_token');
  });

  const login = (userData, token) => {
    setIsLoggedIn(true);
    setUser(userData);
    setToken(token);
    localStorage.setItem('aria_admin_auth', 'true');
    localStorage.setItem('aria_admin_user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('aria_admin_token', token);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('aria_admin_auth');
    localStorage.removeItem('aria_admin_user');
    localStorage.removeItem('aria_admin_token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
