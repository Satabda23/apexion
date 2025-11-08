import adminApi from "./adminApi";
class ReviewApiService {
  // ✅ Get all reviews with filters, sorting, and pagination
  async getReviews(filters = {}) {
    const params = new URLSearchParams();

    if (filters.rating) params.append("rating", filters.rating);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.offset) params.append("offset", filters.offset);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    return adminApi.getReviews(params.toString());
  }

  // ✅ Get review statistics (average, count, distribution)
  async getReviewStats() {
    return adminApi.request(`/admin/reviews/stats`);
  }

  // ✅ Get latest reviews (default: latest 6)
  async getLatestReviews(limit = 6) {
    return adminApi.request(`/reviews/latest?limit=${limit}`);
  }

  // ✅ Create a new review (client-side validation included)
  async createReview(reviewData) {
    const errors = this.validateReviewData(reviewData);
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(", ")}`);
    }

    return adminApi.request("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  }

  // ✅ Delete a review by ID
  async deleteReview(id) {
    if (!id) throw new Error("Review ID is required");
    return adminApi.request(`/reviews/${id}`, {
      method: "DELETE",
    });
  }

  // ✅ Update review text or rating
  async updateReview(id, updatedData) {
    // const errors = this.validateReviewData(updatedData, { isUpdate: true });
    // if (errors.length > 0) {
    //   throw new Error(`Validation errors: ${errors.join(", ")}`);
    // }

    return adminApi.request(`/admin/reviews/${id}/status`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  }

  // ✅ Validate review data
  validateReviewData(data, { isUpdate = false } = {}) {
    const errors = [];

    if (!isUpdate || data.name) {
      if (!data.name || data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters long");
      }
    }

    if (!isUpdate || data.text) {
      if (!data.text || data.text.trim().length < 5) {
        errors.push("Review text must be at least 5 characters long");
      }
    }

    if (!isUpdate || data.rating) {
      if (
        !data.rating ||
        isNaN(data.rating) ||
        data.rating < 1 ||
        data.rating > 5
      ) {
        errors.push("Rating must be between 1 and 5");
      }
    }

    return errors;
  }

  // ✅ Format review for display
  formatReview(review) {
    return {
      ...review,
      formattedDate: new Date(review.created_at).toLocaleDateString(),
      starDisplay: "★".repeat(review.rating) + "☆".repeat(5 - review.rating),
    };
  }

  // ✅ Get reviews summary (quick stats + latest)
  async getReviewSummary() {
    const [stats, latest] = await Promise.all([
      this.getReviewStats(),
      this.getLatestReviews(),
    ]);

    return {
      totalReviews: stats.data.totalReviews,
      averageRating: stats.data.averageRating,
      ratingDistribution: stats.data.ratingDistribution,
      latestReviews: latest.data.reviews,
    };
  }

  // ✅ Export reviews (CSV or JSON)
  async exportReviews(filters = {}, format = "csv") {
    const params = new URLSearchParams({ ...filters, format });
    return adminApi.request(`/reviews/export?${params}`, {
      method: "GET",
    });
  }
}

export const reviewApiService = new ReviewApiService();
