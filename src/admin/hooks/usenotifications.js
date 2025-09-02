// src/admin/hooks/useNotifications.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import adminApi from "../services/adminApi";

export const useNotifications = () => {
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [templates, setTemplates] = useState({ sms: [], email: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notification history
  const fetchNotificationHistory = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await adminApi.getNotificationHistory(filters);
      setNotificationHistory(data.notifications || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load notification history");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notification templates
  const fetchTemplates = async (type) => {
    try {
      const data = await adminApi.getNotificationTemplates(type);
      setTemplates((prev) => ({ ...prev, [type]: data.templates || [] }));
    } catch (error) {
      toast.error(`Failed to load ${type} templates`);
    }
  };

  // Send SMS notification
  const sendSMS = async (notificationData) => {
    try {
      const result = await adminApi.sendSMS(notificationData);

      // Add to history
      const newNotification = {
        id: Date.now(),
        type: "SMS",
        recipients: getRecipientsText(notificationData.recipients),
        subject: "SMS Message",
        message: notificationData.message.substring(0, 100) + "...",
        sentDate: new Date().toLocaleString(),
        status: "Sent",
        deliveredCount: result.deliveredCount || 0,
        failedCount: result.failedCount || 0,
      };

      setNotificationHistory([newNotification, ...notificationHistory]);
      toast.success("SMS notification sent successfully");
      return { success: true, result };
    } catch (error) {
      toast.error("Failed to send SMS notification");
      return { success: false, error: error.message };
    }
  };

  // Send Email notification
  const sendEmail = async (notificationData) => {
    try {
      const result = await adminApi.sendEmail(notificationData);

      // Add to history
      const newNotification = {
        id: Date.now(),
        type: "Email",
        recipients: getRecipientsText(notificationData.recipients),
        subject: notificationData.subject,
        message: notificationData.message.substring(0, 100) + "...",
        sentDate: new Date().toLocaleString(),
        status: "Sent",
        deliveredCount: result.deliveredCount || 0,
        failedCount: result.failedCount || 0,
      };

      setNotificationHistory([newNotification, ...notificationHistory]);
      toast.success("Email notification sent successfully");
      return { success: true, result };
    } catch (error) {
      toast.error("Failed to send email notification");
      return { success: false, error: error.message };
    }
  };

  // Get notification statistics
  const getNotificationStats = () => {
    const totalSent = notificationHistory.length;
    const smsSent = notificationHistory.filter((n) => n.type === "SMS").length;
    const emailsSent = notificationHistory.filter(
      (n) => n.type === "Email"
    ).length;
    const totalDelivered = notificationHistory.reduce(
      (sum, n) => sum + (n.deliveredCount || 0),
      0
    );
    const totalFailed = notificationHistory.reduce(
      (sum, n) => sum + (n.failedCount || 0),
      0
    );
    const deliveryRate =
      totalDelivered + totalFailed > 0
        ? ((totalDelivered / (totalDelivered + totalFailed)) * 100).toFixed(1)
        : 0;

    return {
      totalSent,
      smsSent,
      emailsSent,
      totalDelivered,
      totalFailed,
      deliveryRate,
    };
  };

  // Helper function to convert recipient types to display text
  const getRecipientsText = (recipients) => {
    const recipientMap = {
      all: "All patients",
      upcoming: "Upcoming appointments",
      overdue: "Overdue checkups",
      new: "New patients",
      specific: "Selected patients",
    };
    return recipientMap[recipients] || recipients;
  };

  // Get default SMS templates
  const getDefaultSMSTemplates = () => [
    {
      id: "reminder",
      name: "Appointment Reminder",
      content:
        "Dear [Patient Name], this is a reminder for your appointment at Apexion Dental Clinic on [Date] at [Time]. Please arrive 15 minutes early. Call 8296229544 for any changes.",
    },
    {
      id: "confirmation",
      name: "Appointment Confirmation",
      content:
        "Hello [Patient Name], your appointment at Apexion Dental Clinic is confirmed for [Date] at [Time]. We look forward to seeing you!",
    },
    {
      id: "followup",
      name: "Post-Treatment Follow-up",
      content:
        "Hi [Patient Name], we hope you're feeling better after your treatment. Please contact us at 8296229544 if you have any concerns.",
    },
  ];

  // Get default email templates
  const getDefaultEmailTemplates = () => [
    {
      id: "appointment",
      name: "Appointment Confirmation",
      subject: "Appointment Confirmation - Apexion Dental Clinic",
      content:
        "Dear [Patient Name],\n\nYour appointment has been confirmed for [Date] at [Time].\n\nLocation: New Airport Road, Dharapur, Guwahati\nPhone: 8296229544\n\nBest regards,\nDr. Deepika Medhi\nApexion Dental Clinic",
    },
    {
      id: "reminder",
      name: "Appointment Reminder",
      subject: "Appointment Reminder - Tomorrow",
      content:
        "Dear [Patient Name],\n\nThis is a friendly reminder about your appointment tomorrow at [Time].\n\nPlease arrive 15 minutes early and bring any relevant medical documents.\n\nThank you,\nApexion Dental Clinic",
    },
    {
      id: "newsletter",
      name: "Monthly Newsletter",
      subject: "Monthly Dental Health Tips",
      content:
        "Dear Valued Patient,\n\nWe hope this message finds you in good health. Here are some dental care tips for this month...",
    },
  ];

  // Load notification history on mount
  useEffect(() => {
    fetchNotificationHistory();

    // Set default templates if not loaded from API
    if (templates.sms.length === 0) {
      setTemplates((prev) => ({ ...prev, sms: getDefaultSMSTemplates() }));
    }
    if (templates.email.length === 0) {
      setTemplates((prev) => ({ ...prev, email: getDefaultEmailTemplates() }));
    }
  }, []);

  return {
    notificationHistory,
    templates,
    loading,
    error,
    fetchNotificationHistory,
    fetchTemplates,
    sendSMS,
    sendEmail,
    getNotificationStats,
    getDefaultSMSTemplates,
    getDefaultEmailTemplates,
  };
};
