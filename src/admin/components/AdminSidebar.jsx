// src/admin/components/AdminSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Calendar,
  Users, 
  MessageSquare,
  Star,
  Settings, 
  Bell, 
  Menu, 
  Home,
  LogOut,
  Image,
  User
} from 'lucide-react';
import '../styles/admin.scss';
import '../styles/components.scss';
import '../styles/pages.scss';

const AdminSidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/admin/appointments' },
    { id: 'patients', label: 'Patient Records', icon: User, path: '/admin/patients' },
    { id: 'contacts', label: 'Contact Inquiries', icon: MessageSquare, path: '/admin/contacts' },
    { id: 'reviews', label: 'Reviews', icon: Star, path: '/admin/reviews' },
    { id: 'content', label: 'Content Management', icon: Image, path: '/admin/content' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path || 
           (path === '/admin/dashboard' && location.pathname === '/admin');
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && (
          <div className="logo">
            <div className="logo-icon">
              <span>A</span>
            </div>
            <span className="logo-text">Apexion Admin</span>
          </div>
        )}
        <button 
          onClick={onToggle}
          className="toggle-btn"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {sidebarItems.map(item => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              {isOpen && <span className="nav-label">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          <LogOut className="logout-icon" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;