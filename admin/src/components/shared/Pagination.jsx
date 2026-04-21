import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange, 
  onShowAll, 
  showingAll 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems <= itemsPerPage && !showingAll) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 px-2">
      <p className="text-sm text-neutral-400 font-medium">
        {showingAll 
          ? `Showing all ${totalItems} items` 
          : `Showing ${Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`
        }
      </p>

      <div className="flex items-center gap-4">
        {/* Toggle Show All */}
        <button 
          onClick={onShowAll}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${showingAll ? 'bg-black text-white border-black' : 'bg-white text-neutral-500 border-neutral-100 hover:border-luxury-gold hover:text-luxury-gold'}`}
        >
          {showingAll ? 'Paginate' : 'Show All'}
        </button>

        {!showingAll && (
          <div className="flex items-center gap-1 bg-white border border-neutral-100 p-1 rounded-xl shadow-sm">
            <button 
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="p-2 rounded-lg hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center px-4 h-9">
              <span className="text-sm font-bold">{currentPage}</span>
              <span className="mx-2 text-neutral-300">/</span>
              <span className="text-sm text-neutral-400">{totalPages}</span>
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="p-2 rounded-lg hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
