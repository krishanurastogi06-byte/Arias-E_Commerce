"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { brands } from '../../data/data';

const BrandSection = () => {
  return (
    <section className="py-20 bg-[#faf9f6] border-y border-neutral-100" id="brands">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xs text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4 italic">The Brands We House</h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              We partner with global luxury labels to bring you the finest style from across the world.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
              >
                <div className="h-12 w-24 relative">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
