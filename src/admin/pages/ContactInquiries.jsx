// src/admin/pages/ContactInquiries.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MessageSquare } from 'lucide-react';
import ContactTable from '../components/ContactTable';
import enquiryApi from '../services/enquiryApi'; // ✅ Import API service

const ContactInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch enquiries from backend
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const data = await enquiryApi.getAllEnquiries();
        const formatted = (data.enquiries || []).map(enquiryApi.formatEnquiry);
        setContacts(formatted);
      } catch (error) {
        toast.error("Failed to load contact enquiries.");
        console.error("Enquiry fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleReply = (contact) => {
    toast.info(`Opening email composer for ${contact.name}`);
    // In real app, open email composer or modal
  };

const handleMarkReplied = async (contactId) => {
  try {
    const resp = await enquiryApi.updateStatus(contactId, "replied");
    // depending on API wrapper, resp might be actual response or { success: true, updated }
    if (resp && resp.success === false) {
      throw new Error(resp.message || "Failed to update");
    }

    // If backend returned updated row: use resp.updated or resp.data.updated
    const updatedRow = resp.updated || (resp.data && resp.data.updated) || null;

    setContacts(prev =>
      prev.map(c =>
        c.id === contactId ? { ...c, status: "replied", ...(updatedRow ? {
          formattedDate: updatedRow.formatted_date || c.formattedDate
        } : {}) } : c
      )
    );
    toast.success("Contact marked as replied");
  } catch (err) {
    console.error("Failed to update status", err);
    toast.error("Failed to update status");
  }
};



  const handleViewDetails = (contact) => {
    toast.info(`Opening details for ${contact.name}`);
    // In real app, open detailed view modal
  };

  const getContactStats = () => {
    const total = contacts.length;
    const newContacts = contacts.filter(c => c.status === 'new').length;
    const replied = contacts.filter(c => c.status === 'replied').length;
    const closed = contacts.filter(c => c.status === 'closed').length;

    const serviceBreakdown = contacts.reduce((acc, contact) => {
      const service = contact.otherService || contact.service || "Unknown";
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      new: newContacts,
      replied,
      closed,
      services: serviceBreakdown
    };
  };

  const stats = getContactStats();

  if (loading) {
    return (
      <div className="contact-inquiries">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-inquiries">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <MessageSquare className="title-icon" />
            Contact Inquiries
          </h1>
          <p className="page-description">Manage contact form submissions and service inquiries</p>
        </div>
      </div>

      {/* Contact Statistics */}
      <div className="contact-stats">
        <div className="stat-card">
          <p className="stat-number total">{stats.total}</p>
          <p className="stat-label">Total Inquiries</p>
        </div>
        <div className="stat-card">
          <p className="stat-number new">{stats.new}</p>
          <p className="stat-label">New</p>
        </div>
        {/* <div className="stat-card">
          <p className="stat-number replied">{stats.replied}</p>
          <p className="stat-label">Replied</p>
        </div>
        <div className="stat-card">
          <p className="stat-number closed">{stats.closed}</p>
          <p className="stat-label">Closed</p>
        </div> */}
      </div>

      {/* Contacts Table */}
      <ContactTable
        contacts={contacts}
        onReply={handleReply}
        onMarkReplied={handleMarkReplied}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default ContactInquiries;
