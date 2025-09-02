// src/admin/components/AdminHeader.jsx
import React from 'react';
import { Search, Menu, Bell } from 'lucide-react';
import '../styles/admin.scss';
import '../styles/components.scss';
import '../styles/pages.scss';

const AdminHeader = ({ onSidebarToggle }) => {
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <button 
            onClick={onSidebarToggle}
            className="mobile-toggle"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="notification-btn">
            <Bell className="w-5 h-5" />
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu">
            <div className="user-avatar">
              <span>
                {adminUser.name ? adminUser.name.split(' ').map(n => n[0]).join('') : 'DM'}
              </span>
            </div>
            <div className="user-info">
              <p className="user-name">
                {adminUser.name || 'Dr. Deepika Medhi'}
              </p>
              <p className="user-role">Dental Surgeon</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;