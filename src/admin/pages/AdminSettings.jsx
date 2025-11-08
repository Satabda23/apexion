// src/admin/pages/AdminSettings.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  Settings, 
  Save,
  //  Clock,
    Bell, 
    Shield, 
    Database, 
    Mail, 
    Phone 
  } from 'lucide-react';

const AdminSettings = () => {
  const [clinicSettings, setClinicSettings] = useState({
    clinicName: 'Apexion Dental Clinic',
    doctorName: 'Dr. Deepika Medhi',
    phone: '+91-8296229544',
    email: 'info@apexiondentalclinic.com',
    address: 'New Airport Road, Dharapur, Guwahati, Assam',
    website: 'www.apexiondentalclinic.com'
  });

  // const [workingHours, setWorkingHours] = useState({
  //   monday: { open: '09:00', close: '18:00', closed: false },
  //   tuesday: { open: '09:00', close: '18:00', closed: false },
  //   wednesday: { open: '09:00', close: '18:00', closed: false },
  //   thursday: { open: '09:00', close: '18:00', closed: false },
  //   friday: { open: '09:00', close: '18:00', closed: false },
  //   saturday: { open: '09:00', close: '16:00', closed: false },
  //   sunday: { open: '', close: '', closed: true }
  // });

  const [systemSettings, setSystemSettings] = useState({
    autoConfirmAppointments: true,
    sendSmsReminders: true,
    sendEmailConfirmations: true,
    allowOnlineBooking: true,
    requirePatientVerification: false,
    enableReviewModeration: true,
    appointmentBuffer: 15,
    maxAdvanceBooking: 30,
    cancelationDeadline: 24
  });

  const [notificationSettings, setNotificationSettings] = useState({
    dailyAppointmentSummary: true,
    weeklyReports: false,
    newReviewNotifications: true,
    lowStockAlerts: true,
    systemMaintenanceAlerts: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
    lastBackup: '2025-08-27 11:30 PM'
  });

  const handleClinicSettingsChange = (key, value) => {
    setClinicSettings({ ...clinicSettings, [key]: value });
  };

  // const handleWorkingHoursChange = (day, field, value) => {
  //   setWorkingHours({
  //     ...workingHours,
  //     [day]: { ...workingHours[day], [field]: value }
  //   });
  // };

  const handleSystemSettingsChange = (key, value) => {
    setSystemSettings({ ...systemSettings, [key]: value });
  };

  const handleNotificationSettingsChange = (key, value) => {
    setNotificationSettings({ ...notificationSettings, [key]: value });
  };

  const handleBackupSettingsChange = (key, value) => {
    setBackupSettings({ ...backupSettings, [key]: value });
  };

  const handleSaveSettings = async (settingsType) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${settingsType} settings saved successfully`);
    } catch (error) {
      toast.error(`Failed to save ${settingsType} settings`);
    }
  };

  const handleTestNotification = () => {
    toast.info('Test notification sent successfully');
  };

  const handleRunBackup = async () => {
    try {
      toast.info('Backup started...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      setBackupSettings({
        ...backupSettings,
        lastBackup: new Date().toLocaleString()
      });
      toast.success('Backup completed successfully');
    } catch (error) {
      toast.error('Backup failed');
    }
  };

  // const dayNames = {
  //   monday: 'Monday',
  //   tuesday: 'Tuesday',
  //   wednesday: 'Wednesday',
  //   thursday: 'Thursday',
  //   friday: 'Friday',
  //   saturday: 'Saturday',
  //   sunday: 'Sunday'
  // };

  return (
    <div className="admin-settings">
      <div className="page-header">
        <h1 className="page-title">
          <Settings className="title-icon" />
          Clinic Settings
        </h1>
        <p className="page-description">Configure clinic information and system preferences</p>
      </div>

      {/* Clinic Information */}
      <div className="settings-section">
        <div className="section-header">
          <h3 className="section-title">Clinic Information</h3>
          <div className="section-actions">
            <button
              onClick={() => handleSaveSettings('Clinic')}
              className="action-btn primary-btn"
            >
              <Save className="btn-icon" />
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className="section-content">
          <div className="settings-grid">
            <div className="form-group">
              <label className="form-label">Clinic Name</label>
              <input 
                type="text" 
                className="form-input"
                value={clinicSettings.clinicName}
                onChange={(e) => handleClinicSettingsChange('clinicName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Doctor Name</label>
              <input 
                type="text" 
                className="form-input"
                value={clinicSettings.doctorName}
                onChange={(e) => handleClinicSettingsChange('doctorName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="text" 
                className="form-input"
                value={clinicSettings.phone}
                onChange={(e) => handleClinicSettingsChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input"
                value={clinicSettings.email}
                onChange={(e) => handleClinicSettingsChange('email', e.target.value)}
              />
            </div>
            <div className="form-group full-span">
              <label className="form-label">Address</label>
              <textarea 
                className="form-textarea"
                value={clinicSettings.address}
                onChange={(e) => handleClinicSettingsChange('address', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Working Hours */}
      {/* <div className="settings-section working-hours">
        <div className="section-header">
          <h3 className="section-title">
            <Clock className="section-icon" />
            Working Hours
          </h3>
          <div className="section-actions">
            <button
              onClick={() => handleSaveSettings('Working Hours')}
              className="action-btn primary-btn"
            >
              <Save className="btn-icon" />
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className="section-content">
          <div className="hours-list">
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className="day-row">
                <span className="day-name">{dayNames[day]}</span>
                <div className="day-controls">
                  <label className="closed-toggle">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) => handleWorkingHoursChange(day, 'closed', e.target.checked)}
                      className="toggle-checkbox"
                    />
                    <span className="toggle-label">Closed</span>
                  </label>
                  {!hours.closed && (
                    <div className="time-inputs">
                      <input 
                        type="time" 
                        value={hours.open}
                        onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                        className="time-input"
                      />
                      <span className="time-separator">to</span>
                      <input 
                        type="time" 
                        value={hours.close}
                        onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                        className="time-input"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* System Preferences */}
      <div className="settings-section system-preferences">
        <div className="section-header">
          <h3 className="section-title">
            <Shield className="section-icon" />
            System Preferences
          </h3>
          <div className="section-actions">
            <button
              onClick={() => handleSaveSettings('System')}
              className="action-btn primary-btn"
            >
              <Save className="btn-icon" />
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className="section-content">
          <div className="preferences-grid">
            <div className="preference-group">
              <h4 className="group-title">Appointment Settings</h4>
              <div className="preference-list">
                <label className="preference-item">
                  <span className="preference-label">Auto-confirm appointments</span>
                  <input 
                    type="checkbox" 
                    checked={systemSettings.autoConfirmAppointments}
                    onChange={(e) => handleSystemSettingsChange('autoConfirmAppointments', e.target.checked)}
                    className="preference-checkbox"
                  />
                </label>
                <label className="preference-item">
                  <span className="preference-label">Send SMS reminders</span>
                  <input 
                    type="checkbox" 
                    checked={systemSettings.sendSmsReminders}
                    onChange={(e) => handleSystemSettingsChange('sendSmsReminders', e.target.checked)}
                    className="preference-checkbox"
                  />
                </label>
                <label className="preference-item">
                  <span className="preference-label">Send email confirmations</span>
                  <input 
                    type="checkbox" 
                    checked={systemSettings.sendEmailConfirmations}
                    onChange={(e) => handleSystemSettingsChange('sendEmailConfirmations', e.target.checked)}
                    className="preference-checkbox"
                  />
                </label>
                <label className="preference-item">
                  <span className="preference-label">Allow online booking</span>
                  <input 
                    type="checkbox" 
                    checked={systemSettings.allowOnlineBooking}
                    onChange={(e) => handleSystemSettingsChange('allowOnlineBooking', e.target.checked)}
                    className="preference-checkbox"
                  />
                </label>
              </div>
            </div>
            <div className="preference-group">
              <h4 className="group-title">Advanced Settings</h4>
              <div className="preference-list">
                <div className="preference-input-item">
                  <label className="preference-input-label">Appointment buffer (minutes)</label>
                  <input 
                    type="number" 
                    value={systemSettings.appointmentBuffer}
                    onChange={(e) => handleSystemSettingsChange('appointmentBuffer', parseInt(e.target.value))}
                    className="form-input-small"
                  />
                </div>
                <div className="preference-input-item">
                  <label className="preference-input-label">Max advance booking (days)</label>
                  <input 
                    type="number" 
                    value={systemSettings.maxAdvanceBooking}
                    onChange={(e) => handleSystemSettingsChange('maxAdvanceBooking', parseInt(e.target.value))}
                    className="form-input-small"
                  />
                </div>
                <div className="preference-input-item">
                  <label className="preference-input-label">Cancelation deadline (hours)</label>
                  <input 
                    type="number" 
                    value={systemSettings.cancelationDeadline}
                    onChange={(e) => handleSystemSettingsChange('cancelationDeadline', parseInt(e.target.value))}
                    className="form-input-small"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="settings-section notification-settings">
        <div className="section-header">
          <h3 className="section-title">
            <Bell className="section-icon" />
            Notification Settings
          </h3>
          <div className="section-actions">
            <button
              onClick={handleTestNotification}
              className="action-btn secondary-btn"
            >
              Test
            </button>
            <button
              onClick={() => handleSaveSettings('Notification')}
              className="action-btn primary-btn"
            >
              <Save className="btn-icon" />
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className="section-content">
          <div className="notifications-grid">
            <div className="notification-group">
              <h4 className="group-title">Admin Notifications</h4>
              <div className="notification-list">
                <label className="notification-item">
                  <span className="notification-label">
                    <span className="label-text">Daily appointment summary</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.dailyAppointmentSummary}
                    onChange={(e) => handleNotificationSettingsChange('dailyAppointmentSummary', e.target.checked)}
                    className="notification-checkbox"
                  />
                </label>
                <label className="notification-item">
                  <span className="notification-label">
                    <span className="label-text">Weekly reports</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.weeklyReports}
                    onChange={(e) => handleNotificationSettingsChange('weeklyReports', e.target.checked)}
                    className="notification-checkbox"
                  />
                </label>
                <label className="notification-item">
                  <span className="notification-label">
                    <span className="label-text">New review notifications</span>
                  </span>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.newReviewNotifications}
                    onChange={(e) => handleNotificationSettingsChange('newReviewNotifications', e.target.checked)}
                    className="notification-checkbox"
                  />
                </label>
              </div>
            </div>
            <div className="notification-group">
              <h4 className="group-title">Delivery Methods</h4>
              <div className="notification-list">
                <label className="notification-item">
                  <div className="notification-label">
                    <Mail className="label-icon" />
                    <span className="label-text">Email notifications</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleNotificationSettingsChange('emailNotifications', e.target.checked)}
                    className="notification-checkbox"
                  />
                </label>
                <label className="notification-item">
                  <div className="notification-label">
                    <Phone className="label-icon" />
                    <span className="label-text">SMS notifications</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) => handleNotificationSettingsChange('smsNotifications', e.target.checked)}
                    className="notification-checkbox"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="settings-section backup-settings">
        <div className="section-header">
          <h3 className="section-title">
            <Database className="section-icon" />
            Data Backup
          </h3>
          <div className="section-actions">
            <button
              onClick={handleRunBackup}
              className="action-btn secondary-btn"
            >
              Run Backup Now
            </button>
            <button
              onClick={() => handleSaveSettings('Backup')}
              className="action-btn primary-btn"
            >
              <Save className="btn-icon" />
              <span>Save</span>
            </button>
          </div>
        </div>
        <div className="section-content">
          <div className="backup-grid">
            <div className="backup-group">
              <label className="backup-toggle">
                <span className="toggle-label">Enable automatic backups</span>
                <input 
                  type="checkbox" 
                  checked={backupSettings.autoBackup}
                  onChange={(e) => handleBackupSettingsChange('autoBackup', e.target.checked)}
                  className="toggle-checkbox"
                />
              </label>
              <div className="form-group">
                <label className="form-label">Backup frequency</label>
                <select 
                  value={backupSettings.backupFrequency}
                  onChange={(e) => handleBackupSettingsChange('backupFrequency', e.target.value)}
                  className="form-select"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="backup-group">
              <div className="form-group">
                <label className="form-label">Retention period (days)</label>
                <input 
                  type="number" 
                  value={backupSettings.retentionPeriod}
                  onChange={(e) => handleBackupSettingsChange('retentionPeriod', parseInt(e.target.value))}
                  className="form-input"
                />
              </div>
              <div className="backup-info">
                <label className="info-label">Last backup</label>
                <p className="info-display">
                  {backupSettings.lastBackup}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;