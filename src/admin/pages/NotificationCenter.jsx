// src/admin/pages/NotificationCenter.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import NotificationForm from '../components/NotificationForm';
import { Bell, Phone, Mail, Send, History } from 'lucide-react';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('sms');
  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: 1,
      type: 'SMS',
      recipients: '15 patients',
      subject: 'Appointment Reminder',
      message: 'Dear [Patient Name], this is a reminder for your appointment...',
      sentDate: '2025-08-27 10:30 AM',
      status: 'Sent',
      deliveredCount: 14,
      failedCount: 1
    },
    {
      id: 2,
      type: 'Email',
      recipients: '8 patients',
      subject: 'Monthly Newsletter - Dental Health Tips',
      message: 'Dear Valued Patient, We hope this message finds you in good health...',
      sentDate: '2025-08-26 09:15 AM',
      status: 'Delivered',
      deliveredCount: 8,
      failedCount: 0
    },
    {
      id: 3,
      type: 'SMS',
      recipients: '1 patient',
      subject: 'Appointment Confirmation',
      message: 'Hello [Patient Name], your appointment at Apexion Dental Clinic...',
      sentDate: '2025-08-25 02:45 PM',
      status: 'Sent',
      deliveredCount: 1,
      failedCount: 0
    },
    {
      id: 4,
      type: 'Email',
      recipients: '25 patients',
      subject: 'New Services Available',
      message: 'We are excited to announce new dental services...',
      sentDate: '2025-08-20 11:00 AM',
      status: 'Delivered',
      deliveredCount: 23,
      failedCount: 2
    }
  ]);

  const handleSendNotification = async (notificationData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newNotification = {
        id: notificationHistory.length + 1,
        type: notificationData.type.toUpperCase(),
        recipients: getRecipientsText(notificationData.recipients),
        subject: notificationData.subject || 'SMS Message',
        message: notificationData.message.substring(0, 100) + '...',
        sentDate: new Date().toLocaleString(),
        status: 'Sent',
        deliveredCount: Math.floor(Math.random() * 20) + 10,
        failedCount: Math.floor(Math.random() * 3)
      };

      setNotificationHistory([newNotification, ...notificationHistory]);
      toast.success(`${notificationData.type.toUpperCase()} notification sent successfully`);
    } catch (error) {
      toast.error('Failed to send notification');
    }
  };

  const getRecipientsText = (recipients) => {
    const recipientMap = {
      'all': 'All patients',
      'upcoming': 'Upcoming appointments',
      'overdue': 'Overdue checkups',
      'new': 'New patients',
      'specific': 'Selected patients'
    };
    return recipientMap[recipients] || recipients;
  };

  const getNotificationStats = () => {
    const totalSent = notificationHistory.length;
    const smsSent = notificationHistory.filter(n => n.type === 'SMS').length;
    const emailsSent = notificationHistory.filter(n => n.type === 'Email').length;
    const totalDelivered = notificationHistory.reduce((sum, n) => sum + n.deliveredCount, 0);
    const totalFailed = notificationHistory.reduce((sum, n) => sum + n.failedCount, 0);
    const deliveryRate = totalSent > 0 ? ((totalDelivered / (totalDelivered + totalFailed)) * 100).toFixed(1) : 0;

    return {
      totalSent,
      smsSent,
      emailsSent,
      totalDelivered,
      totalFailed,
      deliveryRate
    };
  };

  const stats = getNotificationStats();

  return (
    <div className="notification-center">
      <div className="page-header">
        <h1 className="page-title">
          <Bell className="title-icon" />
          Notification Center
        </h1>
        <p className="page-description">Send appointment reminders and updates to patients</p>
      </div>

      {/* Notification Statistics */}
      <div className="notification-stats">
        <div className="stat-card">
          <p className="stat-number total">{stats.totalSent}</p>
          <p className="stat-label">Total Sent</p>
        </div>
        <div className="stat-card">
          <p className="stat-number sms">{stats.smsSent}</p>
          <p className="stat-label">SMS Sent</p>
        </div>
        <div className="stat-card">
          <p className="stat-number email">{stats.emailsSent}</p>
          <p className="stat-label">Emails Sent</p>
        </div>
        <div className="stat-card">
          <p className="stat-number delivered">{stats.totalDelivered}</p>
          <p className="stat-label">Delivered</p>
        </div>
        <div className="stat-card">
          <p className="stat-number success-rate">{stats.deliveryRate}%</p>
          <p className="stat-label">Success Rate</p>
        </div>
      </div>

      {/* Notification Type Tabs */}
      <div className="notification-tabs">
        <div className="tabs-nav">
          <nav className="nav-container">
            <button
              onClick={() => setActiveTab('sms')}
              className={`tab-button ${activeTab === 'sms' ? 'active sms-tab' : ''}`}
            >
              <div className="tab-content">
                <Phone className="tab-icon" />
                <span>SMS Notifications</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`tab-button ${activeTab === 'email' ? 'active email-tab' : ''}`}
            >
              <div className="tab-content">
                <Mail className="tab-icon" />
                <span>Email Notifications</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`tab-button ${activeTab === 'history' ? 'active history-tab' : ''}`}
            >
              <div className="tab-content">
                <History className="tab-icon" />
                <span>History</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="tab-content">
          {activeTab === 'sms' && (
            <NotificationForm type="sms" onSend={handleSendNotification} />
          )}
          
          {activeTab === 'email' && (
            <NotificationForm type="email" onSend={handleSendNotification} />
          )}

          {activeTab === 'history' && (
            <div className="history-section">
              <h3 className="history-title">Notification History</h3>
              <div className="history-table-container">
                <table className="history-table">
                  <thead className="table-head">
                    <tr>
                      <th className="header-cell">Type</th>
                      <th className="header-cell">Recipients</th>
                      <th className="header-cell">Subject/Message</th>
                      <th className="header-cell">Sent Date</th>
                      <th className="header-cell">Delivery</th>
                      <th className="header-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {notificationHistory.map((notification) => (
                      <tr key={notification.id} className="table-row">
                        <td className="table-cell type-cell">
                          <span className={`type-badge ${notification.type === 'SMS' ? 'sms-badge' : 'email-badge'}`}>
                            {notification.type === 'SMS' ? (
                              <Phone className="badge-icon" />
                            ) : (
                              <Mail className="badge-icon" />
                            )}
                            {notification.type}
                          </span>
                        </td>
                        <td className="table-cell recipients-cell">
                          {notification.recipients}
                        </td>
                        <td className="table-cell subject-cell">
                          <div className="subject-title">
                            {notification.subject}
                          </div>
                          <div className="message-preview">
                            {notification.message}
                          </div>
                        </td>
                        <td className="table-cell date-cell">
                          {notification.sentDate}
                        </td>
                        <td className="table-cell delivery-cell">
                          <div className="delivery-stats">
                            <span className="delivered-count">✓ {notification.deliveredCount}</span>
                            {notification.failedCount > 0 && (
                              <span className="failed-count">✗ {notification.failedCount}</span>
                            )}
                          </div>
                        </td>
                        <td className="table-cell status-cell">
                          <span className={`status-badge ${
                            notification.status === 'Sent' || notification.status === 'Delivered'
                              ? 'success-status'
                              : 'pending-status'
                          }`}>
                            {notification.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;