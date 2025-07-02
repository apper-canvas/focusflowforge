import mockTasks from '@/services/mockData/tasks.json';

class TaskService {
  constructor() {
    this.tasks = [...mockTasks];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) throw new Error('Task not found');
    return { ...task };
  }

  async create(taskData) {
    await this.delay();
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      effortHours: taskData.effortHours || 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      actualMinutes: 0
    };
    
    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, updateData) {
    await this.delay();
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) throw new Error('Task not found');
    
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateData };
    return { ...this.tasks[taskIndex] };
  }

  async delete(id) {
    await this.delay();
    const taskIndex = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (taskIndex === -1) throw new Error('Task not found');
    
    this.tasks.splice(taskIndex, 1);
    return true;
  }

  async getDailySuggestions() {
    await this.delay();
    
    // AI simulation: prioritize high priority tasks with lower effort
    const incompleteTasks = this.tasks.filter(task => !task.completed);
    
    if (incompleteTasks.length === 0) return [];
    
    // Sort by priority and effort for AI suggestions
    const suggestions = incompleteTasks.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityWeight[a.priority] || 1;
      const bPriority = priorityWeight[b.priority] || 1;
      
      // Higher priority first, then lower effort
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      return a.effortHours - b.effortHours;
    });
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
  }
}

export const taskService = new TaskService();