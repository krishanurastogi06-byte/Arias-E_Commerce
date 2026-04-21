"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-full w-full overflow-hidden flex items-center bg-[#fdfaf5] py-12">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f5f0e6] hidden lg:block transform skew-x-[-12deg] translate-x-20" />

      <div className="container mx-auto px-4 md:px-8 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm uppercase tracking-[0.3em] font-medium text-neutral-500 mb-6"
          >
            New Collection 2026
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Elevate Your <br />
            <span className="italic font-serif text-accent-rose">Everyday</span> Style
          </h1>
          <p className="text-neutral-600 text-lg mb-10 leading-relaxed max-w-md">
            Discover our curated collection of luxury essentials designed for the modern woman. Sophistication meets comfort in every stitch.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-premium group flex items-center gap-2 text-center">
              Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/shop" className="btn-outline text-center">
              Explore Collection
            </Link>
          </div>

          {/* Stats/Badges */}
          <div className="mt-16 flex items-center gap-12 border-t border-neutral-200 pt-8">
            <div>
              <p className="text-2xl font-bold">12K+</p>
              <p className="text-xs uppercase tracking-widest text-neutral-400">Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-xs uppercase tracking-widest text-neutral-400">Exclusive Brands</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[700px] w-full"
        >
          <div className="absolute inset-0 bg-accent-blush rounded-b-full transform -rotate-6 scale-95 lg:block hidden" />
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
            alt="Fashion Model"
            fill
            className="object-cover rounded-3xl z-10"
            priority
            sizes="100vw"
          />

          {/* Floating Sale Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-black text-white p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center z-20 shadow-2xl"
          >
            <span className="text-xs uppercase tracking-widest">Sale</span>
            <span className="text-2xl font-bold">40%</span>
            <span className="text-xs uppercase">Off</span>
          </motion.div>

          {/* Abstract Elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 border-[20px] border-white/50 rounded-full blur-2xl z-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
