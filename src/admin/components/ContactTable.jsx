// src/admin/components/ContactTable.jsx
import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Mail, CheckCircle, Eye, Search } from 'lucide-react';

const ContactTable = ({ contacts, onReply, onMarkReplied, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="contact-table">
      <div className="table-header">
        <div className="table-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
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
              <option value="new">New</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="contacts-table">
          <thead className="table-head">
            <tr>
              <th className="header-cell">Contact</th>
              <th className="header-cell">Service Interest</th>
              <th className="header-cell">Message</th>
              <th className="header-cell">Date</th>
              <th className="header-cell">Status</th>
              <th className="header-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredContacts.map(contact => (
              <tr key={contact.id} className="table-row">
                <td className="table-cell contact-info" data-label="Contact">
                  <div>
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-email">{contact.email}</p>
                  </div>
                </td>
                <td className="table-cell service-info" data-label="Service Interest">
                  <div className="service-tags">
                    <span className="service-tag primary-service">
                      {contact.service}
                    </span>
                    {contact.otherService && (
                      <span className="service-tag other-service">
                        {contact.otherService}
                      </span>
                    )}
                  </div>
                </td>
                <td className="table-cell message-info" data-label="Message">
                  <p className="contact-message" title={contact.message}>
                    {contact.message}
                  </p>
                </td>
                <td className="table-cell date-info" data-label="Date">
                  {contact.createdAt}
                </td>
                <td className="table-cell" data-label="Status">
                  <StatusBadge status={contact.status} />
                </td>
                <td className="table-cell actions-cell" data-label="Actions">
                  <div className="actions-container">
                    <button 
                      onClick={() => onViewDetails(contact)}
                      className="action-button view-button"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onReply(contact)}
                      className="action-button reply-button"
                      title="Reply via Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    {contact.status === 'new' && (
                      <button 
                        onClick={() => onMarkReplied(contact.id)}
                        className="action-button mark-replied-button"
                        title="Mark as Replied"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredContacts.length === 0 && (
          <div className="empty-state">
            <p>No contact inquiries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactTable;