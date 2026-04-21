import React from 'react';
import { Search, LayoutGrid, List, Filter, ChevronDown } from 'lucide-react';

const FilterBar = ({ 
  search, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  showViewToggle = true,
  placeholder = "Search..."
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-neutral-100/50">
      {/* Search Input */}
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-luxury-gold transition-colors" size={18} />
        <input 
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-100 rounded-xl outline-none focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/5 transition-all text-sm"
        />
      </div>

      {/* Filters & View Toggle */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Category Filter */}
        {categories && (
          <div className="relative flex-1 md:flex-none">
            <select 
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none w-full md:w-48 pl-4 pr-10 py-3 bg-white border border-neutral-100 rounded-xl outline-none focus:border-luxury-gold transition-all text-sm cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
          </div>
        )}

        {/* View Toggle */}
        {showViewToggle && (
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl">
            <button 
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        )}

        {/* Quick Filter (Placeholder) */}
        <button className="p-3 bg-white border border-neutral-100 rounded-xl text-neutral-500 hover:text-luxury-gold transition-all hover:border-luxury-gold/30">
          <Filter size={18} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
