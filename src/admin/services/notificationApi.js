// src/admin/services/notificationApi.js
import adminApi from "./adminApi";

class NotificationApiService {
  // Send SMS notification
  async sendSMS(notificationData) {
    const errors = this.validateNotificationData(notificationData, "sms");
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request("/admin/notifications/sms", {
      method: "POST",
      body: JSON.stringify(notificationData),
    });
  }

  // Send email notification
  async sendEmail(notificationData) {
    const errors = this.validateNotificationData(notificationData, "email");
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request("/admin/notifications/email", {
      method: "POST",
      body: JSON.stringify(notificationData),
    });
  }

  // Send bulk SMS
  async sendBulkSMS(recipients, message, templateId = null) {
    return adminApi.request("/admin/notifications/sms/bulk", {
      method: "POST",
      body: JSON.stringify({
        recipients,
        message,
        templateId,
      }),
    });
  }

  // Send bulk email
  async sendBulkEmail(recipients, subject, message, templateId = null) {
    return adminApi.request("/admin/notifications/email/bulk", {
      method: "POST",
      body: JSON.stringify({
        recipients,
        subject,
        message,
        templateId,
      }),
    });
  }

  // Get notification history
  async getNotificationHistory(filters = {}) {
    const params = new URLSearchParams();

    if (filters.type) params.append("type", filters.type);
    if (filters.status) params.append("status", filters.status);
    if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.append("dateTo", filters.dateTo);
    if (filters.recipient) params.append("recipient", filters.recipient);
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);

