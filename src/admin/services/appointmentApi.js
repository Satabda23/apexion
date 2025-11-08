// src/admin/services/appointmentApi.js
import adminApi from "./adminApi";

class AppointmentApiService {
  // Get all appointments with advanced filtering
  async getAppointments(filters = {}) {
    const params = new URLSearchParams();

    // Add filters
    if (filters.status) params.append("status", filters.status);
    if (filters.date) params.append("date", filters.date);
    if (filters.dateRange) {
      params.append("startDate", filters.dateRange.start);
      params.append("endDate", filters.dateRange.end);
    }
    if (filters.service) params.append("service", filters.service);
    if (filters.search) params.append("search", filters.search);
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    return adminApi.request(`/admin/appointments?${params}`);
  }

  // Get appointments for specific date
  async getAppointmentsByDate(date) {
    return this.getAppointments({ date });
  }

  // Get today's appointments
  async getTodaysAppointments() {
    const today = new Date().toISOString().split("T")[0];
    return this.getAppointmentsByDate(today);
  }

  // Get upcoming appointments (next 7 days)
  async getUpcomingAppointments() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return this.getAppointments({
      dateRange: {
        start: today.toISOString().split("T")[0],
        end: nextWeek.toISOString().split("T")[0],
      },
    });
  }

  // Get overdue appointments
  async getOverdueAppointments() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return this.getAppointments({
      status: "pending",
      dateRange: {
        start: "2020-01-01",
        end: yesterday.toISOString().split("T")[0],
      },
    });
  }

  // Create appointment with validation
  async createAppointment(appointmentData) {
    // Client-side validation
    const errors = this.validateAppointmentData(appointmentData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.createAppointment(appointmentData);
  }

  // Update appointment
  async updateAppointment(id, appointmentData) {
    console.log(id, appointmentData);
    // const errors = this.validateAppointmentData(appointmentData);
    // console.log("Validation errors:", errors);
    // if (errors.length > 0) {
    //   throw new Error(`Validation errors: ${errors.join(", ")}`);
    // }

    return adminApi.updateAppointmentStatus(id, appointmentData);
  }

  // Bulk update appointments
  async bulkUpdateAppointments(appointmentIds, updateData) {
    return adminApi.request("/admin/appointments/bulk-update", {
      method: "PUT",
      body: JSON.stringify({
        appointmentIds,
        updateData,
      }),
    });
  }

  // Get appointment statistics
  async getAppointmentStats(period = "month") {
    return adminApi.request(`/admin/appointments/stats?period=${period}`);
  }

  // Get appointment conflicts
  async checkAppointmentConflicts(appointmentData) {
    return adminApi.request("/admin/appointments/check-conflicts", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }

  // Reschedule appointment
  async rescheduleAppointment(id, newDate, newTime) {
    return adminApi.request(`/admin/appointments/${id}/reschedule`, {
      method: "PUT",
      body: JSON.stringify({ date: newDate, time: newTime }),
    });
  }

  // Cancel appointment
  async cancelAppointment(id, reason = "") {
    return adminApi.request(`/admin/appointments/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify({ reason }),
    });
  }

  // Send reminder notifications
  async sendReminders(appointmentIds) {
    return adminApi.request("/admin/appointments/send-reminders", {
      method: "POST",
      body: JSON.stringify({ appointmentIds }),
    });
  }

  // Get available time slots
  async getAvailableTimeSlots(date, duration = 30) {
    return adminApi.request(
      `/admin/appointments/available-slots?date=${date}&duration=${duration}`
    );
  }

  // Export appointments
  async exportAppointments(filters = {}, format = "csv") {
    const params = new URLSearchParams({ ...filters, format });
    return adminApi.request(`/admin/appointments/export?${params}`, {
      method: "GET",
    });
  }

  // Validate appointment data
  validateAppointmentData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    if (!data.phone || !/^[0-9]{10}$/.test(data.phone)) {
      errors.push("Phone number must be exactly 10 digits");
    }

    if (!data.date) {
      errors.push("Appointment date is required");
    } else {
      const appointmentDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (appointmentDate < today) {
        errors.push("Appointment date cannot be in the past");
      }
    }

    if (!data.time) {
      errors.push("Appointment time is required");
    }

    if (!data.service) {
      errors.push("Service type is required");
    }

    return errors;
  }

  // Format appointment for display
  formatAppointment(appointment) {
    return {
      ...appointment,
      formattedDate: new Date(appointment.date).toLocaleDateString(),
      formattedTime: appointment.time,
      statusColor: this.getStatusColor(appointment.status),
      isToday: this.isToday(appointment.date),
      isOverdue: this.isOverdue(appointment.date, appointment.status),
    };
  }

  // Helper methods
  getStatusColor(status) {
    const colors = {
      pending: "yellow",
      confirmed: "blue",
      completed: "green",
      cancelled: "red",
    };
    return colors[status] || "gray";
  }

  isToday(date) {
    const today = new Date().toISOString().split("T")[0];
    return date === today;
  }

  isOverdue(date, status) {
    if (status !== "pending") return false;
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  }
}

const appointmentApi = new AppointmentApiService();
export default appointmentApi;
