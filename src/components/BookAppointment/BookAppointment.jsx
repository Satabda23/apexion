import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";
import "./BookAppointment.scss";

// For screen reader accessibility (required by react-modal)
Modal.setAppElement("#root");

const BookAppointment = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [verified, setVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCaptchaChange = () => {
    setVerified(true);
  };

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      openModal("Verification Failed", "Please verify you are not a robot.", "error");
      return;
    }

    if (!isValidPhone(formData.phone)) {
      openModal("Invalid Phone Number", "Please enter a valid 10-digit phone number.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        openModal("Appointment Booked", "Your appointment has been submitted successfully.", "success");
        setFormData({ name: "", phone: "", message: "" });
        setVerified(false);
      } else {
        openModal("Error", data.message || "Failed to submit appointment.", "error");
      }
    } catch (err) {
      console.error(err);
      openModal("Network Error", "Unable to reach the server. Please try again later.", "error");
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
          <ReCAPTCHA sitekey="6LfnsXErAAAAAF0CXaMiClaxBbMn0cgMpWuXIdOV" onChange={handleCaptchaChange} />
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
