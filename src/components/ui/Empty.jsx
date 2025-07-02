import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  title, 
  description, 
  actionText, 
  onAction,
  icon = 'CheckCircle'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-success to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-display font-semibold gradient-text mb-2">
          {title}
        </h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionText}
        </Button>
      )}

      <div className="mt-8 text-xs text-slate-500">
        <p>Ready to boost your productivity?</p>
      </div>
    </motion.div>
  );
};

export default Empty;