import React from 'react';

const FormInput = ({ label, id, type = "text", value, onChange, placeholder, required = false, isTextarea = false, rows = 4 }) => {
  const commonClasses = "w-full px-5 py-3.5 bg-neutral-50/50 border border-neutral-200 rounded-2xl outline-none focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/5 transition-all text-sm placeholder:text-neutral-400";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={commonClasses}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default FormInput;
