import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

const TableView = ({ headers, data, onEdit, onDelete, onView, renderCell }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl border border-neutral-100 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-neutral-50/50 border-b border-neutral-100">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                {header.label}
              </th>
            ))}
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-neutral-400 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-neutral-50/30 transition-colors group">
              {headers.map((header, idx) => (
                <td key={idx} className="px-6 py-4 text-sm text-neutral-600 font-medium">
                  {renderCell ? renderCell(item, header.key) : item[header.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {onView && (
                    <button
                      onClick={() => onView(item)}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-md text-neutral-400 hover:text-luxury-gold transition-all"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-md text-neutral-400 hover:text-blue-500 transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-md text-neutral-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-neutral-400 italic">No records found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TableView;
