import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Quick Timer',
      icon: 'Timer',
      color: 'from-primary to-secondary',
      onClick: () => navigate('/timer')
    },
    {
      label: 'Add Task',
      icon: 'Plus',
      color: 'from-success to-emerald-600',
      onClick: () => navigate('/tasks')
    },
    {
      label: 'Review',
      icon: 'BarChart3',
      color: 'from-warning to-orange-600',
      onClick: () => {/* Navigate to analytics */}
    }
  ];

  return (
    <div className="card p-4">
      <h3 className="text-lg font-display font-semibold text-slate-100 mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={`
              bg-gradient-to-br ${action.color} p-4 rounded-xl
              flex flex-col items-center justify-center space-y-2
              hover:shadow-lg transition-all duration-200
              min-h-[80px]
            `}
          >
            <ApperIcon name={action.icon} size={24} className="text-white" />
            <span className="text-sm font-medium text-white">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;