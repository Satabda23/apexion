const axios = require("axios");

/**
 * Verify reCAPTCHA token with Google's API
 * @param {string} token - The reCAPTCHA token from frontend
 * @returns {Object} - Verification result
 */
async function verifyRecaptcha(token) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "❌ RECAPTCHA_SECRET_KEY not found in environment variables"
      );
      return {
        success: false,
        "error-codes": ["missing-secret-key"],
      };
    }

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
        timeout: 10000, // 10 second timeout
      }
    );

    const result = response.data;

    // Log verification result for debugging
    if (result.success) {
      console.log("✅ reCAPTCHA verification successful");
    } else {
      console.log("❌ reCAPTCHA verification failed:", result["error-codes"]);
    }

    return result;
  } catch (error) {
    console.error("❌ reCAPTCHA verification request failed:", error.message);
    return {
      success: false,
      "error-codes": ["request-failed"],
    };
  }
}

/**
 * Get human-readable error message from reCAPTCHA error codes
 * @param {Array} errorCodes - Array of error codes from Google
 * @returns {string} - Human readable error message
 */
function getRecaptchaErrorMessage(errorCodes = []) {
  const errorMessages = {
    "missing-input-secret": "Server configuration error",
    "invalid-input-secret": "Server configuration error",
    "missing-input-response": "Please complete the reCAPTCHA verification",
    "invalid-input-response":
      "reCAPTCHA verification failed. Please try again.",
    "bad-request": "Invalid request. Please try again.",
    "timeout-or-duplicate": "reCAPTCHA expired. Please try again.",
    "request-failed":
      "Verification service unavailable. Please try again later.",
    "missing-secret-key": "Server configuration error",
  };

  // Return the first known error message, or a generic one
  for (const code of errorCodes) {
    if (errorMessages[code]) {
      return errorMessages[code];
    }
  }

  return "reCAPTCHA verification failed. Please try again.";
}

module.exports = {
  verifyRecaptcha,
  getRecaptchaErrorMessage,
};
