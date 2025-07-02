import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'focusflow_settings';

// Default settings configuration
const defaultSettings = {
  Id: 1,
  userId: 'user_1',
  theme: {
    mode: 'dark', // 'dark', 'light', 'auto'
    reducedMotion: false
  },
  notifications: {
    enabled: true,
    timerAlerts: true,
    taskReminders: true,
    sound: true
  },
  timer: {
    defaultFocusDuration: 25, // minutes
    autoStartBreaks: false,
    autoStartNextSession: false,
    longBreakInterval: 4 // number of sessions before long break
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    screenReader: false
  },
  privacy: {
    analytics: true,
    crashReports: true
  },
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString()
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const settingsService = {
  // Get user settings
  async getSettings() {
    await delay(200);
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        // Ensure all default properties exist (for backward compatibility)
        return {
          ...defaultSettings,
          ...settings,
          theme: { ...defaultSettings.theme, ...settings.theme },
          notifications: { ...defaultSettings.notifications, ...settings.notifications },
          timer: { ...defaultSettings.timer, ...settings.timer },
          accessibility: { ...defaultSettings.accessibility, ...settings.accessibility },
          privacy: { ...defaultSettings.privacy, ...settings.privacy }
        };
      }
      
      // First time - save defaults
      const initialSettings = { ...defaultSettings };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSettings));
      return initialSettings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return { ...defaultSettings };
    }
  },

  // Update settings
  async updateSettings(settingsData) {
    await delay(300);
    
    try {
      const updatedSettings = {
        ...settingsData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      return { ...updatedSettings };
    } catch (error) {
      console.error('Error updating settings:', error);
      throw new Error('Failed to update settings');
    }
  },

  // Reset settings to default
  async resetSettings() {
    await delay(250);
    
    try {
      const resetSettings = {
        ...defaultSettings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetSettings));
      return { ...resetSettings };
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw new Error('Failed to reset settings');
    }
  },

  // Get specific setting value
  async getSetting(category, key) {
    const settings = await this.getSettings();
    return settings[category]?.[key];
  },

  // Update specific setting
  async updateSetting(category, key, value) {
    const settings = await this.getSettings();
    const updatedSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    
    return this.updateSettings(updatedSettings);
  },

  // Clear all settings data
  async clearSettings() {
    await delay(200);
    
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing settings:', error);
      throw new Error('Failed to clear settings');
    }
  },

  // Export settings for backup
  async exportSettings() {
    const settings = await this.getSettings();
    return {
      ...settings,
      exportedAt: new Date().toISOString()
    };
  },

  // Import settings from backup
  async importSettings(settingsData) {
    await delay(300);
    
    try {
      // Validate and merge with defaults
      const importedSettings = {
        ...defaultSettings,
        ...settingsData,
        Id: settingsData.Id || defaultSettings.Id,
        importedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return this.updateSettings(importedSettings);
    } catch (error) {
      console.error('Error importing settings:', error);
      throw new Error('Failed to import settings');
    }
  }
};

export default settingsService;