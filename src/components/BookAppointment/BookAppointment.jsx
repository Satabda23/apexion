
// ===== FRONTEND: BookAppointment.jsx =====
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";
import "./BookAppointment.scss";

// For screen reader accessibility (required by react-modal)
Modal.setAppElement("#root");

const BookAppointment = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState(null); // 🔥 Store the token
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🔥 Add ref to reset reCAPTCHA
  const recaptchaRef = useRef(null);

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info", // success | error | info
  });

  const openModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Fix: Capture the actual token value
  const handleCaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  // 🔥 Handle reCAPTCHA expiry
  const handleCaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Check for reCAPTCHA token instead of just verified state
    if (!recaptchaToken) {
      openModal("Verification Failed", "Please complete the reCAPTCHA verification.", "error");
      return;
    }

    if (!isValidPhone(formData.phone)) {
      openModal("Invalid Phone Number", "Please enter a valid 10-digit phone number.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // 🔥 Send reCAPTCHA token to backend
      const res = await fetch(`${process.env.BACKEND_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken // 🔥 Include the token
        }),
      });

      const data = await res.json();

      if (data.success) {
        openModal("Appointment Booked", "Your appointment has been submitted successfully.", "success");
        setFormData({ name: "", phone: "", message: "" });
        setRecaptchaToken(null);
        // 🔥 Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        openModal("Error", data.message || "Failed to submit appointment.", "error");
        // 🔥 Reset reCAPTCHA on error
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
      }
    } catch (err) {
      console.error(err);
      openModal("Network Error", "Unable to reach the server. Please try again later.", "error");
      // 🔥 Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <h2>Book an Appointment</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" value={formData.message} onChange={handleChange} />
        </div>

        <div className="form-group">
          {/* 🔥 Add ref and handle expiry */}
          <ReCAPTCHA 
            ref={recaptchaRef}
            sitekey="6LcLv64rAAAAAG4DMFP2A_OeTNCTv4MwdiqlBAxE" 
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
          />
        </div>

        <button type="submit" className="appointment-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* ✅ Modal for Feedback */}
      <Modal
        isOpen={modal.isOpen}
        onRequestClose={closeModal}
        contentLabel="Appointment Modal"
        className={`feedback-modal ${modal.type}`}
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
      >
        <h2>{modal.title}</h2>
        <p>{modal.message}</p>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </>
  );
};

export default BookAppointment;