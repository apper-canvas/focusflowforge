import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FloatingActionButton = ({ 
  onClick, 
  icon = 'Plus', 
  className = '',
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        w-14 h-14 bg-gradient-to-r from-primary to-secondary 
        rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      <ApperIcon name={icon} size={24} className="text-white" />
    </motion.button>
  );
};

export default FloatingActionButton;