    return adminApi.request(`/admin/notifications/history?${params}`);
  }

  // Get notification templates
  async getTemplates(type = null) {
    const params = type ? `?type=${type}` : "";
    return adminApi.request(`/admin/notifications/templates${params}`);
  }

  // Get SMS templates
  async getSMSTemplates() {
    return this.getTemplates("sms");
  }

  // Get email templates
  async getEmailTemplates() {
    return this.getTemplates("email");
  }

  // Create notification template
  async createTemplate(templateData) {
    const errors = this.validateTemplateData(templateData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request("/admin/notifications/templates", {
      method: "POST",
      body: JSON.stringify(templateData),
    });
  }

  // Update notification template
  async updateTemplate(templateId, templateData) {
    const errors = this.validateTemplateData(templateData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request(`/admin/notifications/templates/${templateId}`, {
      method: "PUT",
      body: JSON.stringify(templateData),
    });
  }

  // Delete notification template
  async deleteTemplate(templateId) {
    return adminApi.request(`/admin/notifications/templates/${templateId}`, {
      method: "DELETE",
    });
  }

  // Schedule notification
  async scheduleNotification(notificationData, scheduleTime) {
    return adminApi.request("/admin/notifications/schedule", {
      method: "POST",
      body: JSON.stringify({
        ...notificationData,
        scheduleTime,
      }),
    });
  }

  // Get scheduled notifications
  async getScheduledNotifications() {
    return adminApi.request("/admin/notifications/scheduled");
  }

  // Cancel scheduled notification
  async cancelScheduledNotification(notificationId) {
    return adminApi.request(
      `/admin/notifications/scheduled/${notificationId}/cancel`,
      {
        method: "PUT",
      }
    );
  }

  // Get notification statistics
  async getNotificationStatistics(period = "month") {
    return adminApi.request(`/admin/notifications/statistics?period=${period}`);
  }

  // Test SMS configuration
  async testSMSConfiguration() {
    return adminApi.request("/admin/notifications/test/sms", {
      method: "POST",
    });
  }

  // Test email configuration
  async testEmailConfiguration() {
    return adminApi.request("/admin/notifications/test/email", {
      method: "POST",
    });
  }

  // Get notification settings
  async getNotificationSettings() {
    return adminApi.request("/admin/notifications/settings");
  }

  // Update notification settings
  async updateNotificationSettings(settings) {
    return adminApi.request("/admin/notifications/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  }

  // Get recipient groups
  async getRecipientGroups() {
    return adminApi.request("/admin/notifications/recipient-groups");
  }

  // Create recipient group
  async createRecipientGroup(groupData) {
    return adminApi.request("/admin/notifications/recipient-groups", {
      method: "POST",
      body: JSON.stringify(groupData),
    });
  }

  // Update recipient group
  async updateRecipientGroup(groupId, groupData) {
    return adminApi.request(
      `/admin/notifications/recipient-groups/${groupId}`,
      {
        method: "PUT",
        body: JSON.stringify(groupData),
      }
    );
  }

  // Delete recipient group
  async deleteRecipientGroup(groupId) {
    return adminApi.request(
      `/admin/notifications/recipient-groups/${groupId}`,
      {
        method: "DELETE",
      }
    );
  }

  // Get delivery reports
  async getDeliveryReports(notificationId) {
    return adminApi.request(
      `/admin/notifications/${notificationId}/delivery-reports`
    );
  }

  // Resend failed notifications
  async resendFailedNotifications(notificationId) {
    return adminApi.request(
      `/admin/notifications/${notificationId}/resend-failed`,
      {
        method: "POST",
      }
    );
  }

  // Export notification history
  async exportNotificationHistory(filters = {}, format = "csv") {
    const params = new URLSearchParams({ ...filters, format });
    return adminApi.request(`/admin/notifications/export?${params}`);
  }

  // Validate notification data
  validateNotificationData(data, type) {
    const errors = [];

    if (!data.recipients) {
      errors.push("Recipients are required");
    }

    if (!data.message || data.message.trim().length < 1) {
      errors.push("Message content is required");
    }

    if (type === "sms") {
      if (data.message.length > 160) {
        errors.push("SMS message must be 160 characters or less");
      }
    }

    if (type === "email") {
      if (!data.subject || data.subject.trim().length < 1) {
        errors.push("Email subject is required");
      }

      if (data.subject.length > 78) {
        errors.push("Email subject should be 78 characters or less");
      }
    }

    return errors;
  }

  // Validate template data
  validateTemplateData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 3) {
      errors.push("Template name must be at least 3 characters long");
    }

    if (!data.type || !["sms", "email"].includes(data.type)) {
      errors.push('Template type must be either "sms" or "email"');
    }

    if (!data.content || data.content.trim().length < 1) {
      errors.push("Template content is required");
    }

    if (data.type === "sms" && data.content.length > 160) {
      errors.push("SMS template content must be 160 characters or less");
    }

    if (
      data.type === "email" &&
      (!data.subject || data.subject.trim().length < 1)
    ) {
      errors.push("Email template subject is required");
    }

    return errors;
  }

  // Process message variables
  processMessageVariables(message, variables = {}) {
    let processedMessage = message;

    // Default variables
    const defaultVariables = {
      "[Clinic Name]": "Apexion Dental Clinic",
      "[Doctor Name]": "Dr. Deepika Medhi",
      "[Clinic Phone]": "+91-8296229544",
      "[Clinic Address]": "New Airport Road, Dharapur, Guwahati, Assam",
    };

    // Merge with provided variables
    const allVariables = { ...defaultVariables, ...variables };

    // Replace variables in message
    Object.entries(allVariables).forEach(([placeholder, value]) => {
      processedMessage = processedMessage.replace(
        new RegExp(placeholder, "g"),
        value
      );
    });

    return processedMessage;
  }

  // Get available message variables
  getAvailableVariables() {
    return [
      "[Patient Name]",
      "[Date]",
      "[Time]",
      "[Service]",
      "[Doctor Name]",
      "[Clinic Name]",
      "[Clinic Phone]",
      "[Clinic Address]",
      "[Appointment ID]",
    ];
  }

  // Format delivery statistics
  formatDeliveryStats(stats) {
    return {
      ...stats,
      deliveryRate:
        stats.total > 0
          ? ((stats.delivered / stats.total) * 100).toFixed(1)
          : 0,
      failureRate:
        stats.total > 0 ? ((stats.failed / stats.total) * 100).toFixed(1) : 0,
      pendingRate:
        stats.total > 0 ? ((stats.pending / stats.total) * 100).toFixed(1) : 0,
    };
  }

  // Get notification status color
  getStatusColor(status) {
    const colors = {
      sent: "blue",
      delivered: "green",
      failed: "red",
      pending: "yellow",
      scheduled: "purple",
    };
    return colors[status] || "gray";
  }
}

const notificationApi = new NotificationApiService();
export default notificationApi;
