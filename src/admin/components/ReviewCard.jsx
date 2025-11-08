// src/admin/components/ReviewCard.jsx
import React from 'react';
import StatusBadge from './StatusBadge';
import { Star, CheckCircle, XCircle } from 'lucide-react';

const ReviewCard = ({ review, onApprove, onReject, onViewFull }) => {
  const { id, name, text, rating, status, createdAt } = review;

  const renderStars = () => {
    return Array(5).fill().map((_, i) => (
      <Star 
        key={i} 
        className={`star-icon ${i < rating ? 'filled' : 'empty'}`} 
      />
    ));
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <h3 className="reviewer-name">{name}</h3>
        <StatusBadge status={status} />
      </div>
      
      <div className="review-rating">
        <div className="rating-stars">
          {renderStars()}
        </div>
        <span className="rating-text">({rating}/5)</span>
      </div>
      
      <div className="review-content">
        <p className="review-text">
          {text.length > 150 ? (
            <>
              {text.substring(0, 150)}...
              <button 
                onClick={() => onViewFull(review)}
                className="read-more-btn"
              >
                Read more
              </button>
            </>
          ) : (
            text
          )}
        </p>
      </div>
      
      <div className="review-footer">
        <span className="review-date">{createdAt}</span>
        
       
          <div className="review-actions">
            <button 
              onClick={() => onApprove(id)}
              className="action-btn approve-btn"
            >
              <CheckCircle className="btn-icon" />
              <span>Approve</span>
            </button>
            <button 
              onClick={() => onReject(id)}
              className="action-btn reject-btn"
            >
              <XCircle className="btn-icon" />
              <span>Reject</span>
            </button>
          </div>

        {status === 'approve' && (
          <div className="status-indicator published">
            <CheckCircle className="status-icon" />
            <span>Published</span>
          </div>
        )}

        {status === 'reject' && (
          <div className="status-indicator rejected">
            <XCircle className="status-icon" />
            <span>Rejected</span>
          </div>
        )}
      </div>

      {/* <div className="review-details-section">
        <button 
          onClick={() => onViewFull(review)}
          className="view-details-btn"
        >
          <Eye className="details-icon" />
          <span>View Details</span>
        </button>
      </div> */}
    </div>
  );
};

export default ReviewCard;