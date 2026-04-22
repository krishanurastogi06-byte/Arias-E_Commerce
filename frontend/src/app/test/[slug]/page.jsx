"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Star, ShoppingBag, ArrowLeft, ShieldCheck,
  Truck, RefreshCw, Layers, Scissors, Heart
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetching specific product by slug from the backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`);
        if (!response.ok) throw new Error('Product not found in database');
        const data = await response.json();
        setProduct(data.product);

        // Default selections
        if (data.product.sizes?.length > 0) setSelectedSize(data.product.sizes[0]);
        if (data.product.colors?.length > 0) setSelectedColor(data.product.colors[0]);
      } catch (err) {
        console.error("Detail Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6]">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 border-2 border-luxury-gold/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Unveiling Masterpiece</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] p-4 text-center">
      <div className="bg-white p-12 rounded-[50px] shadow-2xl shadow-neutral-200 max-w-lg border border-neutral-100">
        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Scissors size={40} className="text-neutral-200" />
        </div>
        <h1 className="text-4xl font-serif mb-4 text-foreground">Archive Missing</h1>
        <p className="text-neutral-500 mb-10 leading-relaxed font-light italic">
          This collection piece (slug: <span className="text-red-400 font-medium font-mono">{slug}</span>) could not be retrieved from the database.
          Please verify the product exists in MongoDB.
        </p>
        <Link href="/test" className="inline-flex px-10 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all hover:scale-105 shadow-xl shadow-black/10">
          Return to Collections
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-neutral-400 hover:text-black transition-all"
          >
            <div className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center group-hover:border-black transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] py-1">Back to Catalog Discovery</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side: Cinematic Image Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="sticky top-40">
              <div className="relative aspect-[3/4] rounded-[60px] overflow-hidden bg-white shadow-3xl shadow-neutral-900/10">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />

                {/* Floating Badges */}
                <div className="absolute top-10 left-10 flex flex-col gap-4">
                  {product.isNewArrival && (
                    <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full shadow-2xl">
                      Atelier Piece N°1
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-luxury-gold/20 rounded-br-[60px]" />
            </div>
          </motion.div>

          {/* Right Side: Editorial Content & Specs */}
          <div className="flex flex-col py-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-10"
            >
              {/* Identity Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-[0.5em] text-luxury-gold font-bold">{product.brand}</span>
                  <div className="w-12 h-[1px] bg-luxury-gold/40" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{product.category}</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-serif text-foreground leading-[1.1]">{product.title}</h1>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                    {product.oldPrice && (
                      <span className="text-xl text-neutral-300 line-through font-light">₹{product.oldPrice.toLocaleString()}</span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="bg-red-50 text-red-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                      {product.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-6 max-w-xl">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Couturier’s Narrative</h3>
                <p className="text-neutral-600 leading-relaxed text-base font-light italic">
                  "{product.description}"
                </p>
              </div>

              {/* Functional Attributes */}
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-neutral-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between group">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-black transition-colors">Dimensions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 w-14 border text-[10px] font-bold transition-all rounded-xl flex items-center justify-center ${selectedSize === size ? 'bg-black text-white border-black scale-110 shadow-lg' : 'bg-white text-neutral-400 border-neutral-100 hover:border-luxury-gold hover:text-luxury-gold'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Chromatic Selection</span>
                  <div className="flex flex-wrap gap-3">
                    {product.colors?.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-12 px-6 border text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl ${selectedColor === color ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-neutral-400 border-neutral-100 hover:border-luxury-gold hover:text-luxury-gold'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Master Actions */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button className="flex-[2] bg-foreground text-[#faf9f6] py-6 rounded-[24px] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center gap-4">
                  <ShoppingBag size={20} />
                  Acquire Now
                </button>
                <button className="flex-1 bg-white border border-neutral-200 text-black py-6 rounded-[24px] text-[10px] font-bold uppercase tracking-[0.3em] hover:border-black transition-all flex items-center justify-center gap-4">
                  <Heart size={20} className="text-red-400" />
                  Preserve
                </button>
              </div>

              {/* Blueprint Grid */}
              <div className="grid grid-cols-2 gap-4 pt-10">
                <div className="p-6 bg-white rounded-3xl border border-neutral-100/50 space-y-3">
                  <Layers size={22} className="text-luxury-gold" />
                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Composition</h4>
                    <p className="text-[13px] text-neutral-800 font-medium">{product.material}</p>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-neutral-100/50 space-y-3">
                  <Scissors size={22} className="text-luxury-gold" />
                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Silhouette</h4>
                    <p className="text-[13px] text-neutral-800 font-medium">{product.fit}</p>
                  </div>
                </div>
              </div>

              {/* Maintenance Archive */}
              <div className="p-10 bg-neutral-900 rounded-[40px] text-white relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl group-hover:bg-luxury-gold/20 transition-colors" />
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-luxury-gold/20 rounded-xl flex items-center justify-center text-luxury-gold">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-serif">Preservation Rituals</h3>
                </div>
                <p className="relative z-10 text-xs text-neutral-400 leading-relaxed font-light italic">
                  "{product.care}" - Our creations are for life. Each piece embodies longevity when honored with the correct maintenance traditions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Atmospheric Accents */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden blur-[120px] opacity-40">
        <div className="absolute top-[20%] -right-40 w-[600px] h-[600px] bg-accent-beige rounded-full" />
        <div className="absolute bottom-[20%] -left-40 w-[600px] h-[600px] bg-accent-blush rounded-full" />
      </div>
    </div>
  );
}
