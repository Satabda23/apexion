import React from "react";
import "./Emergency.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import EmergencyImg from "../../assets/emergency.jpeg";
import { Link } from "react-router-dom";

const Emergency = () => {
  return (
    <section
      className="emergency-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="emergency-img">
              <img src={EmergencyImg} alt="Emergency" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="emergency-text">
              <SectionTitle
                subTitle="tooth trivia"
                title="Take goood care of your teeth and see your doctor regularly"
                description="People with Gum's disease have higher risk of alzheimer's diseases."
              />

              <div className="theme-btn">
                <Link to="/contact">Book an appointment</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emergency;
