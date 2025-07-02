import React from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Today';
      case '/tasks':
        return 'Tasks';
      case '/timer':
        return 'Focus Timer';
      default:
        return 'FocusFlow';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="bg-background border-b border-slate-800 px-4 py-4 sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold gradient-text">
            {getPageTitle()}
          </h1>
          {location.pathname === '/' && (
            <p className="text-slate-400 text-sm mt-1">
              {getGreeting()}, {format(new Date(), 'EEEE, MMMM d')}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg bg-surface hover:bg-slate-700 transition-colors duration-200">
            <ApperIcon name="Search" size={20} className="text-slate-400" />
          </button>
          <button className="p-2 rounded-lg bg-surface hover:bg-slate-700 transition-colors duration-200">
            <ApperIcon name="Settings" size={20} className="text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;