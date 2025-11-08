import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReviewCard from "../components/ReviewCard";
import { Star, TrendingUp } from "lucide-react";
import {reviewApiService} from "../services/reviewApiService";


const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    ratings: {},
    averageRating: 0,
  });

  // ✅ Fetch reviews & stats from API
 useEffect(() => {
  const fetchReviews = async () => {
    try {
      setLoading(true);
      console.log("Fetching reviews and stats...");

      // Sequentially fetch reviews and then stats
      const reviewRes = await reviewApiService.getReviews();
      const statsRes = await reviewApiService.getReviewStats();

      console.log("reviewRes", reviewRes, "statsRes", statsRes);

      setReviews(reviewRes.data.reviews || []);
      setStats({
        total: statsRes.data.totalReviews || 0,
ratings: statsRes.data.ratingDistribution || {},
        averageRating: statsRes.data.averageRating?.toFixed(1) || 0,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();
}, []);


  // ✅ Filter reviews by status (all/pending/approved)
  const filteredReviews = reviews.filter((review) => {
    if (filterStatus === "all") return true;
    return review.status === filterStatus;
  });

    // const filteredReviews = [
    //     {
    //       id: 1,
    //       name: 'Satabda Hazarika',
    //       text: 'One of the best clinics in town. I\'m happy with their professional behavior. The staff is very courteous and Dr. Deepika is extremely skilled. My root canal treatment was completely painless.',
    //       rating: 5,
    //       status: 'approved',
    //       createdAt: '2025-08-25'
    //     },
    //     {
    //       id: 2,
    //       name: 'Biju Pegu',
    //       text: 'Exceptional professionalism delivered by the team. The clinic is very clean and modern. Highly recommend for any dental work.',
    //       rating: 5,
    //       status: 'approved',
    //       createdAt: '2025-08-24'
    //     },
    //     {
    //       id: 3,
    //       name: 'Anonymous Patient',
    //       text: 'Great service but waiting time was a bit long. The treatment quality is excellent though. Would definitely come back.',
    //       rating: 4,
    //       status: 'pending',
    //       createdAt: '2025-08-27'
    //     },
    //     {
    //       id: 4,
    //       name: 'Ravi Kumar',
    //       text: 'Doctor explained everything clearly before the procedure. Very satisfied with the teeth whitening results. Fair pricing too.',
    //       rating: 5,
    //       status: 'pending',
    //       createdAt: '2025-08-26'
    //     },
    //     {
    //       id: 5,
    //       name: 'Priya Das',
    //       text: 'Excellent dental care. The clinic has all modern equipment. Dr. Deepika is very gentle and experienced.',
    //       rating: 5,
    //       status: 'approved',
    //       createdAt: '2025-08-23'
    //     },
    //     {
    //       id: 6,
    //       name: 'Unhappy Customer',
    //       text: 'Treatment was okay but receptionist was rude. Also felt rushed during consultation.',
    //       rating: 2,
    //       status: 'pending',
    //       createdAt: '2025-08-28'
    //     }
    //   ]

  // ✅ Approve review
  const handleApprove = async (reviewId) => {
    try {
      const review = reviews.find((r) => r.id === reviewId);
      await reviewApiService.updateReview(reviewId, { status: "approve" });
      setReviews(
        reviews.map((r) =>
          r.id === reviewId ? { ...r, status: "approved" } : r
        )
      );
      toast.success(`Review by ${review.name} approved`);
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  };

  // ✅ Reject/Delete review
  const handleReject = async (reviewId) => {
    if (
      window.confirm(
        "Are you sure you want to reject this review? This action cannot be undone."
      )
    ) {
      try {
        await reviewApiService.updateReview(reviewId, { status: "reject" });
        setReviews(reviews.filter((r) => r.id !== reviewId));
        toast.success("Review rejected and removed");
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Failed to remove review");
      }
    }
  };

  // ✅ View full review (e.g., show in modal later)
  const handleViewFull = (review) => {
    toast.info(`Opening full review by ${review.name}`);
    // Optional: open modal here
  };

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
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <Star className="title-icon" />
            Reviews & Testimonials
          </h1>
          <p className="page-description">
            Moderate patient reviews and manage testimonials
          </p>
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
          {[5, 4, 3, 2, 1].map((rating) => {
             const ratingData = stats.ratings[rating] || { count: 0 };
            const count = ratingData.count || 0;
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
          filteredReviews.map((review) => (
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
            <p className="empty-message">
              No reviews found for the selected filter.
            </p>
            <button
              onClick={() => setFilterStatus("all")}
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
