import React, { useState } from "react";
import axios from "axios";
import "./Testimonial.scss";

const SubmitTestimonial = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Send to backend
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/reviews/user`,
        formData
      );
      console.log("Review submitted:", formData);
      // 2. Update UI immediately
      if (onSubmit) {
        onSubmit({
          name: formData.name,
          description: formData.text,
          rating: formData.rating,
        });
      }

      // 3. Reset form fields
      setFormData({ name: "", text: "", rating: 5 });
      setSubmitted(true);

      // 4. Auto-hide thank you message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting review", err);
    }
  };

  return (
    <div className="testimonial-form">
      <h3>Leave Your Feedback</h3>

      {/* ✅ Show thank-you message above the form */}
      {submitted && (
        <p style={{ color: "green" }}>✅ Thank you for your review!</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <textarea
          name="text"
          placeholder="Your review"
          rows="4"
          onChange={handleChange}
          value={formData.text}
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          onChange={handleChange}
          value={formData.rating}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default SubmitTestimonial;
