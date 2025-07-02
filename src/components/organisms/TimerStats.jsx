import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StatCard from '@/components/molecules/StatCard';

const TimerStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Sessions',
      value: stats.sessionsToday,
      subtitle: 'today',
      icon: 'Timer',
      color: 'primary'
    },
    {
      label: 'Focus Time',
      value: `${stats.totalMinutes}m`,
      subtitle: 'total today',
      icon: 'Clock',
      color: 'success'
    },
    {
      label: 'Average',
      value: `${stats.averageSession}m`,
      subtitle: 'per session',
      icon: 'TrendingUp',
      color: 'warning'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} size="sm" />
        </motion.div>
      ))}
    </div>
  );
};

export default TimerStats;