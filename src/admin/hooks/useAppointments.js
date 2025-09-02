// src/admin/hooks/useAppointments.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch appointments from API
  const fetchAppointments = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.date) queryParams.append("date", filters.date);
      if (filters.search) queryParams.append("search", filters.search);

      const response = await fetch(`/api/admin/appointments?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      } else {
        throw new Error("Failed to fetch appointments");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(
        `/api/admin/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setAppointments(
          appointments.map((apt) =>
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
          )
        );
        toast.success(`Appointment status updated to ${newStatus}`);
        return { success: true };
      } else {
        throw new Error("Failed to update appointment status");
      }
    } catch (error) {
      toast.error("Failed to update appointment status");
      return { success: false, error: error.message };
    }
  };

  // Send notification
  const sendNotification = async (appointmentId, type) => {
    try {
      const response = await fetch(
        `/api/admin/appointments/${appointmentId}/notify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ type }),
        }
      );

      if (response.ok) {
        const appointment = appointments.find(
          (apt) => apt.id === appointmentId
        );
        toast.success(`${type} notification sent to ${appointment?.name}`);
        return { success: true };
      } else {
        throw new Error(`Failed to send ${type} notification`);
      }
    } catch (error) {
      toast.error(`Failed to send ${type} notification`);
      return { success: false, error: error.message };
    }
  };

  // Create new appointment
  const createAppointment = async (appointmentData) => {
    try {
      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const newAppointment = await response.json();
        setAppointments([newAppointment, ...appointments]);
        toast.success("Appointment created successfully");
        return { success: true, appointment: newAppointment };
      } else {
        throw new Error("Failed to create appointment");
      }
    } catch (error) {
      toast.error("Failed to create appointment");
      return { success: false, error: error.message };
    }
  };

  // Delete appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
        toast.success("Appointment deleted successfully");
        return { success: true };
      } else {
        throw new Error("Failed to delete appointment");
      }
    } catch (error) {
      toast.error("Failed to delete appointment");
      return { success: false, error: error.message };
    }
  };

  // Get appointment statistics
  const getAppointmentStats = () => {
    return {
      total: appointments.length,
      pending: appointments.filter((apt) => apt.status === "pending").length,
      confirmed: appointments.filter((apt) => apt.status === "confirmed")
        .length,
      completed: appointments.filter((apt) => apt.status === "completed")
        .length,
      cancelled: appointments.filter((apt) => apt.status === "cancelled")
        .length,
    };
  };

  // Load appointments on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    updateAppointmentStatus,
    sendNotification,
    createAppointment,
    deleteAppointment,
    getAppointmentStats,
  };
};
