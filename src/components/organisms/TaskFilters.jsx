import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TaskFilters = ({ filters, onFiltersChange }) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: 'List' },
    { value: 'pending', label: 'Pending', icon: 'Clock' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities', color: 'text-slate-400' },
    { value: 'high', label: 'High', color: 'text-red-400' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { value: 'low', label: 'Low', color: 'text-green-400' }
  ];

  const sortOptions = [
    { value: 'priority', label: 'Priority', icon: 'ArrowUp' },
    { value: 'created', label: 'Created', icon: 'Calendar' },
    { value: 'title', label: 'Title', icon: 'AlphabeticalOrder' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="card p-4 space-y-4">
      <h3 className="text-sm font-medium text-slate-300 mb-3">Filters & Sort</h3>
      
      {/* Status Filter */}
      <div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {statusOptions.map((option) => (
            <motion.button
              key={option.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange('status', option.value)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap
                transition-all duration-200 text-sm font-medium
                ${filters.status === option.value
                  ? 'bg-primary text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }
              `}
            >
              <ApperIcon name={option.icon} size={14} />
              <span>{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Priority and Sort */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-400 mb-2 block">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="text-xs text-slate-400 mb-2 block">Sort by</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;