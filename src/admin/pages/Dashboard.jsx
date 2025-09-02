// src/admin/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import TodayAppointments from '../components/TodayAppointments';
import RecentReviews from '../components/RecentReviews';
import { Calendar, Users, Star, MessageSquare } from 'lucide-react';
import '../styles/admin.scss';
import '../styles/components.scss';
import '../styles/pages.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Appointments",
      value: "24",
      change: "+15%",
      icon: Calendar,
      color: "bg-blue-500",
      onClick: () => navigate('/admin/appointments')
    },
    {
      title: "New Patients",
      value: "12",
      change: "+8%",
      icon: Users,
      color: "bg-green-500",
      onClick: () => navigate('/admin/patients')
    },
    {
      title: "Pending Reviews",
      value: "3",
      change: "+2",
      icon: Star,
      color: "bg-yellow-500",
      onClick: () => navigate('/admin/reviews')
    },
    {
      title: "Contact Inquiries",
      value: "8",
      change: "+5",
      icon: MessageSquare,
      color: "bg-purple-500",
      onClick: () => navigate('/admin/contacts')
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Apexion Dental Clinic Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, Dr. Deepika Medhi</p>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
            onClick={stat.onClick}
          />
        ))}
      </div>

      <div className="dashboard-widgets">
        <TodayAppointments />
        <RecentReviews />
      </div>
    </div>
  );
};

export default Dashboard;