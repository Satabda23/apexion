// src/admin/components/AppointmentTable.jsx
import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Phone, Mail, Search } from 'lucide-react';

const AppointmentTable = ({ appointments, onStatusUpdate, onSendNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.phone.includes(searchTerm);
    const matchesStatus = statusFilter === '' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="appointment-table">
      <div className="table-header">
        <div className="table-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="appointments-table">
          <thead className="table-head">
            <tr>
              <th className="header-cell">Patient</th>
              <th className="header-cell">Service</th>
              <th className="header-cell">Date & Time</th>
              <th className="header-cell">Status</th>
              <th className="header-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id} className="table-row">
                <td className="table-cell patient-info" data-label="Patient">
                  <div>
                    <p className="patient-name">{appointment.name}</p>
                    <p className="patient-phone">{appointment.phone}</p>
                    {appointment.message && (
                      <p className="patient-message" title={appointment.message}>
                        {appointment.message}
                      </p>
                    )}
                  </div>
                </td>
                <td className="table-cell service-info" data-label="Service">
                  {appointment.service}
                </td>
                <td className="table-cell datetime-info" data-label="Date & Time">
                  <p className="appointment-date">{appointment.date}</p>
                  <p className="appointment-time">{appointment.time}</p>
                </td>
                <td className="table-cell" data-label="Status">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="table-cell actions-cell" data-label="Actions">
                  <div className="actions-container">
                    <select 
                      value={appointment.status}
                      onChange={(e) => onStatusUpdate(appointment.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button 
                      onClick={() => onSendNotification(appointment.id, 'SMS')}
                      className="action-button sms-button"
                      title="Send SMS"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onSendNotification(appointment.id, 'Email')}
                      className="action-button email-button"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAppointments.length === 0 && (
          <div className="empty-state">
            <p>No appointments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentTable;