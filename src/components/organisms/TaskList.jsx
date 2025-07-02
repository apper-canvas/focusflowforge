import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';

const TaskList = ({ 
  tasks, 
  onTaskComplete, 
  onTaskEdit, 
  onTaskDelete, 
  onStartTimer,
  showActions = true 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            variants={itemVariants}
            exit={{ opacity: 0, x: -100 }}
            layout
          >
            <TaskCard
              task={task}
              onComplete={() => onTaskComplete(task.Id)}
              onEdit={() => onTaskEdit && onTaskEdit(task)}
              onDelete={() => onTaskDelete && onTaskDelete(task.Id)}
              onStartTimer={() => onStartTimer && onStartTimer(task.Id, 25 * 60)}
              showActions={showActions}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;