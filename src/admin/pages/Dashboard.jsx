import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import TodayAppointments from "../components/TodayAppointments";
import RecentReviews from "../components/RecentReviews";
import { Calendar, Star, MessageSquare } from "lucide-react";
import "../styles/admin.scss";
import "../styles/components.scss";
import "../styles/pages.scss";

import appointmentApi from "../services/appointmentApi";
import enquiryApi from "../services/enquiryApi";
import {reviewApiService} from "../services/reviewApiService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [recentReviews,setRecentReviews] = useState([]); // Placeholder for recent reviews

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appointmentsRes, enquiriesRes, reviews] = await Promise.all([
          appointmentApi.getAppointments(),
          enquiryApi.getAllEnquiries(),
          reviewApiService.getReviews()
        ]);

        console.log("Dashboard fetched data:", reviews);

        // === Filter today's appointments ===
        const today = new Date().toISOString().split("T")[0]; // '2025-10-17'
        const appointments = appointmentsRes?.data || [];

        const filtered = appointments.filter((a) => {
          const createdDate = new Date(a.created_at).toISOString().split("T")[0];
          return createdDate === today;
        });

        // === Format appointments ===
        const formattedAppointments = filtered.map((a) => ({
          id: a.id,
          name: a.name || "Unknown",
          time: new Date(a.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          service: a.message || "General Consultation",
          status: a.status || "pending",
        }));

        setTodaysAppointments(formattedAppointments);
        setRecentReviews(reviews.data.reviews.slice(0, 3)); // Get top 5 recent reviews

        // === Stats cards ===
        const totalAppointments = appointmentsRes?.count || 0;
        const totalEnquiries = enquiriesRes?.total || 0;
        const totalReviews = reviews?.data?.stats.totalReviews || 0;

        setStats([
          {
            title: "Total Appointments",
            value: totalAppointments,
            icon: Calendar,
            color: "bg-blue-500",
            onClick: () => navigate("/admin/appointments"),
          },
          {
            title: "Total Reviews",
            value: totalReviews, // placeholder until you hook reviews
            icon: Star,
            color: "bg-yellow-500",
            onClick: () => navigate("/admin/reviews"),
          },
          {
            title: "Contact Inquiries",
            value: totalEnquiries,
            icon: MessageSquare,
            color: "bg-purple-500",
            onClick: () => navigate("/admin/contacts"),
          },
        ]);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
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
        {/* ✅ Pass today's appointments as props */}
        <TodayAppointments appointments={todaysAppointments} />
        <RecentReviews recentReviews = {recentReviews} />
      </div>
    </div>
  );
};

export default Dashboard;
