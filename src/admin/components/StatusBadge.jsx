// src/admin/components/StatusBadge.jsx
import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { 
      icon: AlertCircle 
    },
    confirmed: { 
      icon: Clock 
    },
    completed: { 
      icon: CheckCircle 
    },
    cancelled: { 
      icon: XCircle 
    },
    approved: { 
      icon: CheckCircle 
    },
    new: { 
      icon: AlertCircle 
    },
    replied: { 
      icon: CheckCircle 
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  // Normalize status for CSS class
  const normalizedStatus = status ? status.toLowerCase() : 'pending';

  return (
    <span className={`status-badge ${normalizedStatus}`}>
      <Icon className="status-icon" />
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default StatusBadge;