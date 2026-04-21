"use client";
import React from 'react';
import { Search, ChevronDown, RotateCcw } from 'lucide-react';

const ShopToolbar = ({ categories, selectedCategory, setSelectedCategory, selectedSort, setSelectedSort, searchTerm, setSearchTerm, totalItems, onReset, isFiltered }) => {
  const sortOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'New Arrival', value: 'new' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Top Rated', value: 'rated' },
  ];

  return (
    <div className="bg-white border border-neutral-100 rounded-3xl p-4 md:p-6 shadow-sm mb-12 sticky top-24 z-30 backdrop-blur-md bg-white/90">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Left: Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-neutral-50 border-none rounded-xl px-6 py-3 pr-12 text-sm font-medium focus:ring-1 focus:ring-accent-rose transition-all cursor-pointer min-w-[160px]"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
          </div>

          <div className="relative group">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none bg-neutral-50 border-none rounded-xl px-6 py-3 pr-12 text-sm font-medium focus:ring-1 focus:ring-accent-rose transition-all cursor-pointer min-w-[160px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
          </div>
          {/* Reset Button — only visible when filters are active */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-all duration-200 group"
            >
              <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
              Reset
            </button>
          )}
        </div>

        {/* Center/Right: Search & Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 lg:max-w-xl lg:justify-end">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-50 border-none rounded-xl py-3 pl-12 pr-6 text-sm focus:ring-1 focus:ring-accent-rose transition-all"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="flex items-center gap-3 whitespace-nowrap text-sm text-neutral-500 font-medium">
            <span className="text-black font-bold">{totalItems}</span> Products Found
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopToolbar;
