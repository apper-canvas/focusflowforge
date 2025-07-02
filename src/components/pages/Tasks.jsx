import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskList from '@/components/organisms/TaskList';
import TaskModal from '@/components/organisms/TaskModal';
import TaskFilters from '@/components/organisms/TaskFilters';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import FloatingActionButton from '@/components/atoms/FloatingActionButton';
import { taskService } from '@/services/api/taskService';
import ApperIcon from '@/components/ApperIcon';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all', // all, completed, pending
    priority: 'all', // all, high, medium, low
    sortBy: 'priority' // priority, created, title
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    // Status filter
    if (filters.status === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filters.status === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Sort
    filtered.sort((a, b) => {
switch (filters.sortBy) {
        case 'priority': {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowModal(false);
      toast.success('Task created successfully!');
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.update(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      setShowModal(false);
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, { 
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));
      
      toast.success(updatedTask.completed ? 'Task completed! 🎉' : 'Task reopened');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-6">
        {/* Stats Header */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold gradient-text">
                Your Tasks
              </h2>
              <p className="text-slate-400 mt-1">
                {completedCount} of {totalCount} completed
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-100">
                    {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFiltersChange={setFilters} />

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Empty 
              title={tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
              description={tasks.length === 0 ? 
                "Create your first task to get started with FocusFlow!" : 
                "Try adjusting your filters or create a new task."
              }
              actionText="Create Task"
              onAction={() => setShowModal(true)}
            />
          ) : (
            <TaskList 
              tasks={filteredTasks}
              onTaskComplete={handleTaskComplete}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
              showActions={true}
            />
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => setShowModal(true)}
        icon="Plus"
        className="fixed bottom-24 right-4 z-40"
      />

      {/* Task Modal */}
      <AnimatePresence>
        {showModal && (
          <TaskModal
            task={editingTask}
            onSave={editingTask ? 
              (data) => handleUpdateTask(editingTask.Id, data) : 
              handleCreateTask
            }
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;