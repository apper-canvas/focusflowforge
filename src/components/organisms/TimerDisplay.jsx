import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TimerDisplay = ({ timer, duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (timer) {
      setIsActive(true);
      const updateTimer = () => {
        const now = Date.now();
        const startTime = new Date(timer.startTime).getTime();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, timer.duration - elapsed);
        
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          setIsActive(false);
          onComplete();
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft(duration);
      setIsActive(false);
    }
  }, [timer, duration, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins, secs };
  };

  const { mins, secs } = formatTime(timeLeft);
  const totalSeconds = timer ? timer.duration : duration;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      {/* Outer glow ring */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isActive ? 'bg-primary/20 animate-pulse' : 'bg-slate-700/20'
        }`}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          repeatType: "reverse"
        }}
      />

      {/* Main timer circle */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg
          className="w-64 h-64 transform -rotate-90"
          viewBox="0 0 256 256"
        >
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-700"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-display font-bold gradient-text mb-2">
              {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </div>
            <div className="text-slate-400 text-sm">
              {isActive ? 'Focus Time' : 'Ready to Focus'}
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="mt-4 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isActive ? 'bg-primary animate-pulse' : 'bg-slate-600'
            }`} />
            <span className="text-xs text-slate-400">
              {isActive ? 'Active' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
        <div className="bg-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;