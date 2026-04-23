"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard';
import { ArrowRight } from 'lucide-react';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error('Fetch new arrivals error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <section className="py-24 bg-white" id="products">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent-rose font-bold uppercase tracking-[0.2em] text-xs mb-4 block"
            >
              The Modern Muse
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              New Arrivals
            </motion.h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-accent-rose hover:border-accent-rose transition-colors group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] bg-neutral-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <button className="btn-outline w-full">View All New Arrivals</button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
