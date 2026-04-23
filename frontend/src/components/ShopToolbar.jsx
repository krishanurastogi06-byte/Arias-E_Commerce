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
    <div className="bg-white border border-neutral-100 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-sm mb-8 md:mb-12  md:sticky top-24 z-30 backdrop-blur-md bg-white/90">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">

        {/* Left: Filters */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 md:gap-4">
          <div className="relative group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-neutral-50 border-none rounded-xl px-4 md:px-6 py-2.5 md:py-3 pr-10 md:pr-12 text-xs md:text-sm font-medium focus:ring-1 focus:ring-accent-rose transition-all cursor-pointer md:min-w-[160px]"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
          </div>

          <div className="relative group">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full appearance-none bg-neutral-50 border-none rounded-xl px-4 md:px-6 py-2.5 md:py-3 pr-10 md:pr-12 text-xs md:text-sm font-medium focus:ring-1 focus:ring-accent-rose transition-all cursor-pointer md:min-w-[160px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
          </div>

          {/* Reset Button — only visible when filters are active */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="col-span-2 md:col-auto flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-all duration-200 group"
            >
              <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Center/Right: Search & Stats */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 flex-1 lg:max-w-xl lg:justify-end">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-50 border-none rounded-xl py-2.5 md:py-3 pl-10 md:pl-12 pr-6 text-xs md:text-sm focus:ring-1 focus:ring-accent-rose transition-all"
            />
            <Search size={16} className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="flex items-center justify-center w-full md:w-auto gap-2 whitespace-nowrap text-[10px] md:text-sm text-neutral-500 font-medium uppercase tracking-widest">
            <span className="text-black font-bold">{totalItems}</span> Products Found
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopToolbar;
