import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Error = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4 py-8 max-w-md"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertTriangle" size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold gradient-text mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-400">
            {message || "We're having trouble loading your data. Please try again."}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={onRetry}
            className="w-full"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            className="w-full"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Refresh Page
          </Button>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          <p>If the problem persists, please check your internet connection</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;