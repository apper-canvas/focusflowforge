import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StatCard from '@/components/molecules/StatCard';

const ProgressStats = ({ stats }) => {
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const focusHours = Math.floor(stats.focusTime / 60);
  const focusMinutes = stats.focusTime % 60;

  const statItems = [
    {
      label: 'Completed',
      value: stats.completed,
      subtitle: `of ${stats.total} tasks`,
      icon: 'CheckCircle',
      color: 'success',
      progress: completionRate
    },
    {
      label: 'Focus Time',
      value: focusHours > 0 ? `${focusHours}h ${focusMinutes}m` : `${focusMinutes}m`,
      subtitle: 'today',
      icon: 'Clock',
      color: 'primary'
    },
    {
      label: 'Streak',
      value: stats.streak,
      subtitle: 'days',
      icon: 'Flame',
      color: 'warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressStats;