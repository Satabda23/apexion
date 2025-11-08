// src/admin/services/adminApi.js
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

class AdminApi {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Helper method for API calls
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log(url, options);
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      console.log(`Making API request to: ${url}`, config);
      const response = await fetch(url, config);
      console.log("Response received:", response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      console.log("Response JSON:", await response.clone().json());
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication - MODIFIED to auto-store tokens
  async login(credentials) {
    const response = await this.request("/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Automatically store token and user data if login is successful
    if (response.success && response.token) {
      console.log("💾 Storing token in localStorage...");
      localStorage.setItem("adminToken", response.token);
    }

    if (response.success && response.user) {
      console.log("💾 Storing user in localStorage...");
      localStorage.setItem("adminUser", JSON.stringify(response.user));
    }

    return response;
  }

  async logout() {
    const response = await this.request("/admin/logout", { method: "POST" });

    // Clear stored data on logout
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    return response;
  }

  // Dashboard
  async getDashboardStats() {
    return this.request("/admin/dashboard/stats");
  }

  // Appointments
  async getAppointments(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(
      `/admin/appointments${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getAppointment(id) {
    return this.request(`/admin/appointments/${id}`);
  }

  async createAppointment(appointmentData) {
    return this.request("/admin/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id, appointmentData) {
    return this.request(`/admin/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointmentStatus(id, status) {
    return this.request(`/admin/appointments/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  async deleteAppointment(id) {
    return this.request(`/admin/appointments/${id}`, { method: "DELETE" });
  }

  async sendAppointmentNotification(id, type) {
    return this.request(`/admin/appointments/${id}/notify`, {
      method: "POST",
      body: JSON.stringify({ type }),
    });
  }

  // Patients
  async getPatients(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(
      `/admin/patients${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getPatient(id) {
    return this.request(`/admin/patients/${id}`);
  }

  async createPatient(patientData) {
    return this.request("/admin/patients", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  }

  async updatePatient(id, patientData) {
    return this.request(`/admin/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(patientData),
    });
  }

  async deletePatient(id) {
    return this.request(`/admin/patients/${id}`, { method: "DELETE" });
  }

  async getPatientHistory(id) {
    return this.request(`/admin/patients/${id}/history`);
  }

  // Contact Inquiries
  async getContacts(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(
      `/admin/contacts${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getContact(id) {
    return this.request(`/admin/contacts/${id}`);
  }

  async updateContactStatus(id, status) {
    return this.request(`/admin/contacts/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  async replyToContact(id, replyData) {
    return this.request(`/admin/contacts/${id}/reply`, {
      method: "POST",
      body: JSON.stringify(replyData),
    });
  }

  async deleteContact(id) {
    return this.request(`/admin/contacts/${id}`, { method: "DELETE" });
  }

  // Reviews
  // async getReviews(filters = {}) {
  //   const queryParams = new URLSearchParams(filters).toString();
  //   return this.request(
  //     `/admin/reviews${queryParams ? `?${queryParams}` : ""}`
  //   );
  // }

  async getReviews(params) {
    return this.request(`/admin/reviews${params ? `?${params}` : ""}`);
  }

  async getReview(id) {
    return this.request(`/admin/reviews/${id}`);
  }

  async approveReview(id) {
    return this.request(`/admin/reviews/${id}/approve`, { method: "PUT" });
  }

  async rejectReview(id) {
    return this.request(`/admin/reviews/${id}/reject`, { method: "PUT" });
  }

  async deleteReview(id) {
    return this.request(`/admin/reviews/${id}`, { method: "DELETE" });
  }

  // Content Management
  async getWebsiteContent() {
    return this.request("/admin/content");
  }

  async updateTextContent(contentData) {
    return this.request("/admin/content/text", {
      method: "PUT",
      body: JSON.stringify(contentData),
    });
  }

  async uploadImages(formData) {
    return this.request("/admin/content/images", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
  }

  async uploadVideos(formData) {
    return this.request("/admin/content/videos", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
  }

  async deleteImage(id) {
    return this.request(`/admin/content/images/${id}`, { method: "DELETE" });
  }

  async deleteVideo(id) {
    return this.request(`/admin/content/videos/${id}`, { method: "DELETE" });
  }

  // Notifications
  async sendSMS(notificationData) {
    return this.request("/admin/notifications/sms", {
      method: "POST",
      body: JSON.stringify(notificationData),
    });
  }

  async sendEmail(notificationData) {
    return this.request("/admin/notifications/email", {
      method: "POST",
      body: JSON.stringify(notificationData),
    });
  }

  async getNotificationHistory(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(
      `/admin/notifications/history${queryParams ? `?${queryParams}` : ""}`
    );
  }

  async getNotificationTemplates(type) {
    return this.request(`/admin/notifications/templates?type=${type}`);
  }

  // Settings
  async getSettings() {
    return this.request("/admin/settings");
  }

  async updateSettings(settingsData) {
    return this.request("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settingsData),
    });
  }

  async testNotification(type) {
    return this.request("/admin/settings/test-notification", {
      method: "POST",
      body: JSON.stringify({ type }),
    });
  }

  async runBackup() {
    return this.request("/admin/settings/backup", { method: "POST" });
  }

  // File uploads helper
  createFormData(files, additionalData = {}) {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    } else {
      formData.append("file", files);
    }

    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    return formData;
  }
}

// Create singleton instance
const adminApi = new AdminApi();

export default adminApi;
