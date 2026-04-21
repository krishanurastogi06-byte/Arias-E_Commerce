import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

import Categories from './pages/Categories';
import Products from './pages/Products';
import Blog from './pages/Blog';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/users" element={<PagePlaceholder title="User Management" />} />
              <Route path="/orders" element={<PagePlaceholder title="Orders" />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Temporary placeholder for missing pages
const PagePlaceholder = ({ title }) => (
  <div className="p-10 bg-white rounded-3xl border border-neutral-100 min-h-[60vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-3xl font-serif font-bold mb-4">{title}</h1>
    <p className="text-neutral-500">We are currently building the {title} management module.</p>
  </div>
);

export default App;

