// src/admin/components/NotificationForm.jsx
import React, { useState } from 'react';
import { Send, Phone, Mail, Users } from 'lucide-react';

const NotificationForm = ({ type = 'sms', onSend }) => {
  const [formData, setFormData] = useState({
    recipients: '',
    subject: '',
    message: '',
    template: ''
  });
  const [loading, setLoading] = useState(false);

  const smsTemplates = [
    { 
      id: 'reminder', 
      name: 'Appointment Reminder', 
      content: 'Dear [Patient Name], this is a reminder for your appointment at Apexion Dental Clinic on [Date] at [Time]. Please arrive 15 minutes early. Call 8296229544 for any changes.'
    },
    { 
      id: 'confirmation', 
      name: 'Appointment Confirmation', 
      content: 'Hello [Patient Name], your appointment at Apexion Dental Clinic is confirmed for [Date] at [Time]. We look forward to seeing you!'
    },
    { 
      id: 'followup', 
      name: 'Post-Treatment Follow-up', 
      content: 'Hi [Patient Name], we hope you\'re feeling better after your treatment. Please contact us at 8296229544 if you have any concerns.'
    },
    { 
      id: 'custom', 
      name: 'Custom Message', 
      content: ''
    }
  ];

  const emailTemplates = [
    { 
      id: 'appointment', 
      name: 'Appointment Confirmation',
      subject: 'Appointment Confirmation - Apexion Dental Clinic',
      content: 'Dear [Patient Name],\n\nYour appointment has been confirmed for [Date] at [Time].\n\nLocation: New Airport Road, Dharapur, Guwahati\nPhone: 8296229544\n\nBest regards,\nDr. Deepika Medhi\nApexion Dental Clinic'
    },
    { 
      id: 'reminder', 
      name: 'Appointment Reminder',
      subject: 'Appointment Reminder - Tomorrow',
      content: 'Dear [Patient Name],\n\nThis is a friendly reminder about your appointment tomorrow at [Time].\n\nPlease arrive 15 minutes early and bring any relevant medical documents.\n\nThank you,\nApexion Dental Clinic'
    },
    { 
      id: 'newsletter', 
      name: 'Monthly Newsletter',
      subject: 'Monthly Dental Health Tips',
      content: 'Dear Valued Patient,\n\nWe hope this message finds you in good health. Here are some dental care tips for this month...'
    },
    { 
      id: 'custom', 
      name: 'Custom Email', 
      subject: '',
      content: ''
    }
  ];

  const templates = type === 'sms' ? smsTemplates : emailTemplates;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTemplateChange = (e) => {
    const selectedTemplate = templates.find(t => t.id === e.target.value);
    if (selectedTemplate) {
      setFormData({
        ...formData,
        template: selectedTemplate.id,
        subject: selectedTemplate.subject || '',
        message: selectedTemplate.content
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSend({
        type,
        recipients: formData.recipients,
        subject: formData.subject,
        message: formData.message
      });
      
      // Reset form
      setFormData({
        recipients: '',
        subject: '',
        message: '',
        template: ''
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-form">
      <h3 className="form-header">
        {type === 'sms' ? <Phone className="header-icon" /> : <Mail className="header-icon" />}
        Send {type === 'sms' ? 'SMS' : 'Email'} Notification
      </h3>
      
      <div className="notification-form-content">
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="form-group">
              <label className="form-label">
                <Users className="label-icon" />
                Select Recipients
              </label>
              <select
                name="recipients"
                value={formData.recipients}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Choose recipient type</option>
                <option value="all">All Patients</option>
                <option value="upcoming">Upcoming Appointments (Next 24 hours)</option>
                <option value="overdue">Overdue Checkups</option>
                <option value="new">New Patients (Last 30 days)</option>
                <option value="specific">Specific Patients</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message Template</label>
              <select
                name="template"
                value={formData.template}
                onChange={handleTemplateChange}
                className="form-select"
              >
                <option value="">Select template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {type === 'email' && (
              <div className="form-group">
                <label className="form-label">Subject Line</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter email subject..."
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Message Content</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={`form-textarea ${type === 'sms' ? 'sms-textarea' : 'email-textarea'}`}
                placeholder={`Enter your ${type === 'sms' ? 'SMS' : 'email'} message here...`}
                maxLength={type === 'sms' ? 160 : undefined}
              />
              {type === 'sms' && (
                <p className="character-count">
                  {formData.message.length}/160 characters
                </p>
              )}
            </div>
          </div>

          <div className="variables-info">
            <h4 className="variables-title">Available Variables:</h4>
            <div className="variables-grid">
              <span className="variable-item">[Patient Name]</span>
              <span className="variable-item">[Date]</span>
              <span className="variable-item">[Time]</span>
              <span className="variable-item">[Service]</span>
              <span className="variable-item">[Doctor Name]</span>
              <span className="variable-item">[Clinic Phone]</span>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="action-btn preview-btn"
            >
              Preview
            </button>
            <button
              type="submit"
              disabled={loading || !formData.recipients || !formData.message}
              className={`action-btn send-btn ${type === 'sms' ? 'sms-send' : 'email-send'}`}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <Send className="send-icon" />
              )}
              <span>
                {loading ? 'Sending...' : `Send ${type === 'sms' ? 'SMS' : 'Email'}`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;