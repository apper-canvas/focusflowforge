import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ActiveTimerWidget = ({ timer, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!timer) return;

    const updateTimer = () => {
      const now = Date.now();
      const startTime = new Date(timer.startTime).getTime();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(0, timer.duration - elapsed);
      
      setTimeLeft(remaining);
      
      if (remaining === 0 && isActive) {
        setIsActive(false);
        onComplete();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [timer, isActive, onComplete]);

  if (!timer) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timer.duration > 0 ? ((timer.duration - timeLeft) / timer.duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-elevated p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center timer-pulse">
            <ApperIcon name="Timer" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-100">
              Focus Session Active
            </h3>
            <p className="text-xs text-slate-400">
              Started {format(new Date(timer.startTime), 'HH:mm')}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-display font-bold gradient-text">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-slate-400">
            {Math.floor(timer.duration / 60)}m session
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{Math.round(progress)}% complete</span>
          <span>{Math.floor(timeLeft / 60)}m remaining</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {/* Handle pause */}}
          className="flex-1"
        >
          <ApperIcon name="Pause" size={14} className="mr-1" />
          Pause
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {/* Handle stop */}}
          className="flex-1 text-red-400 hover:text-red-300"
        >
          <ApperIcon name="Square" size={14} className="mr-1" />
          Stop
        </Button>
      </div>
    </motion.div>
  );
};

export default ActiveTimerWidget;