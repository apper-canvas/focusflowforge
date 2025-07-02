import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const location = useLocation();

const navItems = [
    { path: '/', icon: 'Home', label: 'Dashboard' },
    { path: '/tasks', icon: 'CheckSquare', label: 'Tasks' },
    { path: '/timer', icon: 'Timer', label: 'Timer' },
    { path: '/settings', icon: 'Settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-slate-700 px-4 py-2 backdrop-blur-sm z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="nav-tab relative"
            >
              <motion.div
                className="flex flex-col items-center justify-center py-2 px-3 min-w-[64px]"
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="relative">
                  <ApperIcon 
                    name={item.icon} 
                    size={24} 
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-slate-400'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 bg-primary/20 rounded-lg -z-10"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`text-xs mt-1 transition-colors duration-200 ${
                  isActive ? 'text-primary font-medium' : 'text-slate-400'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;