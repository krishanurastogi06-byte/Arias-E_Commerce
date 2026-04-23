"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Shirt, Sparkles, Gem, Snowflake, Watch, Footprints, LayoutGrid, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';

const Navbar = () => {
  const router = useRouter();
  const { cart, isLoggedIn, logout } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopCategories, setShopCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/all`);
        if (response.ok) {
          const result = await response.json();
          setShopCategories(result.categories || []);
        }
      } catch (err) {
        console.error('Failed to fetch navbar categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownTimerRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShopEnter = () => {
    clearTimeout(dropdownTimerRef.current);
    setIsShopDropdownOpen(true);
  };

  const handleShopLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 120);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop', hasDropdown: true },
    { name: 'New Arrival', href: '/shop?filter=new' },
    { name: 'Sale', href: '/sale', isSale: true },
    // { name: 'Lookbook', href: '/lookbook' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    // { name: 'Test', href: '/test' },
  ];

  return (
    <>
      <nav className="fixed w-full z-50 bg-white transition-all duration-300 py-4 shadow-md">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ARIA Logo"
              width={90}
              height={90}
              className="object-contain"
              priority
              style={{ height: 'auto' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative group"
                onMouseEnter={link.hasDropdown ? handleShopEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleShopLeave : undefined}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide uppercase flex items-center gap-1 transition-colors ${link.isSale ? 'text-red-500' : 'text-neutral-800 hover:text-neutral-500'}`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isShopDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neutral-800 transition-all duration-300 group-hover:w-full" />

                {/* Shop Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isShopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50"
                        onMouseEnter={handleShopEnter}
                        onMouseLeave={handleShopLeave}
                      >
                        {/* Dropdown Header */}
                        <div className="px-6 pt-5 pb-3 border-b border-neutral-50 flex items-center justify-between">
                          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400">Browse Collections</span>
                          <Link
                            href="/shop"
                            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-neutral-500 transition-colors group/all"
                          >
                            <LayoutGrid size={12} />
                            View All
                            <span className="inline-block translate-x-0 group-hover/all:translate-x-0.5 transition-transform">→</span>
                          </Link>
                        </div>

                        {/* Category Grid */}
                        <div className="grid grid-cols-2 gap-0 p-4">
                          {shopCategories.map((cat, idx) => {
                            return (
                              <Link
                                key={cat._id}
                                href={`/shop?category=${encodeURIComponent(cat.categoryName)}`}
                                className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl hover:bg-neutral-50 transition-all duration-200 group/item"
                                onClick={() => setIsShopDropdownOpen(false)}
                              >
                                <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden shrink-0 relative">
                                  <Image
                                    src={cat.image}
                                    alt={cat.categoryName}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-neutral-800 group-hover/item:text-neutral-900 leading-tight">{cat.categoryName}</p>
                                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">{cat.label}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Footer Banner */}
                        <div className="mx-4 mb-4 rounded-xl bg-neutral-900 px-5 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-white text-xs font-semibold tracking-wide">New Arrivals are here 🎉</p>
                            <p className="text-neutral-400 text-[11px] mt-0.5">Fresh styles added weekly</p>
                          </div>
                          <Link
                            href="/shop?filter=new"
                            className="shrink-0 bg-white text-neutral-900 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                            onClick={() => setIsShopDropdownOpen(false)}
                          >
                            Shop Now
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Inline Search — matches ShopToolbar style exactly */}
            <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="bg-neutral-100 border-none rounded-xl py-3 pl-10 pr-5 text-sm focus:ring-1 focus:ring-neutral-300 transition-all outline-none w-[40px] focus:w-[280px] transition-[width] duration-300"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </form>
            {/* <Link href="#" className="hover:scale-110 transition-transform text-neutral-800 hidden sm:block relative">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-neutral-200 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link> */}
            <Link href="/cart" className="hover:scale-110 transition-transform text-neutral-800 relative bg-neutral-100 p-3 rounded-full">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <Link href="/profile" className="hover:scale-110 transition-transform text-neutral-800 hidden sm:block bg-neutral-100 p-3 rounded-full">
                <User size={20} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all hover:shadow-lg active:scale-95"
              >
                Join ARIA
              </Link>
            )}
            <button
              className="lg:hidden text-neutral-800 bg-neutral-100 p-3 rounded-full"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-3/4 h-full bg-white z-[70] shadow-2xl p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-serif font-bold italic">ARIA</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {navLinks.filter(link => !['Home', 'Shop', 'Sale'].includes(link.name)).map((link) => (
                  <li key={link.name}>
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                          className="w-full flex items-center justify-between text-xl font-medium tracking-wide uppercase text-neutral-800 py-2"
                        >
                          {link.name}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${isMobileShopOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileShopOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-2 pb-3 flex flex-col gap-1 mt-1">
                                {shopCategories.map((cat) => {
                                  return (
                                    <Link
                                      key={cat._id}
                                      href={`/shop?category=${encodeURIComponent(cat.categoryName)}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-neutral-100 overflow-hidden shrink-0 relative">
                                        <Image
                                          src={cat.image}
                                          alt={cat.categoryName}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <p className="text-sm font-semibold text-neutral-800">{cat.categoryName}</p>
                                        <p className="text-[11px] text-neutral-400">{cat.label}</p>
                                      </div>
                                    </Link>
                                  );
                                })}
                                <Link
                                  href="/shop"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2.5 mt-1 rounded-xl bg-neutral-900 text-white text-sm font-semibold"
                                >
                                  <LayoutGrid size={14} /> View All Collections
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-xl font-medium tracking-wide uppercase py-2 ${link.isSale ? 'text-red-500' : 'text-neutral-800'}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8 border-t border-neutral-100 flex flex-col gap-4">
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      router.push('/');
                    }}
                    className="flex items-center gap-2 text-sm text-red-500 bg-red-50 px-3 py-2.5 rounded-xl transition-all active:scale-95"
                  >
                    <LogOut size={18} /> Log Out
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
