import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ 
  label, 
  value, 
  subtitle, 
  icon, 
  color = 'primary', 
  progress,
  size = 'md'
}) => {
  const colorConfig = {
    primary: 'from-primary to-secondary',
    success: 'from-success to-emerald-600',
    warning: 'from-warning to-yellow-600',
    error: 'from-error to-red-600',
    info: 'from-info to-blue-600'
  };

  const sizeConfig = {
    sm: {
      container: 'p-3',
      icon: 'w-8 h-8',
      iconSize: 16,
      value: 'text-lg',
      label: 'text-xs',
      subtitle: 'text-xs'
    },
    md: {
      container: 'p-4',
      icon: 'w-10 h-10',
      iconSize: 20,
      value: 'text-2xl',
      label: 'text-sm',
      subtitle: 'text-sm'
    }
  };

  const config = sizeConfig[size];
  const gradient = colorConfig[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`card ${config.container} relative overflow-hidden`}
    >
      {/* Background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient} opacity-5
      `} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className={`
            ${config.icon} bg-gradient-to-br ${gradient} 
            rounded-lg flex items-center justify-center
          `}>
            <ApperIcon name={icon} size={config.iconSize} className="text-white" />
          </div>
          
          <div className="text-right">
            <div className={`${config.value} font-display font-bold gradient-text`}>
              {value}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={`${config.label} font-medium text-slate-300`}>
            {label}
          </h3>
          {subtitle && (
            <p className={`${config.subtitle} text-slate-400`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {progress !== undefined && (
          <div className="mt-2">
            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;