import React from "react";
import { Link } from "react-router-dom";
import "./AboutBanner.scss";
import bannerOne from "../../assets/about/banner/banner_1.jpeg";
import bannerTwo from "../../assets/about/banner/banner_2.jpeg";
import pattern from "../../assets/banner/pattern.png";

const AboutBanner = () => {
  return (
    <section
      className="about-section"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="about-banner-text">
                  <h2>About Us</h2>
                  <p>
                    At Apexion, we believe that oral wellness is about more than
                    just routine checkups — it’s about helping you feel
                    confident, healthy, and amazing every single day. Our team
                    is dedicated to providing compassionate, personalized
                    service in a welcoming environment where your comfort and
                    confidence come first. We’re here to help you achieve
                    optimal oral health and a smile you can be proud of.
                  </p>

                  <div className="theme-btn">
                    <Link to="/contact">Contact Us</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-banner-img">
                  <img src={bannerOne} alt="about banner" />
                  <img src={bannerTwo} alt="about banner two" />
                  <img
                    className="pattern"
                    src={pattern}
                    alt="about banner two"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
