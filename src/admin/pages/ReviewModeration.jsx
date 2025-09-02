// src/admin/pages/ReviewModeration.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReviewCard from '../components/ReviewCard';
import { Star, TrendingUp, Filter } from 'lucide-react';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      setReviews([
        {
          id: 1,
          name: 'Satabda Hazarika',
          text: 'One of the best clinics in town. I\'m happy with their professional behavior. The staff is very courteous and Dr. Deepika is extremely skilled. My root canal treatment was completely painless.',
          rating: 5,
          status: 'approved',
          createdAt: '2025-08-25'
        },
        {
          id: 2,
          name: 'Biju Pegu',
          text: 'Exceptional professionalism delivered by the team. The clinic is very clean and modern. Highly recommend for any dental work.',
          rating: 5,
          status: 'approved',
          createdAt: '2025-08-24'
        },
        {
          id: 3,
          name: 'Anonymous Patient',
          text: 'Great service but waiting time was a bit long. The treatment quality is excellent though. Would definitely come back.',
          rating: 4,
          status: 'pending',
          createdAt: '2025-08-27'
        },
        {
          id: 4,
          name: 'Ravi Kumar',
          text: 'Doctor explained everything clearly before the procedure. Very satisfied with the teeth whitening results. Fair pricing too.',
          rating: 5,
          status: 'pending',
          createdAt: '2025-08-26'
        },
        {
          id: 5,
          name: 'Priya Das',
          text: 'Excellent dental care. The clinic has all modern equipment. Dr. Deepika is very gentle and experienced.',
          rating: 5,
          status: 'approved',
          createdAt: '2025-08-23'
        },
        {
          id: 6,
          name: 'Unhappy Customer',
          text: 'Treatment was okay but receptionist was rude. Also felt rushed during consultation.',
          rating: 2,
          status: 'pending',
          createdAt: '2025-08-28'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredReviews = reviews.filter(review => {
    if (filterStatus === 'all') return true;
    return review.status === filterStatus;
  });

  const handleApprove = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'approved' } : review
    ));
    const review = reviews.find(r => r.id === reviewId);
    toast.success(`Review by ${review.name} approved`);
  };

  const handleReject = (reviewId) => {
    if (window.confirm('Are you sure you want to reject this review? This action cannot be undone.')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
      toast.success('Review rejected and removed');
    }
  };

  const handleViewFull = (review) => {
    toast.info(`Opening full review by ${review.name}`);
    // In real app, open detailed modal with full review
  };

  const getReviewStats = () => {
    const total = reviews.length;
    const approved = reviews.filter(r => r.status === 'approved').length;
    const pending = reviews.filter(r => r.status === 'pending').length;
    
    const ratingBreakdown = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    return {
      total,
      approved,
      pending,
      ratings: ratingBreakdown,
      averageRating: averageRating.toFixed(1)
    };
  };

  const stats = getReviewStats();

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <Star className="title-icon" />
            Reviews & Testimonials
          </h1>
          <p className="page-description">Moderate patient reviews and manage testimonials</p>
        </div>
        <div className="header-actions">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Review Statistics */}
      <div className="review-stats">
        <div className="stat-card">
          <p className="stat-number total">{stats.total}</p>
          <p className="stat-label">Total Reviews</p>
        </div>
        <div className="stat-card">
          <p className="stat-number pending">{stats.pending}</p>
          <p className="stat-label">Pending</p>
        </div>
        <div className="stat-card">
          <p className="stat-number approved">{stats.approved}</p>
          <p className="stat-label">Approved</p>
        </div>
        <div className="stat-card">
          <div className="rating-display">
            <Star className="rating-star" />
            <p className="stat-number average">{stats.averageRating}</p>
          </div>
          <p className="stat-label">Average Rating</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="rating-distribution">
        <h3 className="distribution-title">
          <TrendingUp className="title-icon" />
          Rating Distribution
        </h3>
        <div className="distribution-chart">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratings[rating] || 0;
            const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
            
            return (
              <div key={rating} className="rating-row">
                <div className="rating-label">
                  <span className="rating-number">{rating}</span>
                  <Star className="rating-star" />
                </div>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="rating-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="reviews-grid">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewFull={handleViewFull}
            />
          ))
        ) : (
          <div className="empty-state">
            <Star className="empty-icon" />
            <p className="empty-message">No reviews found for the selected filter.</p>
            <button 
              onClick={() => setFilterStatus('all')}
              className="show-all-btn"
            >
              Show all reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModeration;