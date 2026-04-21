"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/data';
import ProductCard from '../ProductCard';
import { ArrowRight } from 'lucide-react';

const NewArrivals = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="btn-outline w-full">View All New Arrivals</button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
