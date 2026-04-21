"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      {/* Image — outer Link */}
      <Link href={`/shop/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full">New</span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full">{product.discount}</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white translate-x-4 group-hover:translate-x-0"
        >
          <Heart size={18} />
        </button>

        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Quick Actions Overlay — use router.push instead of nested Link */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="flex-1 bg-black text-white py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
            {/* Eye: button with router.push to avoid nested <a> */}
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/shop/${product.slug}`);
              }}
              className="bg-white text-black p-3 rounded-xl hover:bg-neutral-100 transition-colors flex items-center justify-center"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        {/* Subtle shadow on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-medium text-neutral-800 group-hover:text-accent-rose transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through">₹{product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
