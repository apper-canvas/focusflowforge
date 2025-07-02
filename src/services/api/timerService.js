import mockSessions from '@/services/mockData/sessions.json';

class TimerService {
  constructor() {
    this.sessions = [...mockSessions];
    this.activeTimer = null;
  }

  delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getActiveTimer() {
    await this.delay();
    return this.activeTimer ? { ...this.activeTimer } : null;
  }

  async startTimer(taskId, duration) {
    await this.delay();
    
    const newSession = {
      Id: Math.max(...this.sessions.map(s => s.Id), 0) + 1,
      taskId: parseInt(taskId),
      duration: duration,
      startTime: new Date().toISOString(),
      endTime: null,
      completed: false,
      paused: false
    };
    
    this.sessions.push(newSession);
    this.activeTimer = newSession;
    
    return { ...newSession };
  }

  async pauseTimer(sessionId) {
    await this.delay();
    
    if (this.activeTimer && this.activeTimer.Id === parseInt(sessionId)) {
      this.activeTimer.paused = true;
      const sessionIndex = this.sessions.findIndex(s => s.Id === parseInt(sessionId));
      if (sessionIndex !== -1) {
        this.sessions[sessionIndex].paused = true;
      }
    }
    
    return this.activeTimer ? { ...this.activeTimer } : null;
  }

  async resumeTimer(sessionId) {
    await this.delay();
    
    if (this.activeTimer && this.activeTimer.Id === parseInt(sessionId)) {
      this.activeTimer.paused = false;
      const sessionIndex = this.sessions.findIndex(s => s.Id === parseInt(sessionId));
      if (sessionIndex !== -1) {
        this.sessions[sessionIndex].paused = false;
      }
    }
    
    return this.activeTimer ? { ...this.activeTimer } : null;
  }

  async stopTimer(sessionId) {
    await this.delay();
    
    if (this.activeTimer && this.activeTimer.Id === parseInt(sessionId)) {
      const sessionIndex = this.sessions.findIndex(s => s.Id === parseInt(sessionId));
      if (sessionIndex !== -1) {
        this.sessions[sessionIndex].endTime = new Date().toISOString();
      }
      this.activeTimer = null;
    }
    
    return true;
  }

  async completeTimer(sessionId) {
    await this.delay();
    
    if (this.activeTimer && this.activeTimer.Id === parseInt(sessionId)) {
      const sessionIndex = this.sessions.findIndex(s => s.Id === parseInt(sessionId));
      if (sessionIndex !== -1) {
        this.sessions[sessionIndex].endTime = new Date().toISOString();
        this.sessions[sessionIndex].completed = true;
      }
      this.activeTimer = null;
    }
    
    return true;
  }

  async getTodayStats() {
    await this.delay();
    
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = this.sessions.filter(session => {
      const sessionDate = new Date(session.startTime).toISOString().split('T')[0];
      return sessionDate === today && session.completed;
    });
    
    const totalMinutes = todaySessions.reduce((acc, session) => {
      const duration = Math.floor(session.duration / 60);
      return acc + duration;
    }, 0);
    
    const averageSession = todaySessions.length > 0 
      ? Math.round(totalMinutes / todaySessions.length) 
      : 0;
    
    return {
      sessionsToday: todaySessions.length,
      totalMinutes,
      averageSession
    };
  }

  async getAllSessions() {
    await this.delay();
    return [...this.sessions];
  }
}

export const timerService = new TimerService();