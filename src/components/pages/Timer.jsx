import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TimerDisplay from '@/components/organisms/TimerDisplay';
import TimerControls from '@/components/organisms/TimerControls';
import TimerPresets from '@/components/organisms/TimerPresets';
import TaskSelection from '@/components/organisms/TaskSelection';
import TimerStats from '@/components/organisms/TimerStats';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { timerService } from '@/services/api/timerService';
import { taskService } from '@/services/api/taskService';

const Timer = () => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [timerDuration, setTimerDuration] = useState(25 * 60); // 25 minutes default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timerStats, setTimerStats] = useState({
    sessionsToday: 0,
    totalMinutes: 0,
    averageSession: 0
  });

  useEffect(() => {
    loadTimerData();
    const interval = setInterval(loadActiveTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadTimerData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [activeTimerData, tasksData, stats] = await Promise.all([
        timerService.getActiveTimer(),
        taskService.getAll(),
        timerService.getTodayStats()
      ]);
      
      setActiveTimer(activeTimerData);
      setTasks(tasksData.filter(task => !task.completed));
      setTimerStats(stats);
      
      // If there's an active timer, set the selected task
      if (activeTimerData) {
        const task = tasksData.find(t => t.Id === activeTimerData.taskId);
        setSelectedTask(task);
      }
      
    } catch (err) {
      console.error('Error loading timer data:', err);
      setError('Failed to load timer data. Please try again.');
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

  const handleStartTimer = async () => {
    try {
      if (!selectedTask) {
        toast.error('Please select a task first');
        return;
      }

      const session = await timerService.startTimer(selectedTask.Id, timerDuration);
      setActiveTimer(session);
      toast.success('Focus session started! 🎯');
    } catch (err) {
      console.error('Error starting timer:', err);
      toast.error('Failed to start timer');
    }
  };

  const handlePauseTimer = async () => {
    try {
      if (!activeTimer) return;
      
      const updatedTimer = await timerService.pauseTimer(activeTimer.Id);
      setActiveTimer(updatedTimer);
      toast.info('Timer paused');
    } catch (err) {
      console.error('Error pausing timer:', err);
      toast.error('Failed to pause timer');
    }
  };

  const handleResumeTimer = async () => {
    try {
      if (!activeTimer) return;
      
      const updatedTimer = await timerService.resumeTimer(activeTimer.Id);
      setActiveTimer(updatedTimer);
      toast.success('Timer resumed');
    } catch (err) {
      console.error('Error resuming timer:', err);
      toast.error('Failed to resume timer');
    }
  };

  const handleStopTimer = async () => {
    try {
      if (!activeTimer) return;
      
      await timerService.stopTimer(activeTimer.Id);
      setActiveTimer(null);
      setSelectedTask(null);
      toast.info('Timer stopped');
      loadTimerData(); // Refresh stats
    } catch (err) {
      console.error('Error stopping timer:', err);
      toast.error('Failed to stop timer');
    }
  };

  const handleCompleteTimer = async () => {
    try {
      if (!activeTimer) return;
      
      await timerService.completeTimer(activeTimer.Id);
      
      // Update task with actual time spent
      if (selectedTask) {
        const actualMinutes = Math.floor(activeTimer.duration / 60);
        await taskService.update(selectedTask.Id, {
          actualMinutes: (selectedTask.actualMinutes || 0) + actualMinutes
        });
      }
      
      setActiveTimer(null);
      setSelectedTask(null);
      toast.success('🎉 Focus session completed! Great work!');
      loadTimerData(); // Refresh data
    } catch (err) {
      console.error('Error completing timer:', err);
      toast.error('Failed to complete timer');
    }
  };

  const handlePresetSelect = (minutes) => {
    if (!activeTimer) {
      setTimerDuration(minutes * 60);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTimerData} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-8">
        {/* Timer Stats */}
        <TimerStats stats={timerStats} />

        {/* Timer Display */}
        <div className="flex justify-center">
          <TimerDisplay 
            timer={activeTimer}
            duration={timerDuration}
            onComplete={handleCompleteTimer}
          />
        </div>

        {/* Selected Task */}
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 text-center"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                selectedTask.priority === 'high' ? 'bg-red-500' :
                selectedTask.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <h3 className="text-lg font-medium text-slate-100">
                {selectedTask.title}
              </h3>
            </div>
            {selectedTask.description && (
              <p className="text-slate-400 mt-2 text-sm">
                {selectedTask.description}
              </p>
            )}
          </motion.div>
        )}

        {/* Timer Presets */}
        {!activeTimer && (
          <TimerPresets 
            onPresetSelect={handlePresetSelect}
            selectedDuration={timerDuration}
          />
        )}

        {/* Timer Controls */}
        <TimerControls
          isActive={!!activeTimer}
          isPaused={activeTimer?.paused || false}
          onStart={handleStartTimer}
          onPause={handlePauseTimer}
          onResume={handleResumeTimer}
          onStop={handleStopTimer}
          disabled={!selectedTask && !activeTimer}
        />

        {/* Task Selection */}
        {!activeTimer && (
          <TaskSelection
            tasks={tasks}
            selectedTask={selectedTask}
            onTaskSelect={setSelectedTask}
          />
        )}
      </div>
    </div>
  );
};

export default Timer;