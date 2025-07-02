import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TimerControls = ({ 
  isActive, 
  isPaused, 
  onStart, 
  onPause, 
  onResume, 
  onStop, 
  disabled 
}) => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  if (isActive) {
    return (
      <div className="flex justify-center space-x-4">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="ghost"
            size="lg"
            onClick={isPaused ? onResume : onPause}
            className="bg-slate-700 hover:bg-slate-600"
          >
            <ApperIcon 
              name={isPaused ? "Play" : "Pause"} 
              size={20} 
              className="mr-2" 
            />
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </motion.div>
        
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="ghost"
            size="lg"
            onClick={onStop}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
          >
            <ApperIcon name="Square" size={20} className="mr-2" />
            Stop
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          variant="primary"
          size="lg"
          onClick={onStart}
          disabled={disabled}
          className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
        >
          <ApperIcon name="Play" size={20} className="mr-2" />
          Start Focus
        </Button>
      </motion.div>
    </div>
  );
};

export default TimerControls;