// src/admin/pages/ContactInquiries.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ContactTable from '../components/ContactTable';
import { MessageSquare, Download } from 'lucide-react';

const ContactInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      setContacts([
        {
          id: 1,
          name: 'Sanjay Singh',
          email: 'sanjay@example.com',
          service: 'Implants',
          message: 'I am interested in dental implants procedure. Could you please provide more information about the cost and procedure?',
          createdAt: '2025-08-27',
          status: 'new'
        },
        {
          id: 2,
          name: 'Meera Das',
          email: 'meera@example.com',
          service: 'Dentures',
          otherService: null,
          message: 'My elderly mother needs dentures. What is the process and how long does it take?',
          createdAt: '2025-08-26',
          status: 'replied'
        },
        {
          id: 3,
          name: 'Rohit Sharma',
          email: 'rohit@example.com',
          service: 'Teeth Whitening',
          message: 'Looking for teeth whitening treatment. What are the available options and pricing?',
          createdAt: '2025-08-25',
          status: 'new'
        },
        {
          id: 4,
          name: 'Anita Goswami',
          email: 'anita@example.com',
          service: 'Root Canal',
          message: 'Experiencing severe tooth pain. Need urgent root canal treatment. Are you available this week?',
          createdAt: '2025-08-24',
          status: 'replied'
        },
        {
          id: 5,
          name: 'Deepak Kumar',
          email: 'deepak@example.com',
          service: 'Others',
          otherService: 'Orthodontics',
          message: 'My 14-year old daughter needs braces. What is the treatment duration and cost?',
          createdAt: '2025-08-23',
          status: 'closed'
        },
        {
          id: 6,
          name: 'Priya Kalita',
          email: 'priya.k@example.com',
          service: 'Others',
          otherService: 'Oral Surgery',
          message: 'Need wisdom tooth extraction. Is it a complicated procedure? What should I expect?',
          createdAt: '2025-08-22',
          status: 'new'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleReply = (contact) => {
    toast.info(`Opening email composer for ${contact.name}`);
    // In real app, open email composer or modal
  };

  const handleMarkReplied = (contactId) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, status: 'replied' } : contact
    ));
    toast.success('Contact marked as replied');
  };

  const handleViewDetails = (contact) => {
    toast.info(`Opening details for ${contact.name}`);
    // In real app, open detailed view modal
  };

  const handleExportContacts = () => {
    toast.success('Contact data exported successfully');
    // In real app, trigger CSV/Excel export
  };

  const getContactStats = () => {
    const total = contacts.length;
    const newContacts = contacts.filter(c => c.status === 'new').length;
    const replied = contacts.filter(c => c.status === 'replied').length;
    const closed = contacts.filter(c => c.status === 'closed').length;
    
    // Service breakdown
    const serviceBreakdown = contacts.reduce((acc, contact) => {
      const service = contact.otherService || contact.service;
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
        <button 
          onClick={handleExportContacts}
          className="export-btn"
        >
          <Download className="export-icon" />
          <span>Export Data</span>
        </button>
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
        <div className="stat-card">
          <p className="stat-number replied">{stats.replied}</p>
          <p className="stat-label">Replied</p>
        </div>
        <div className="stat-card">
          <p className="stat-number closed">{stats.closed}</p>
          <p className="stat-label">Closed</p>
        </div>
      </div>

      {/* Service Interest Breakdown */}
      <div className="service-breakdown">
        <h3 className="breakdown-title">Service Interest Breakdown</h3>
        <div className="services-grid">
          {Object.entries(stats.services).map(([service, count]) => (
            <div key={service} className="service-item">
              <p className="service-count">{count}</p>
              <p className="service-name">{service}</p>
            </div>
          ))}
        </div>
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