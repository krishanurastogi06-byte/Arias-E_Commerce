"use client";
import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ onReset }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-8">
        <SearchX size={48} className="text-neutral-300" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-4">No products found</h3>
      <p className="text-neutral-500 max-w-md mb-10 text-lg">
        We couldn't find any products matching your current filters. Try adjusting your search or category selection.
      </p>
      <button 
        onClick={onReset}
        className="btn-premium flex items-center gap-2"
      >
        <RotateCcw size={18} /> Reset All Filters
      </button>
    </motion.div>
  );
};

export default EmptyState;
