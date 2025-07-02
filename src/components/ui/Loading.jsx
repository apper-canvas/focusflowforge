import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="px-4 py-6 space-y-6 w-full max-w-md">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="shimmer h-8 bg-slate-700 rounded-lg" />
          <div className="shimmer h-4 bg-slate-700 rounded w-3/4" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="shimmer w-8 h-8 bg-slate-700 rounded-lg" />
                <div className="shimmer h-6 w-12 bg-slate-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="shimmer h-3 bg-slate-700 rounded w-16" />
                <div className="shimmer h-2 bg-slate-700 rounded w-12" />
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions skeleton */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="shimmer w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg" />
              <div className="shimmer h-5 w-32 bg-slate-700 rounded" />
            </div>
            <div className="shimmer h-4 w-20 bg-slate-700 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="shimmer h-6 bg-slate-700 rounded w-3/4" />
            <div className="shimmer h-4 bg-slate-700 rounded w-full" />
            <div className="shimmer h-4 bg-slate-700 rounded w-1/2" />
          </div>
        </div>

        {/* Task list skeleton */}
        <div className="space-y-3">
          <div className="shimmer h-5 bg-slate-700 rounded w-32" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="shimmer w-4 h-4 bg-slate-700 rounded-full" />
                <div className="shimmer h-4 bg-slate-700 rounded w-1/2" />
              </div>
              <div className="shimmer h-3 bg-slate-700 rounded w-full" />
              <div className="flex items-center space-x-4">
                <div className="shimmer h-6 w-16 bg-slate-700 rounded-full" />
                <div className="shimmer h-4 w-10 bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center py-8">
          <motion.div
            className="w-8 h-8 border-4 border-slate-700 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;