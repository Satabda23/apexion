// src/admin/components/TodayAppointments.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Eye, Calendar } from 'lucide-react';

const TodayAppointments = () => {
  const navigate = useNavigate();
  
  // This will be replaced with actual data from API
  const todaysAppointments = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      time: '10:00 AM',
      service: 'Root Canal',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      time: '2:00 PM',
      service: 'Whitening',
      status: 'confirmed'
    },
    {
      id: 3,
      name: 'Amit Patel',
      time: '4:00 PM',
      service: 'Checkup',
      status: 'confirmed'
    }
  ];

  return (
    <div className="today-appointments">
      <div className="appointments-header">
        <h3 className="header-title">
          <Calendar className="title-icon" />
          Today's Appointments
        </h3>
        <button 
          onClick={() => navigate('/admin/appointments')}
          className="view-all-btn"
        >
          View All
        </button>
      </div>

      <div className="appointments-list">
        {todaysAppointments.length > 0 ? (
          todaysAppointments.map(appointment => (
            <div 
              key={appointment.id} 
              className="appointment-item"
            >
              <div className="appointment-info">
                <p className="patient-name">{appointment.name}</p>
                <p className="appointment-details">{appointment.time} - {appointment.service}</p>
              </div>
              <div className="appointment-actions">
                <StatusBadge status={appointment.status} />
                <button 
                  onClick={() => navigate('/admin/appointments')}
                  className="view-btn"
                  title="View appointment details"
                >
                  <Eye className="view-icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Calendar className="empty-icon" />
            <p className="empty-message">No appointments scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayAppointments;