import React from "react";
import "./Appointment.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { AiFillHome } from "react-icons/ai";
import ContactForm from "../../components/ContactForm/ContactForm";

const Appointment = () => {
  const mapLink =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.8067988144744!2d91.62460057526732!3d26.13784167711747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a453f5d1ddfb5%3A0x24723f32967c4a82!2sAPEXION%20DENTAL%20CLINIC%20%2C%20DHARAPUR!5e0!3m2!1sen!2sin!4v1751188843624!5m2!1sen!2sin";

  return (
    <section
      className="appointment-section pb-70"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6">
            <div className="google-map">
              <iframe title="map" src={mapLink}></iframe>

              <div className="location-name">
                <AiFillHome />
                <p>
                  Apexion Dental Clinic, New Airport road, Dharapur, Guwahati
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="appointment-form-area">
              <SectionTitle
                subTitle="CONTACT FOR APPOINTMENT"
                title="Care at Apexion is pleasure"
                description="Contact us for a comfortable and personalized dental experience."
              />

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
