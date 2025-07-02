import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Select = ({ 
  label,
  error,
  options = [],
  value,
  onChange,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`form-input appearance-none pr-10 ${error ? 'border-error focus:border-error focus:ring-error/20' : ''} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" size={16} className="text-slate-400" />
        </div>
      </div>
      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;