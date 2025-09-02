import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Navbar from "../../components/Navbar/Navbar";
import "./Contactus.scss";
import BookAppointment from "../../components/BookAppointment/BookAppointment";
import Footer from "../../sections/Footer/Footer";

const Contactus = () => {
  return (
    <>
      <section className="section-bg section-common contact-page-header">
        <Navbar />
        <SectionTitle
          title="Book an Appointment"
          description="Our consulation fees is just affordable."
        />
      </section>
      <section
        className="contact-form-area"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <BookAppointment />
      </section>
      <Footer />
    </>
  );
};

export default Contactus;
