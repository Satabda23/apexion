
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import AppointmentManager from './pages/AppointmentManager';
import PatientRecords from './pages/PatientRecords';
import ContactInquiries from './pages/ContactInquiries';
import ReviewModeration from './pages/ReviewModeration';
import ContentManagement from './pages/ContentManagement';
import NotificationCenter from './pages/NotificationCenter';
import AdminSettings from './pages/AdminSettings';
import './styles/admin.scss';
import './styles/components.scss';
import './styles/pages.scss';

const AdminPanel = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<AppointmentManager />} />
        <Route path="/patients" element={<PatientRecords />} />
        <Route path="/contacts" element={<ContactInquiries />} />
        <Route path="/reviews" element={<ReviewModeration />} />
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/notifications" element={<NotificationCenter />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;