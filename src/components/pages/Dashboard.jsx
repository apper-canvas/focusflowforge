import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import AISuggestionsCard from '@/components/organisms/AISuggestionsCard';
import ActiveTimerWidget from '@/components/organisms/ActiveTimerWidget';
import TaskList from '@/components/organisms/TaskList';
import ProgressStats from '@/components/organisms/ProgressStats';
import QuickActions from '@/components/organisms/QuickActions';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { taskService } from '@/services/api/taskService';
import { timerService } from '@/services/api/timerService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  const [dailyStats, setDailyStats] = useState({
    completed: 0,
    total: 0,
    focusTime: 0,
    streak: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadActiveTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [allTasks, activeTimerData, suggestions] = await Promise.all([
        taskService.getAll(),
        timerService.getActiveTimer(),
        taskService.getDailySuggestions()
      ]);
      
      setTasks(allTasks);
      setActiveTimer(activeTimerData);
      setSuggestedTasks(suggestions);
      
      // Calculate daily stats
      const today = format(new Date(), 'yyyy-MM-dd');
      const todayTasks = allTasks.filter(task => 
        task.completedAt && format(new Date(task.completedAt), 'yyyy-MM-dd') === today
      );
      
      const completedToday = todayTasks.length;
      const totalToday = allTasks.filter(task => 
        !task.completed || format(new Date(task.completedAt), 'yyyy-MM-dd') === today
      ).length;
      
      const focusTime = todayTasks.reduce((acc, task) => acc + (task.actualMinutes || 0), 0);
      
      setDailyStats({
        completed: completedToday,
        total: totalToday,
        focusTime,
        streak: calculateStreak(allTasks)
      });
      
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadActiveTimer = async () => {
    try {
      const activeTimerData = await timerService.getActiveTimer();
      setActiveTimer(activeTimerData);
    } catch (err) {
      console.error('Error loading active timer:', err);
    }
  };

  const calculateStreak = (tasks) => {
    const completedTasks = tasks.filter(task => task.completed).sort((a, b) => 
      new Date(b.completedAt) - new Date(a.completedAt)
    );
    
    let streak = 0;
    let currentDate = new Date();
    
    for (const task of completedTasks) {
      const taskDate = new Date(task.completedAt);
      const daysDiff = Math.floor((currentDate - taskDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const handleTaskComplete = async (taskId) => {
    try {
      await taskService.update(taskId, { 
        completed: true, 
        completedAt: new Date().toISOString() 
      });
      
      setTasks(prev => prev.map(task => 
        task.Id === taskId 
          ? { ...task, completed: true, completedAt: new Date().toISOString() }
          : task
      ));
      
      toast.success('Task completed! 🎉');
      loadDashboardData(); // Refresh stats
    } catch (err) {
      console.error('Error completing task:', err);
      toast.error('Failed to complete task');
    }
  };

  const handleStartTimer = async (taskId, duration) => {
    try {
      const session = await timerService.startTimer(taskId, duration);
      setActiveTimer(session);
      toast.success('Focus session started!');
    } catch (err) {
      console.error('Error starting timer:', err);
      toast.error('Failed to start timer');
    }
  };

  const handleTimerComplete = () => {
    setActiveTimer(null);
    loadDashboardData(); // Refresh data after timer completion
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const todayTasks = tasks.filter(task => !task.completed);
  const recentlyCompleted = tasks.filter(task => task.completed).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-6">
        {/* Progress Stats */}
        <ProgressStats stats={dailyStats} />

        {/* Active Timer Widget */}
        {activeTimer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <ActiveTimerWidget 
              timer={activeTimer} 
              onComplete={handleTimerComplete}
            />
          </motion.div>
        )}

        {/* AI Suggestions */}
        <AISuggestionsCard 
          suggestions={suggestedTasks} 
          onStartTimer={handleStartTimer}
        />

        {/* Quick Actions */}
        <QuickActions />

        {/* Today's Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-slate-100">
              Today's Tasks
            </h2>
            <span className="text-sm text-slate-400">
              {todayTasks.length} remaining
            </span>
          </div>
          
          {todayTasks.length === 0 ? (
            <Empty 
              title="All tasks completed!"
              description="Great job! You've completed all your tasks for today."
              actionText="Add New Task"
              onAction={() => {/* Navigate to tasks */}}
            />
          ) : (
            <TaskList 
              tasks={todayTasks.slice(0, 5)} 
              onTaskComplete={handleTaskComplete}
              onStartTimer={handleStartTimer}
              showActions={true}
            />
          )}
        </div>

        {/* Recently Completed */}
        {recentlyCompleted.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-slate-100">
              Recently Completed
            </h2>
            <TaskList 
              tasks={recentlyCompleted} 
              onTaskComplete={handleTaskComplete}
              showActions={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;