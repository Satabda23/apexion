import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AppointmentTable from '../components/AppointmentTable';
import { Calendar, Plus } from 'lucide-react';

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments([
        { 
          id: 1, 
          name: 'Rajesh Kumar', 
          phone: '9876543210', 
          message: 'Need root canal treatment', 
          date: '2025-08-28',
          time: '10:00 AM',
          status: 'pending',
          service: 'Root Canal',
          createdAt: '2025-08-27'
        },
        { 
          id: 2, 
          name: 'Priya Sharma', 
          phone: '8765432109', 
          message: 'Teeth whitening consultation', 
          date: '2025-08-29',
          time: '2:00 PM',
          status: 'confirmed',
          service: 'Whitening',
          createdAt: '2025-08-27'
        },
        { 
          id: 3, 
          name: 'Amit Patel', 
          phone: '7654321098', 
          message: 'Regular checkup', 
          date: '2025-08-30',
          time: '11:00 AM',
          status: 'completed',
          service: 'Checkup',
          createdAt: '2025-08-26'
        },
        { 
          id: 4, 
          name: 'Meera Das', 
          phone: '9123456789', 
          message: 'Tooth extraction needed', 
          date: '2025-08-31',
          time: '3:00 PM',
          status: 'pending',
          service: 'Extraction',
          createdAt: '2025-08-28'
        },
        { 
          id: 5, 
          name: 'Sanjay Singh', 
          phone: '8234567890', 
          message: 'Dental implant consultation', 
          date: '2025-09-01',
          time: '9:00 AM',
          status: 'confirmed',
          service: 'Implants',
          createdAt: '2025-08-28'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      // In real app, make API call here
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
        <button className="add-appointment-btn">
          <Plus className="add-icon" />
          <span>Add Appointment</span>
        </button>
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