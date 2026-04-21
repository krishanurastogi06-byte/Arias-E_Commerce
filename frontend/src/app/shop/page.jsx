"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import HeroBanner from '@/components/home/HeroBanner';
import Image from 'next/image';
import { products, categories as categoryData } from '@/data/data';
import ProductCard from '@/components/ProductCard';
import ShopToolbar from '@/components/ShopToolbar';
import EmptyState from '@/components/EmptyState';
import CTASection from '@/components/home/CTASection';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  // Sync filters from URL query params (e.g. /shop?category=Dresses or /shop?filter=new)
  useEffect(() => {
    const cat = searchParams.get('category');
    const filter = searchParams.get('filter');

    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All');
    }

    if (filter === 'new') {
      setSelectedSort('new');
    } else if (!cat) {
      // Only reset sort if there's no category param either (pure /shop)
      setSelectedSort('popular');
    }
  }, [searchParams]);

  // Extract unique category names for the dropdown
  const categoryNames = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, []);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Search Filter
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch) ||
        p.brand.toLowerCase().includes(lowerSearch)
      );
    }

    // 3. New Arrival filter (show only new arrivals when selected)
    if (selectedSort === 'new') {
      result = result.filter(p => p.isNewArrival === true);
    }

    // 4. Sorting logic (skip sort for 'new' since it's already filtered)
    if (selectedSort !== 'new') {
      result.sort((a, b) => {
        switch (selectedSort) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rated':
            return b.rating - a.rating;
          case 'popular':
          default:
            return b.isPopular === a.isPopular ? 0 : b.isPopular ? 1 : -1;
        }
      });
    }

    return result;
  }, [selectedCategory, selectedSort, searchTerm]);

  const handleReset = () => {
    setSelectedCategory('All');
    setSelectedSort('popular');
    setSearchTerm('');
    router.replace('/shop');
  };

  return (
    <main className="min-h-screen pt-20">

      {/* 1. Shop Header / Banner */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://img.freepik.com/free-photo/wardrobe-with-clothes-hangers_23-2149190378.jpg"
            alt="Shop Banner"
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <nav className="text-white/70 text-sm uppercase tracking-widest mb-4 flex justify-center gap-2">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>/</span>
              <span className="text-white">Shop</span>
            </nav>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Shop <span className="italic font-serif text-accent-blush">Collection</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of luxury essentials designed for the modern woman.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          {/* Toolbar */}
          <ShopToolbar
            categories={categoryNames}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalItems={filteredProducts.length}
            onReset={handleReset}
            isFiltered={selectedCategory !== 'All' || selectedSort !== 'popular' || searchTerm.trim() !== ''}
          />

          {/* Grid or Empty State */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <EmptyState key="empty" onReset={handleReset} />
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 3. CTA Section */}
      <CTASection />

    </main>
  );
}
