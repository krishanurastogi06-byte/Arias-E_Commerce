"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  X,
  ShoppingBag,
  ArrowRight,
  Trash2,
  Lock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import EmptyState from '@/components/EmptyState';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoggedIn, login, logout, isInitialized } = useStore();
  const router = useRouter();

  if (!isInitialized) return null;

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 49;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push('/checkout');
    } else {
      router.push('/login');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#faf9f6]">
        <EmptyState
          title="Your bag is empty"
          description="Looks like you haven't added anything to your cart yet. Explore our curated collections to find your next statement piece."
          buttonText="Start Shopping"
          buttonLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 font-sans text-[#1a1a1a]">
      <div className="container mx-auto px-4 md:px-8">

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">Your Shopping Bag</h1>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-neutral-800 font-medium">Cart</span>
            </div>
          </div>
          <button
            onClick={() => {
              clearCart();
            }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors py-2 px-4 rounded-xl border border-neutral-100 hover:border-red-100 bg-white shadow-sm"
          >
            <Trash2 size={14} />
            Clear Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col sm:flex-row gap-6 items-center group relative h-full"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-neutral-300 hover:text-red-500 transition-colors p-2"
                  >
                    <X size={20} />
                  </button>

                  {/* Product Image */}
                  <div className="w-32 h-40 relative rounded-2xl overflow-hidden bg-neutral-50 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex justify-between items-start pr-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">{item.brand}</p>
                        <h3 className="text-lg font-bold font-serif italic text-neutral-800">{item.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span>Color: {item.colors?.[0] || 'Default'}</span>
                      <span>Size: {item.sizes?.[0] || 'One Size'}</span>
                    </div>

                    <div className="flex items-end justify-between pt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-[#faf9f6] rounded-full p-1 border border-neutral-100">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-neutral-400">₹{item.price.toFixed(2)} / item</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Mock Login for testing functionality */}
            {/* <div className="p-8 rounded-3xl bg-neutral-50 border border-dashed border-neutral-200 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Developer Tools</h4>
                <p className="text-xs text-neutral-400">Current Status: <span className={isLoggedIn ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</span></p>
              </div>
              <button
                onClick={isLoggedIn ? logout : login}
                className="px-6 py-2 rounded-full border border-neutral-800 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm active:scale-95"
              >
                {isLoggedIn ? 'Log Out (Mock)' : 'Log In (Mock)'}
              </button>
            </div> */}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 sticky top-32">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-50">
              <h2 className="text-2xl font-serif font-bold italic mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-accent-rose italic">*Free shipping on orders above ₹1000</p>
                )}
                <div className="h-[1px] bg-neutral-100 my-4" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-neutral-900">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-premium py-4 rounded-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 space-y-4 border-t border-neutral-50 pt-8">
                <div className="flex gap-4 items-center text-xs text-neutral-500">
                  <ShieldCheck size={20} className="text-green-600 shrink-0" />
                  <p>Secure SSL Encrypted Payment</p>
                </div>
                <div className="flex gap-4 items-center text-xs text-neutral-500">
                  <Lock size={20} className="text-neutral-400 shrink-0" />
                  <p>Your privacy is our priority. We handle all data with utmost care.</p>
                </div>
              </div>

              {/* Secure Payment Badges */}
              <div className="mt-8 flex justify-center gap-4 grayscale opacity-40">
                <div className="w-10 h-6 bg-neutral-200 rounded animate-pulse" />
                <div className="w-10 h-6 bg-neutral-200 rounded animate-pulse" />
                <div className="w-10 h-6 bg-neutral-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
