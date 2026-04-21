"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-110" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-sm uppercase tracking-[0.5em] font-medium mb-6">Limited Edition</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl mx-auto leading-tight">
            Step Into Confidence With Our Latest Collection
          </h2>
          <p className="text-lg text-white/80 mb-12 max-w-xl mx-auto italic">
            "Fashion is the armor to survive the reality of everyday life." — Bill Cunningham
          </p>
          <Link href="/shop" className="inline-block px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95 shadow-2xl">
            Shop Collection
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-white/20 rounded-full animate-pulse lg:block hidden" />
      <div className="absolute bottom-10 left-10 w-40 h-40 border border-white/10 rounded-full animate-bounce lg:block hidden" />
    </section>
  );
};

export default CTASection;
