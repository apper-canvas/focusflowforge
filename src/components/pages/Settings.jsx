import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { settingsService } from '@/services/api/settingsService';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const userSettings = await settingsService.getSettings();
      setSettings(userSettings);
    } catch (err) {
      setError('Failed to load settings');
      console.error('Settings load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (category, key, value) => {
    try {
      setSaving(true);
      const updatedSettings = {
        ...settings,
        [category]: {
          ...settings[category],
          [key]: value
        }
      };
      
      await settingsService.updateSettings(updatedSettings);
      setSettings(updatedSettings);
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error('Failed to update settings');
      console.error('Settings update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = async () => {
    if (!confirm('Are you sure you want to reset all settings to default?')) {
      return;
    }

    try {
      setSaving(true);
      await settingsService.resetSettings();
      const defaultSettings = await settingsService.getSettings();
      setSettings(defaultSettings);
      toast.success('Settings reset to default');
    } catch (err) {
      toast.error('Failed to reset settings');
      console.error('Settings reset error:', err);
    } finally {
      setSaving(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <button
      type="button"
      className={`settings-toggle ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      data-enabled={enabled}
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
    >
      <span className="settings-toggle-thumb" />
    </button>
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadSettings} />;
  if (!settings) return <Error message="Settings not available" onRetry={loadSettings} />;

  return (
    <div className="p-4 pb-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Customize your app experience</p>
        </div>

        {/* Theme Settings */}
        <div className="settings-section">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="Palette" size={20} className="text-primary" />
            Theme & Appearance
          </h2>
          
          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Theme</label>
              <p className="settings-description">Choose your preferred color scheme</p>
            </div>
            <Select
              value={settings.theme.mode}
              onChange={(value) => updateSetting('theme', 'mode', value)}
              className="settings-select min-w-[120px]"
              disabled={saving}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </Select>
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Reduced Motion</label>
              <p className="settings-description">Minimize animations and transitions</p>
            </div>
            <ToggleSwitch
              enabled={settings.theme.reducedMotion}
              onChange={(value) => updateSetting('theme', 'reducedMotion', value)}
              disabled={saving}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="Bell" size={20} className="text-primary" />
            Notifications
          </h2>
          
          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Push Notifications</label>
              <p className="settings-description">Receive notifications for important updates</p>
            </div>
            <ToggleSwitch
              enabled={settings.notifications.enabled}
              onChange={(value) => updateSetting('notifications', 'enabled', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Timer Alerts</label>
              <p className="settings-description">Get notified when timers complete</p>
            </div>
            <ToggleSwitch
              enabled={settings.notifications.timerAlerts}
              onChange={(value) => updateSetting('notifications', 'timerAlerts', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Task Reminders</label>
              <p className="settings-description">Receive reminders for upcoming tasks</p>
            </div>
            <ToggleSwitch
              enabled={settings.notifications.taskReminders}
              onChange={(value) => updateSetting('notifications', 'taskReminders', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Sound</label>
              <p className="settings-description">Play notification sounds</p>
            </div>
            <ToggleSwitch
              enabled={settings.notifications.sound}
              onChange={(value) => updateSetting('notifications', 'sound', value)}
              disabled={saving}
            />
          </div>
        </div>

        {/* Timer Settings */}
        <div className="settings-section">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="Timer" size={20} className="text-primary" />
            Timer Preferences
          </h2>
          
          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Default Focus Duration</label>
              <p className="settings-description">Default timer length for focus sessions</p>
            </div>
            <Select
              value={settings.timer.defaultFocusDuration}
              onChange={(value) => updateSetting('timer', 'defaultFocusDuration', parseInt(value))}
              className="settings-select min-w-[100px]"
              disabled={saving}
            >
              <option value="15">15 min</option>
              <option value="25">25 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
            </Select>
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Auto-start Breaks</label>
              <p className="settings-description">Automatically start break timers</p>
            </div>
            <ToggleSwitch
              enabled={settings.timer.autoStartBreaks}
              onChange={(value) => updateSetting('timer', 'autoStartBreaks', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Auto-start Next Session</label>
              <p className="settings-description">Automatically start the next focus session after breaks</p>
            </div>
            <ToggleSwitch
              enabled={settings.timer.autoStartNextSession}
              onChange={(value) => updateSetting('timer', 'autoStartNextSession', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Long Break Interval</label>
              <p className="settings-description">Number of sessions before a long break</p>
            </div>
            <Select
              value={settings.timer.longBreakInterval}
              onChange={(value) => updateSetting('timer', 'longBreakInterval', parseInt(value))}
              className="settings-select min-w-[80px]"
              disabled={saving}
            >
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Select>
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="settings-section">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="Accessibility" size={20} className="text-primary" />
            Accessibility
          </h2>
          
          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">High Contrast</label>
              <p className="settings-description">Increase contrast for better visibility</p>
            </div>
            <ToggleSwitch
              enabled={settings.accessibility.highContrast}
              onChange={(value) => updateSetting('accessibility', 'highContrast', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Large Text</label>
              <p className="settings-description">Increase text size throughout the app</p>
            </div>
            <ToggleSwitch
              enabled={settings.accessibility.largeText}
              onChange={(value) => updateSetting('accessibility', 'largeText', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Screen Reader Support</label>
              <p className="settings-description">Enhanced support for screen readers</p>
            </div>
            <ToggleSwitch
              enabled={settings.accessibility.screenReader}
              onChange={(value) => updateSetting('accessibility', 'screenReader', value)}
              disabled={saving}
            />
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="settings-section">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="Shield" size={20} className="text-primary" />
            Data & Privacy
          </h2>
          
          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Analytics</label>
              <p className="settings-description">Help improve the app by sharing usage data</p>
            </div>
            <ToggleSwitch
              enabled={settings.privacy.analytics}
              onChange={(value) => updateSetting('privacy', 'analytics', value)}
              disabled={saving}
            />
          </div>

          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Crash Reports</label>
              <p className="settings-description">Automatically send crash reports to help fix issues</p>
            </div>
            <ToggleSwitch
              enabled={settings.privacy.crashReports}
              onChange={(value) => updateSetting('privacy', 'crashReports', value)}
              disabled={saving}
            />
          </div>
        </div>

        {/* Reset Section */}
        <div className="settings-section border-red-500/30">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="RotateCcw" size={20} className="text-red-400" />
            Reset Settings
          </h2>
          
          <div className="settings-item">
            <div className="flex-1">
              <label className="text-slate-200 font-medium">Reset to Defaults</label>
              <p className="settings-description">This will reset all settings to their default values</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              disabled={saving}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              {saving ? (
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
              ) : (
                'Reset'
              )}
            </Button>
          </div>
        </div>

        {/* App Info */}
        <div className="settings-section">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ApperIcon name="Info" size={20} className="text-primary" />
            About
          </h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">App Version</span>
              <span className="text-slate-200">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Updated</span>
              <span className="text-slate-200">Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Storage Used</span>
              <span className="text-slate-200">~2.1 MB</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;