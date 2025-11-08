const express = require("express");
const router = express.Router();
const { query, queryOne } = require("../db");

// ✅ GET /api/reviews - Fetch reviews with filters, sorting & pagination
router.get("/", async (req, res) => {
  try {
    const {
      limit = 50,
      offset = 0,
      rating,
      sortBy = "id",
      sortOrder = "DESC",
    } = req.query;

    let sql = `
      SELECT 
        id, 
        name, 
        text, 
        rating,
        status,
        created_at
      FROM user_reviews
    `;

    const params = [];

    // Filter by rating if provided
    if (rating && [1, 2, 3, 4, 5].includes(parseInt(rating))) {
      sql += " WHERE rating = ?";
      params.push(parseInt(rating));
    }

    // Add sorting
    const validSortColumns = ["id", "name", "rating", "created_at"];
    const validSortOrders = ["ASC", "DESC"];

    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : "id";
    const sortDirection = validSortOrders.includes(sortOrder.toUpperCase())
      ? sortOrder.toUpperCase()
      : "DESC";

    sql += ` ORDER BY ${sortColumn} ${sortDirection}`;

    // Add pagination
    sql += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    console.log("Final Query:", sql, "Params:", params);

    // Execute query
    const reviews = await query(sql, params);

    // Get total count for pagination
    let countSql = "SELECT COUNT(*) as total FROM user_reviews";
    const countParams = [];

    if (rating && [1, 2, 3, 4, 5].includes(parseInt(rating))) {
      countSql += " WHERE rating = ?";
      countParams.push(parseInt(rating));
    }

    const countResult = await queryOne(countSql, countParams);
    const total = countResult ? countResult.total : 0;

    // Calculate average rating
    const avgSql = "SELECT AVG(rating) as average_rating FROM user_reviews";
    const avgResult = await queryOne(avgSql);
    const averageRating = parseFloat(avgResult?.average_rating || 0);

    res.json({
      success: true,
      message: "Reviews retrieved successfully",
      data: {
        reviews,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + parseInt(limit) < total,
        },
        stats: {
          totalReviews: total,
          averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        },
      },
    });
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});

// ✅ GET /api/reviews/stats - Get review statistics
router.get("/stats", async (req, res) => {
  try {
    // Rating distribution
    const distributionSql = `
      SELECT 
        rating,
        COUNT(*) as count
      FROM user_reviews 
      GROUP BY rating 
      ORDER BY rating DESC
    `;
    const distribution = await query(distributionSql);

    // Total and average stats
    const statsSql = `
      SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        MIN(rating) as min_rating,
        MAX(rating) as max_rating
      FROM user_reviews
    `;
    const stats = await queryOne(statsSql);

    res.json({
      success: true,
      message: "Review statistics retrieved successfully",
      data: {
        totalReviews: stats.total_reviews,
        averageRating: Math.round(stats.average_rating * 10) / 10,
        minRating: stats.min_rating,
        maxRating: stats.max_rating,
        ratingDistribution: distribution,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching review stats:", error);
    res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["approve", "reject"];

    if (!status || !validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: "Invalid status. Must be one of: approved, rejected",
      });
    }

    // Check if review exists
    const existingReview = await queryOne(
      "SELECT id FROM user_reviews WHERE id = ?",
      [id]
    );

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    // Update the status
    await query("UPDATE user_reviews SET status = ? WHERE id = ?", [
      status.toLowerCase(),
      id,
    ]);

    res.json({
      success: true,
      message: `Review status updated to '${status}'`,
      data: {
        id,
        status: status.toLowerCase(),
      },
    });
  } catch (error) {
    console.error("❌ Error updating review status:", error);
    res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});
module.exports = router;
