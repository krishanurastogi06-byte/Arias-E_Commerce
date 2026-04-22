"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Eye, AlertCircle, RefreshCw } from 'lucide-react';

import Link from 'next/link';

// Specialized Test Card component to avoid touching production ProductCard
const DBProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-neutral-100"
    >
      <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-black text-white px-3 py-1 text-[8px] uppercase tracking-widest font-bold rounded-full shadow-lg">New</span>
          )}
          {product.discount && (
            <span className="bg-luxury-gold text-white px-3 py-1 text-[8px] uppercase tracking-widest font-bold rounded-full shadow-lg">{product.discount}</span>
          )}
        </div>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
            <Eye size={18} />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{product.brand}</span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={10} fill="currentColor" />
            <span className="text-[9px] font-bold text-neutral-500 italic">Database Record</span>
          </div>
        </div>

        <h3 className="font-serif text-lg text-neutral-800 line-clamp-1">{product.title}</h3>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-foreground">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through">₹{product.oldPrice}</span>
          )}
        </div>

        <div className="pt-4 mt-2 border-t border-neutral-50 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] text-neutral-400 uppercase tracking-widest font-bold">Category</span>
            <span className="text-[9px] text-neutral-600 font-medium">{product.category}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestPage() {
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching from backend database API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products from backend');
      const data = await response.json();
      setDbProducts(data.products || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-luxury-gold/10 text-luxury-gold px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 uppercase"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Live Connection Active
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif mb-6 text-foreground"
        >
          Database Verification
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base font-light italic"
        >
          This view bypasses static mock data to display real-time records from your MongoDB collection.
          Built with an isolated <span className="text-foreground font-medium">DBProductCard</span> to ensure production components remain stable.
        </motion.p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-32">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-luxury-gold/20 rounded-full" />
              <div className="absolute top-0 w-16 h-16 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-bold mb-1">Synchronizing</p>
              <p className="text-xs text-neutral-300">Requesting data from http://localhost:4000/api/products</p>
            </div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[40px] text-center shadow-xl shadow-red-500/5 border border-red-50 max-w-xl mx-auto"
          >
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-serif mb-3 text-neutral-800">Connection Failed</h2>
            <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
              We couldn't reach the backend server. Please ensure the <code className="bg-neutral-100 px-2 py-0.5 rounded text-red-600">server.js</code> is running on port 4000 and CORS is enabled.
            </p>
            <button
              onClick={fetchProducts}
              className="group flex items-center gap-3 mx-auto px-8 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all hover:scale-105"
            >
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              Retry Connection
            </button>
          </motion.div>
        ) : dbProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white rounded-[40px] border border-neutral-100 shadow-sm max-w-4xl mx-auto px-10"
          >
            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} className="text-neutral-200" />
            </div>
            <h3 className="text-3xl font-serif mb-4 text-neutral-800">The collection is currently empty</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
              The database connection was successful, but no product documents were found in the <code className="text-luxury-gold uppercase px-1 font-bold tracking-tight">products</code> collection.
            </p>
            <div className="mt-10 pt-10 border-t border-neutral-50 flex flex-col items-center gap-2">
              <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-bold">Next Steps</span>
              <p className="text-xs text-neutral-400">Use Postman or your Admin Dashboard to add products to the database.</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {dbProducts.map((product) => (
              <Link key={product._id} href={`/test/${product.slug}`}>
                <DBProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Elegant background accents */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-60">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-accent-beige/40 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-accent-blush/30 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
