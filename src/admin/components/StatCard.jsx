// src/admin/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, change, icon: Icon, color, onClick }) => {
  // Map Tailwind color classes to SCSS color classes
  const getColorClass = (tailwindColor) => {
    const colorMap = {
      'bg-blue-500': 'blue',
      'bg-blue-600': 'blue',
      'bg-green-500': 'green',
      'bg-green-600': 'green',
      'bg-yellow-500': 'yellow',
      'bg-yellow-600': 'yellow',
      'bg-purple-500': 'purple',
      'bg-purple-600': 'purple',
      'bg-red-500': 'red',
      'bg-red-600': 'red'
    };
    return colorMap[tailwindColor] || 'blue';
  };

  const getChangeClass = (changeValue) => {
    if (!changeValue) return '';
    return changeValue.startsWith('+') ? 'positive' : 'negative';
  };

  return (
    <div 
      className={`stat-card ${onClick ? '' : 'no-hover'}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="stat-content">
        <div className="stat-info">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {change && (
            <p className={`stat-change ${getChangeClass(change)}`}>
              {change} from last week
            </p>
          )}
        </div>
        <div className={`stat-icon ${getColorClass(color)}`}>
          <Icon className="icon" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;