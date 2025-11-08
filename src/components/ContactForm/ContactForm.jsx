import { useState } from "react";
import Modal from "react-modal";
import icon from "../../assets/banner/icons/Calling.png";
import "./ContactForm.scss";

// Modal accessibility target
Modal.setAppElement("#root");

const ContactForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
    otherService: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.service) {
      openModal("Missing Fields", "Please fill out all required fields.", "error");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/submit-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          service: formData.service,
          otherService: formData.otherService || null,
        }),
      });

      console.log("completed")

      const data = await response.json();
      console.log(data)

      if (data.success) {
        openModal("Submitted!", "Your appointment request has been saved.", "success");
        setFormData({
          name: "",
          email: "",
          message: "",
          service: "",
          otherService: "",
        });
        setSelectedService("");
      } else {
        openModal("Error", data.message || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error(error);
      openModal("Error", "Could not connect to server.", "error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="row">
          {/* Name */}
          <div className="col-lg-6">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your name..."
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-lg-6">
            <div className="form-group">
              <label>E-mail Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email address..."
                required
              />
            </div>
          </div>

          {/* Service dropdown */}
          <div className="col-lg-6">
            <div className="form-group">
              <label>Service</label>
              <select
                name="service"
                className="form-control"
                value={formData.service}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedService(e.target.value);
                }}
                required
              >
                <option value="">Select Service</option>
                <option value="Dentures">Dentures</option>
                <option value="Implants">Implants</option>
                <option value="Teeth Whitening">Teeth Whitening</option>
                <option value="Root Canal">Root Canal</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Sub-services if Others is selected */}
            {selectedService === "Others" && (
              <div className="form-group mt-2">
                <label>Other Services</label>
                <select
                  name="otherService"
                  className="form-control"
                  value={formData.otherService}
                  onChange={handleChange}
                >
                  <option value="">Select a specific service</option>
                  <option value="Orthodontics">Orthodontics</option>
                  <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                  <option value="Oral Surgery">Oral Surgery</option>
                </select>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="col-lg-12">
            <div className="form-group">
              <label>Messages</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your message..."
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-lg-6">
            <button type="submit" className="btn appointment-btn">
              Book an appointment
            </button>
          </div>

          {/* Contact Call Section */}
          <div className="col-lg-6">
            <div className="appointment-call">
              <div className="icon">
                <img src={icon} alt="icon" />
              </div>
              <div className="call-text">
                <p>Our Clinic Contact</p>
                <h6>8296229544</h6>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Feedback Modal */}
      <Modal
        isOpen={modal.isOpen}
        onRequestClose={closeModal}
        contentLabel="Contact Feedback"
        className={`feedback-modal ${modal.type}`}
        overlayClassName="modal-overlay"
        closeTimeoutMS={300}
      >
        <h2>{modal.title}</h2>
        <p>{modal.message}</p>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </>
  );
};

export default ContactForm;
