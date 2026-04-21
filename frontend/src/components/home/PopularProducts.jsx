"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/data';
import ProductCard from '../ProductCard';

const PopularProducts = () => {
  const popularProducts = products.filter(p => p.isPopular).slice(0, 4);

  return (
    <section className="py-24 bg-[#faf9f6]" id="popular">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Popular Choices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-500 uppercase tracking-widest text-sm"
          >
            Trending styles loved by our customers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-premium">View All Trending</button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
