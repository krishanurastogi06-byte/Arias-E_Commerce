import React from 'react';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

const CardView = ({ data, onEdit, onDelete, onView, renderContent }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {data.map((item) => (
        <div 
          key={item.id} 
          className="group bg-white rounded-3xl border border-neutral-100 overflow-hidden hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500"
        >
          {/* Image Container */}
          <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                No Image
              </div>
            )}
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <button 
                onClick={() => onEdit(item)}
                className="p-3 bg-white rounded-full text-black hover:bg-luxury-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => onDelete(item)}
                className="p-3 bg-white rounded-full text-black hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
               <div>
                 <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold mb-1">{item.category}</p>
                 <h3 className="font-serif font-bold text-lg text-foreground line-clamp-1">{item.title}</h3>
               </div>
               {onView && (
                 <button onClick={() => onView(item)} className="text-neutral-400 hover:text-black transition-colors">
                   <ExternalLink size={16} />
                 </button>
               )}
            </div>
            
            {renderContent && renderContent(item)}
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="text-neutral-400 italic">No records found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CardView;
