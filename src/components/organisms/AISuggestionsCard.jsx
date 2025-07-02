import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import TaskCard from '@/components/molecules/TaskCard';

const AISuggestionsCard = ({ suggestions, onStartTimer }) => {
  const topSuggestion = suggestions[0];

  if (!topSuggestion) {
    return (
      <div className="card-elevated p-6 border-2 border-gradient-to-r from-primary/30 to-secondary/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" size={16} className="text-white" />
          </div>
          <h2 className="text-lg font-display font-semibold gradient-text">
            AI Suggestions
          </h2>
        </div>
        
        <div className="text-center py-8">
          <ApperIcon name="Brain" size={48} className="text-slate-400 mx-auto mb-3" />
          <p className="text-slate-400">
            No tasks available for AI suggestions. Create some tasks to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-6 border-2 border-gradient-to-r from-primary/30 to-secondary/30 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Sparkles" size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-display font-semibold gradient-text">
              AI Recommendation
            </h2>
          </div>
          <div className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-full">
            Optimized for you
          </div>
        </div>

        <div className="mb-6">
          <TaskCard 
            task={topSuggestion}
            showActions={false}
            className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <ApperIcon name="Clock" size={14} />
                <span>{topSuggestion.effortHours}h estimated</span>
              </span>
              <span className="flex items-center space-x-1">
                <ApperIcon name="Target" size={14} />
                <span>{topSuggestion.priority} priority</span>
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Navigate to tasks */}}
            >
              See All
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onStartTimer(topSuggestion.Id, 25 * 60)}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <ApperIcon name="Play" size={14} className="mr-1" />
              Start Focus
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AISuggestionsCard;