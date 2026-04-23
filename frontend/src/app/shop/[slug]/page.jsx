"use client";
import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Heart, Star, ChevronRight, RotateCcw,
  Shield, Truck, RefreshCcw, Sparkles
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';

export default function ProductDetailPage({ params }) {
  const { addToCart } = useStore();
  const { slug } = use(params);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]); // For related products
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        // Fetch current product
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`);
        if (!res.ok) {
          setProduct(null);
          return;
        }
        const data = await res.json();
        setProduct(data.product);

        // Fetch all products for related section
        const allRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        if (allRes.ok) {
          const allData = await allRes.json();
          setProducts(allData.products || []);
        }
      } catch (err) {
        console.error('Fetch detail error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  if (!product) return notFound();

  const related = products
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <main className="min-h-screen pt-28 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-10">
          <Link href="/" className="hover:text-neutral-700 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-neutral-700 transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-neutral-700 transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-neutral-700 font-medium">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-24">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                {product.isNewArrival && (
                  <span className="bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full">New</span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full">{product.discount}</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Brand + Rating */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">{product.brand}</span>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-neutral-200 text-neutral-200'}
                  />
                ))}
                <span className="text-sm font-semibold ml-1">{product.rating}</span>
                <span className="text-xs text-neutral-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">₹{product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">₹{product.oldPrice.toFixed(2)}</span>
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">{product.discount}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 leading-relaxed text-sm mb-8 border-t border-neutral-100 pt-6">
              {product.description}
            </p>

            {/* Color Picker */}
            {product.colors && product.colors.length > 0 && (
              <ColorPicker colors={product.colors} />
            )}

            {/* Size Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <SizePicker sizes={product.sizes} />
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="flex-1 bg-black text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="w-14 h-14 border border-neutral-200 rounded-2xl flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-600 hover:text-red-500">
                <Heart size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders over ₹999' },
                { icon: RefreshCcw, label: 'Easy Returns', sub: '30-day return policy' },
                { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-neutral-50 rounded-2xl">
                  <Icon size={18} className="text-neutral-700 mb-1.5" />
                  <p className="text-xs font-semibold text-neutral-800">{label}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Detail Tabs */}
            <DetailTabs product={product} />
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">You May Also Like</p>
                <h2 className="text-2xl md:text-3xl font-bold">More from <span className="italic font-serif">{product.category}</span></h2>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

/* ─── Color Picker ─────────────────────────────────────── */
function ColorPicker({ colors }) {
  const [selected, setSelected] = useState(colors[0]);
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">
        Color — <span className="text-neutral-800">{selected}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelected(color)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${selected === color
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Size Picker ─────────────────────────────────────── */
function SizePicker({ sizes }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">
        Size {selected && <span className="text-neutral-800">— {selected}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 min-w-[52px] ${selected === size
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Detail Tabs ─────────────────────────────────────── */
function DetailTabs({ product }) {
  const [active, setActive] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'fit', label: 'Fit & Sizing' },
    { id: 'care', label: 'Care' },
  ];

  return (
    <div className="border-t border-neutral-100 pt-6">
      <div className="flex gap-6 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${active === tab.id
              ? 'border-black text-black'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="text-sm text-neutral-600 leading-relaxed">
        {active === 'details' && (
          <div className="space-y-2">
            <div className="flex gap-3">
              <span className="font-semibold text-neutral-800 w-24 shrink-0">Material</span>
              <span>{product.material}</span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-neutral-800 w-24 shrink-0">Category</span>
              <span>{product.category}</span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-neutral-800 w-24 shrink-0">Brand</span>
              <span>{product.brand}</span>
            </div>
          </div>
        )}
        {active === 'fit' && <p>{product.fit}</p>}
        {active === 'care' && (
          <div className="flex items-start gap-2">
            <RotateCcw size={14} className="mt-0.5 shrink-0 text-neutral-400" />
            <p>{product.care}</p>
          </div>
        )}
      </div>
    </div>
  );
}
