import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TaskCard = ({ 
  task, 
  onComplete, 
  onEdit, 
  onDelete, 
  onStartTimer,
  showActions = true,
  className = ""
}) => {
  const priorityConfig = {
    high: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: 'AlertCircle' },
    medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: 'Clock' },
    low: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: 'CheckCircle' }
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`
        card p-4 border-l-4 ${
          task.completed 
            ? 'border-l-success bg-success/5' 
            : priority.color.includes('red') ? 'border-l-red-500' :
              priority.color.includes('yellow') ? 'border-l-yellow-500' :
              'border-l-green-500'
        } ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={onComplete}
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                transition-all duration-200
                ${task.completed
                  ? 'bg-success border-success'
                  : 'border-slate-400 hover:border-primary'
                }
              `}
            >
              {task.completed && (
                <ApperIcon name="Check" size={12} className="text-white" />
              )}
            </button>
            
            <h3 className={`
              font-medium text-slate-100 ${
                task.completed ? 'line-through opacity-60' : ''
              }
            `}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <div className={`
              px-2 py-1 rounded-full border ${priority.color}
              flex items-center space-x-1
            `}>
              <ApperIcon name={priority.icon} size={12} />
              <span className="capitalize">{task.priority}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" size={12} />
              <span>{task.effortHours}h</span>
            </div>
            
            {task.actualMinutes && (
              <div className="flex items-center space-x-1">
                <ApperIcon name="Timer" size={12} />
                <span>{task.actualMinutes}m spent</span>
              </div>
            )}
            
            {task.completedAt && (
              <div className="flex items-center space-x-1">
                <ApperIcon name="CheckCircle" size={12} />
                <span>
                  {format(new Date(task.completedAt), 'MMM d')}
                </span>
              </div>
            )}
          </div>
        </div>

        {showActions && !task.completed && (
          <div className="flex items-center space-x-2 ml-4">
            {onStartTimer && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStartTimer()}
                className="text-primary hover:text-primary/80"
              >
                <ApperIcon name="Play" size={14} />
              </Button>
            )}
            
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit()}
                className="text-slate-400 hover:text-slate-300"
              >
                <ApperIcon name="Edit" size={14} />
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete()}
                className="text-red-400 hover:text-red-300"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;