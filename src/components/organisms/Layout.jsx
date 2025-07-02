import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import BottomNavigation from '@/components/organisms/BottomNavigation';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden pb-20">
        <div className="h-full">
          {children}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;