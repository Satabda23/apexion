// src/admin/pages/PatientRecords.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PatientCard from '../components/PatientCard';
import { User, Plus, Search } from 'lucide-react';

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      setPatients([
        {
          id: 1,
          name: 'Rajesh Kumar',
          phone: '9876543210',
          email: 'rajesh@example.com',
          age: 35,
          gender: 'Male',
          address: 'Guwahati, Assam',
          lastVisit: '2025-08-20',
          nextAppointment: '2025-08-28',
          medicalHistory: ['Diabetes', 'Hypertension'],
          treatments: ['Root Canal - Tooth 36', 'Scaling', 'Filling - Tooth 14'],
          allergies: ['Penicillin'],
          notes: 'Patient has anxiety about dental procedures. Prefers morning appointments.'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          phone: '8765432109',
          email: 'priya@example.com',
          age: 28,
          gender: 'Female',
          address: 'Jorhat, Assam',
          lastVisit: '2025-08-15',
          nextAppointment: '2025-08-29',
          medicalHistory: [],
          treatments: ['Teeth Whitening', 'Regular Cleaning'],
          allergies: [],
          notes: 'Interested in cosmetic dentistry. Maintains excellent oral hygiene.'
        },
        {
          id: 3,
          name: 'Amit Patel',
          phone: '7654321098',
          email: 'amit@example.com',
          age: 42,
          gender: 'Male',
          address: 'Silchar, Assam',
          lastVisit: '2025-08-10',
          nextAppointment: null,
          medicalHistory: ['Heart Disease'],
          treatments: ['Crown - Tooth 6', 'Extraction - Tooth 32'],
          allergies: ['Latex'],
          notes: 'Requires prophylactic antibiotics before treatment. Check with cardiologist before major procedures.'
        },
        {
          id: 4,
          name: 'Meera Das',
          phone: '9123456789',
          email: 'meera@example.com',
          age: 55,
          gender: 'Female',
          address: 'Tezpur, Assam',
          lastVisit: '2025-08-05',
          nextAppointment: '2025-08-31',
          medicalHistory: ['Osteoporosis', 'Diabetes'],
          treatments: ['Dentures - Upper', 'Periodontal Treatment'],
          allergies: ['Aspirin'],
          notes: 'Elderly patient, needs assistance getting to chair. Family member usually accompanies.'
        },
        {
          id: 5,
          name: 'Sanjay Singh',
          phone: '8234567890',
          email: 'sanjay@example.com',
          age: 31,
          gender: 'Male',
          address: 'Dibrugarh, Assam',
          lastVisit: '2025-07-25',
          nextAppointment: '2025-09-01',
          medicalHistory: [],
          treatments: ['Implant Consultation'],
          allergies: [],
          notes: 'New patient. Referred by Dr. Sharma for dental implant procedure.'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditPatient = (patient) => {
    toast.info(`Opening edit form for ${patient.name}`);
    // In real app, open edit modal or navigate to edit page
  };

  const handleViewHistory = (patient) => {
    toast.info(`Opening medical history for ${patient.name}`);
    // In real app, open detailed history modal
  };

  const getPatientStats = () => {
    const totalPatients = patients.length;
    const malePatients = patients.filter(p => p.gender === 'Male').length;
    const femalePatients = patients.filter(p => p.gender === 'Female').length;
    const patientsWithAllergies = patients.filter(p => p.allergies.length > 0).length;
    const upcomingAppointments = patients.filter(p => p.nextAppointment).length;

    return {
      total: totalPatients,
      male: malePatients,
      female: femalePatients,
      withAllergies: patientsWithAllergies,
      upcoming: upcomingAppointments
    };
  };

  const stats = getPatientStats();

  if (loading) {
    return (
      <div className="patient-records">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-records">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <User className="title-icon" />
            Patient Medical Records
          </h1>
          <p className="page-description">Comprehensive patient information and treatment history</p>
        </div>
        <button className="add-patient-btn">
          <Plus className="add-icon" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Patient Statistics */}
      <div className="patient-stats">
        <div className="stat-card">
          <p className="stat-number total">{stats.total}</p>
          <p className="stat-label">Total Patients</p>
        </div>
        <div className="stat-card">
          <p className="stat-number male">{stats.male}</p>
          <p className="stat-label">Male</p>
        </div>
        <div className="stat-card">
          <p className="stat-number female">{stats.female}</p>
          <p className="stat-label">Female</p>
        </div>
        <div className="stat-card">
          <p className="stat-number with-allergies">{stats.withAllergies}</p>
          <p className="stat-label">With Allergies</p>
        </div>
        <div className="stat-card">
          <p className="stat-number upcoming">{stats.upcoming}</p>
          <p className="stat-label">Upcoming Visits</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search patients by name, phone, or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="patients-grid">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEditPatient}
              onViewHistory={handleViewHistory}
            />
          ))
        ) : (
          <div className="empty-state">
            <User className="empty-icon" />
            <p className="empty-message">No patients found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search-btn"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;