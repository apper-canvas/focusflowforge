import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TimerPresets = ({ onPresetSelect, selectedDuration }) => {
  const presets = [
    { 
      minutes: 25, 
      label: 'Pomodoro', 
      description: 'Classic focus session',
      icon: 'Clock',
      color: 'from-primary to-secondary'
    },
    { 
      minutes: 50, 
      label: 'Deep Work', 
      description: 'Extended focus time',
      icon: 'Brain',
      color: 'from-secondary to-purple-600'
    },
    { 
      minutes: 90, 
      label: 'Flow State', 
      description: 'Maximum productivity',
      icon: 'Zap',
      color: 'from-success to-emerald-600'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-display font-semibold text-slate-100 text-center">
        Choose Your Focus Duration
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {presets.map((preset, index) => {
          const isSelected = selectedDuration === preset.minutes * 60;
          
          return (
            <motion.button
              key={preset.minutes}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPresetSelect(preset.minutes)}
              className={`
                card p-4 border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-primary bg-primary/10' 
                  : 'border-slate-700 hover:border-slate-600'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-12 h-12 rounded-xl bg-gradient-to-br ${preset.color}
                  flex items-center justify-center
                `}>
                  <ApperIcon name={preset.icon} size={24} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-semibold text-slate-100">
                      {preset.label}
                    </h4>
                    <span className="text-2xl font-bold gradient-text">
                      {preset.minutes}m
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {preset.description}
                  </p>
                </div>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <ApperIcon name="Check" size={16} className="text-white" />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TimerPresets;