import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AppointmentTable from '../components/AppointmentTable';
import appointmentApi from '../services/appointmentApi';


import { 
  Calendar, 
  // Plus 
} from 'lucide-react';

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentApi.getAppointments(); 
      console.log("Fetched appointments:", response);
      setAppointments(response.data || []);
    } catch (error) {
      toast.error("Failed to load appointments");
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);

console.log("Appointments state:", appointments);
 const handleStatusUpdate = async (appointmentId, newStatus) => {
  try {
    // Use the appointmentApi service to update appointment
    await appointmentApi.updateAppointment(appointmentId, newStatus );
    
    // Update local state after successful API call
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
    
    toast.success(`Appointment status updated to ${newStatus}`);
  } catch (error) {
    toast.error('Failed to update appointment status');
    console.error('Error updating appointment:', error);
  }
};

  const handleSendNotification = async (appointmentId, type) => {
    try {
      // In real app, make API call here
      const appointment = appointments.find(apt => apt.id === appointmentId);
      
      toast.success(`${type} notification sent to ${appointment.name}`);
    } catch (error) {
      toast.error(`Failed to send ${type} notification`);
      console.error('Error sending notification:', error);
    }
  };

  const getStatusCounts = () => {
    const counts = {
      total: appointments.length,
      pending: appointments.filter(apt => apt.status === 'pending').length,
      confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
      completed: appointments.filter(apt => apt.status === 'completed').length,
      cancelled: appointments.filter(apt => apt.status === 'cancelled').length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="appointment-manager">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-manager">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <Calendar className="title-icon" />
            Appointment Management
          </h1>
          <p className="page-description">Manage patient appointments and schedules</p>
        </div>
        {/* <button className="add-appointment-btn">
          <Plus className="add-icon" />
          <span>Add Appointment</span>
        </button> */}
      </div>

      {/* Status Summary Cards */}
      <div className="appointment-stats">
        <div className="stat-card">
          <p className="stat-number total">{statusCounts.total}</p>
          <p className="stat-label">Total</p>
        </div>
        <div className="stat-card">
          <p className="stat-number pending">{statusCounts.pending}</p>
          <p className="stat-label">Pending</p>
        </div>
        <div className="stat-card">
          <p className="stat-number confirmed">{statusCounts.confirmed}</p>
          <p className="stat-label">Confirmed</p>
        </div>
        <div className="stat-card">
          <p className="stat-number completed">{statusCounts.completed}</p>
          <p className="stat-label">Completed</p>
        </div>
        <div className="stat-card">
          <p className="stat-number cancelled">{statusCounts.cancelled}</p>
          <p className="stat-label">Cancelled</p>
        </div>
      </div>

      {/* Appointments Table */}
      <AppointmentTable
        appointments={appointments}
        onStatusUpdate={handleStatusUpdate}
        onSendNotification={handleSendNotification}
      />
    </div>
  );
};

export default AppointmentManager;