// src/admin/components/PatientCard.jsx
import React from 'react';
import { Edit, Phone, Mail, Calendar, User } from 'lucide-react';

const PatientCard = ({ patient, onEdit, onViewHistory }) => {
  const { 
    id, 
    name, 
    phone, 
    email, 
    age, 
    gender, 
    address, 
    lastVisit, 
    nextAppointment, 
    medicalHistory = [], 
    treatments = [], 
    allergies = [], 
    notes 
  } = patient;

  return (
    <div className="patient-card">
      <div className="patient-header">
        <div className="patient-avatar">
          <div className="avatar-icon">
            <User className="user-icon" />
          </div>
          <div className="patient-info">
            <h3 className="patient-name">{name}</h3>
            <p className="patient-meta">{age} years, {gender}</p>
          </div>
        </div>
        <div className="patient-actions">
          <button 
            onClick={() => onEdit(patient)}
            className="action-btn"
            title="Edit Patient"
          >
            <Edit className="action-icon" />
          </button>
        </div>
      </div>

      <div className="patient-details">
        <div className="detail-section">
          <div className="section-content">
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>{phone}</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <p className="section-label">Address</p>
          <div className="section-content">
            <p className="address-text">{address}</p>
          </div>
        </div>

        <div className="detail-section">
          <div className="section-content">
            <div className="visit-info">
              <div className="visit-item">
                <p className="visit-label">Last Visit</p>
                <p className="visit-value last-visit">{lastVisit}</p>
              </div>
              <div className="visit-item">
                <p className="visit-label">Next Appointment</p>
                <p className={`visit-value ${nextAppointment ? 'next-appointment' : 'not-scheduled'}`}>
                  {nextAppointment || 'Not scheduled'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {medicalHistory.length > 0 && (
          <div className="detail-section">
            <p className="section-label">Medical History</p>
            <div className="section-content">
              <div className="tags">
                {medicalHistory.map((condition, idx) => (
                  <span key={idx} className="tag medical-history">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {treatments.length > 0 && (
          <div className="detail-section">
            <p className="section-label">Recent Treatments</p>
            <div className="section-content">
              <div className="tags">
                {treatments.slice(0, 3).map((treatment, idx) => (
                  <span key={idx} className="tag treatment">
                    {treatment}
                  </span>
                ))}
                {treatments.length > 3 && (
                  <span className="tag more-count">
                    +{treatments.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {allergies.length > 0 && (
          <div className="detail-section">
            <p className="section-label">Allergies</p>
            <div className="section-content">
              <div className="tags">
                {allergies.map((allergy, idx) => (
                  <span key={idx} className="tag allergy">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {notes && (
          <div className="detail-section">
            <p className="section-label">Notes</p>
            <div className="section-content">
              <p className="notes">
                {notes}
              </p>
            </div>
          </div>
        )}

        <div className="patient-footer">
          <button 
            onClick={() => onViewHistory(patient)}
            className="view-history-btn"
          >
            <Calendar className="history-icon" />
            <span>View Full History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;