// src/admin/components/RecentReviews.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import StatusBadge from './StatusBadge';
import { Star, MessageSquare } from 'lucide-react';

const RecentReviews = ({recentReviews}) => {
  const navigate = useNavigate();
  
  // This will be replaced with actual data from API
  // const recentReviews = [
  //   {
  //     id: 1,
  //     name: 'Satabda Hazarika',
  //     text: 'One of the best clinics in town. Professional behavior.',
  //     rating: 5,
  //     status: 'approved',
  //     createdAt: '2025-08-25'
  //   },
  //   {
  //     id: 2,
  //     name: 'Anonymous Patient',
  //     text: 'Great service but waiting time was long',
  //     rating: 4,
  //     status: 'pending',
  //     createdAt: '2025-08-27'
  //   },
  //   {
  //     id: 3,
  //     name: 'Biju Pegu',
  //     text: 'Exceptional professionalism delivered by the team.',
  //     rating: 5,
  //     status: 'approved',
  //     createdAt: '2025-08-24'
  //   }
  // ];

  return (
    <div className="recent-reviews">
      <div className="reviews-header">
        <h3 className="header-title">
          <MessageSquare className="title-icon" />
          Recent Reviews
        </h3>
        <button 
          onClick={() => navigate('/admin/reviews')}
          className="view-all-btn"
        >
          View All
        </button>
      </div>

      <div className="reviews-list">
        {recentReviews.length > 0 ? (
          recentReviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <p className="reviewer-name">{review.name}</p>
                <div className="review-meta">
                  <div className="rating-stars">
                    {Array(review.rating).fill().map((_, i) => (
                      <Star key={i} className="star-icon" />
                    ))}
                  </div>
                  {/* <StatusBadge status={review.status} /> */}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
              <p className="review-date">{review.createdAt}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Star className="empty-icon" />
            <p className="empty-message">No recent reviews</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentReviews;