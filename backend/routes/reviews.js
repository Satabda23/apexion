const express = require("express");
const router = express.Router();
const { promisify } = require("util");
const db = require("../db");
const { query } = require("../db"); // adjust the path if your db.js is in a different folder

// Convert db.query to promise-based for consistent async/await usage
const queryAsync = promisify(db.query).bind(db);

// POST /api/reviews/user - Create a new review - used in frontend
router.post("/user", async (req, res) => {
  try {
    const { name, text, rating } = req.body;

    // Validate required fields
    if (!name || !text || !rating) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5",
      });
    }

    // Insert review
    const sql =
      "INSERT INTO user_reviews (name, text, rating) VALUES (?, ?, ?)";
    const result = await query(sql, [name, text, rating]);

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Review saved successfully",
      data: {
        id: result.insertId,
        name,
        text,
        rating,
      },
    });
  } catch (err) {
    console.error("addUserReview error:", err);
    res.status(500).json({
      success: false,
      error: "Database error",
      details: err.message,
    });
  }
});

// GET /api/reviews - Get all reviews
// router.get("/", async (req, res) => {
//   try {
//     const {
//       limit = 50,
//       offset = 0,
//       rating,
//       sortBy = "id",
//       sortOrder = "DESC",
//     } = req.query;

//     let query = `
//       SELECT
//         id,
//         name,
//         text,
//         rating,
//         created_at

//       FROM user_reviews
//     `;

//     const queryParams = [];

//     // Filter by rating if provided
//     if (rating && [1, 2, 3, 4, 5].includes(parseInt(rating))) {
//       query += " WHERE rating = ?";
//       queryParams.push(parseInt(rating));
//     }

//     // Add sorting
//     const validSortColumns = ["id", "name", "rating", "created_at"];
//     const validSortOrders = ["ASC", "DESC"];

//     const sortColumn = validSortColumns.includes(sortBy) ? sortBy : "id";
//     const sortDirection = validSortOrders.includes(sortOrder.toUpperCase())
//       ? sortOrder.toUpperCase()
//       : "DESC";

//     query += ` ORDER BY ${sortColumn} ${sortDirection}`;

//     // Add pagination
//     query += " LIMIT ? OFFSET ?";
//     queryParams.push(parseInt(limit), parseInt(offset));
//     console.log("Final Query:", query, "Params:", queryParams);
//     // Execute main query
//     const reviews = await queryAsync(query, queryParams);
//     console.log("Reviews fetched:", reviews.length);

//     // Get total count for pagination
//     let countQuery = "SELECT COUNT(*) as total FROM user_reviews";
//     const countParams = [];

//     if (rating && [1, 2, 3, 4, 5].includes(parseInt(rating))) {
//       countQuery += " WHERE rating = ?";
//       countParams.push(parseInt(rating));
//     }

//     const countResult = await queryAsync(countQuery, countParams);
//     const total = countResult[0].total;

//     // Calculate average rating
//     const avgQuery = "SELECT AVG(rating) as average_rating FROM user_reviews";
//     const avgResult = await queryAsync(avgQuery);
//     const averageRating = parseFloat(avgResult[0].average_rating) || 0;

//     res.json({
//       success: true,
//       message: "Reviews retrieved successfully",
//       data: {
//         reviews,
//         pagination: {
//           total,
//           limit: parseInt(limit),
//           offset: parseInt(offset),
//           hasMore: parseInt(offset) + parseInt(limit) < total,
//         },
//         stats: {
//           totalReviews: total,
//           averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     res.status(500).json({
//       success: false,
//       error: "Database error",
//     });
//   }
// });

// // GET /api/reviews/stats - Get review statistics
// router.get("/stats", async (req, res) => {
//   try {
//     // Get rating distribution
//     const distributionQuery = `
//       SELECT
//         rating,
//         COUNT(*) as count
//       FROM user_reviews
//       GROUP BY rating
//       ORDER BY rating DESC
//     `;

//     const distribution = await queryAsync(distributionQuery);

//     // Get total and average
//     const statsQuery = `
//       SELECT
//         COUNT(*) as total_reviews,
//         AVG(rating) as average_rating,
//         MIN(rating) as min_rating,
//         MAX(rating) as max_rating
//       FROM user_reviews
//     `;

//     const stats = await queryAsync(statsQuery);
//     const reviewStats = stats[0];

//     res.json({
//       success: true,
//       message: "Review statistics retrieved successfully",
//       data: {
//         totalReviews: reviewStats.total_reviews,
//         averageRating: Math.round(reviewStats.average_rating * 10) / 10,
//         minRating: reviewStats.min_rating,
//         maxRating: reviewStats.max_rating,
//         ratingDistribution: distribution,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching review stats:", error);
//     res.status(500).json({
//       success: false,
//       error: "Database error",
//     });
//   }
// });

// GET /api/reviews/latest - Get latest 3 reviews -used in frontend
router.get("/latest", async (req, res) => {
  try {
    const query = `
      SELECT 
        id, 
        name, 
        text, 
        rating,
        created_at
        
      FROM user_reviews 
      ORDER BY created_at DESC 
      LIMIT 6
    `;

    const reviews = await queryAsync(query);

    res.json({
      success: true,
      message: "Latest reviews retrieved successfully",
      data: {
        reviews,
        count: reviews.length,
      },
    });
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});

// GET /api/reviews/:id - Get a specific review by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "Valid review ID is required",
    });
  }

  try {
    const query = `
      SELECT 
        id, 
        name, 
        text, 
        rating,
        created_at
       
      FROM user_reviews 
      WHERE id = ?
    `;

    const reviews = await queryAsync(query, [parseInt(id)]);

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review retrieved successfully",
      data: reviews[0],
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});

module.exports = router;
