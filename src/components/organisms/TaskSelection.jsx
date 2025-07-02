import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const TaskSelection = ({ tasks, selectedTask, onTaskSelect }) => {
  if (tasks.length === 0) {
    return (
      <div className="card p-6">
        <Empty
          title="No tasks available"
          description="Create some tasks to use the focus timer"
          actionText="Go to Tasks"
          onAction={() => {/* Navigate to tasks */}}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-display font-semibold text-slate-100 text-center">
        Select a Task to Focus On
      </h3>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.map((task, index) => {
          const isSelected = selectedTask?.Id === task.Id;
          
          return (
            <motion.button
              key={task.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onTaskSelect(task)}
              className={`
                w-full card p-4 border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-primary bg-primary/10' 
                  : 'border-slate-700 hover:border-slate-600'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-3 h-3 rounded-full
                  ${task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }
                `} />
                
                <div className="flex-1">
                  <h4 className="font-medium text-slate-100">
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <ApperIcon name="Clock" size={14} />
                  <span>{task.effortHours}h</span>
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

export default TaskSelection;