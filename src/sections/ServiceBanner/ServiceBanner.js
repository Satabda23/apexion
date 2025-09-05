import React from "react";
import { Link } from "react-router-dom";
import "./ServiceBanner.scss";
import serviceBanner from "../../assets/servicePage/1.jpeg";

const ServiceBanner = () => {
  return (
    <section className="service-banner-section section-common section-bg">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-6">
                <div
                  className="service-banner-text"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <h2>SERVICES</h2>
                  <p>
                    Whether it's dentures, root canals, whitening, or implants,
                    these treatments often get misunderstood! We're here to show
                    you how these procedures can actually improve your comfort
                    and confidence
                  </p>
                  <div className="theme-btn">
                    <Link to="/contact">Book an appointment</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-6">
                <div
                  className="service-banner-img"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <div className="banner-image-container">
                    <img
                      src={serviceBanner}
                      alt="Root canal treatment service"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
