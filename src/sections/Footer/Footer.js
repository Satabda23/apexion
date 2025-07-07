import React from "react";
import logo from "../../assets/apexionlogo1.png";
import "./Footer.scss";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import call from "../../assets/footer/calling.png";
import time from "../../assets/footer/time.png";
import location from "../../assets/footer/location.png";

const Footer = () => {
  const footerMenu = [
    {
      name: "About Us",
      link: "/",
    },
    {
      name: "Services",
      link: "/",
    },
    {
      name: "Dentist",
      link: "/",
    },
    {
      name: "Blogs",
      link: "/",
    },
    {
      name: "FAQs",
      link: "/",
    },
  ];

  const footerContacts = [
    {
      title: "Phone Number",
      info: "+91-8296229544",
      icon: call,
    },
    {
      title: "Open Hour",
      info: "09:00 AM - 20:00 PM",
      icon: time,
    },
    {
      title: "Clinic Address",
      info: "New Airport road, Dharapur, Guwahati",
      icon: location,
    },
  ];

  return (
    <footer className="pt-100 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-5">
            <div className="footer-logo">
              <img src={logo} alt="logo" />
            </div>
            <p>
              Located in Guwahati, Apexion Dental Clinic offers expert dental
              care with advanced technology and a patient-first approach. Known
              for our precision, comfort, and results, we’re proud to be one of
              the top-rated clinics in the city.
            </p>

            <div className="social-logo">
              <p>Follow us on</p>
              <ul>
                <li>
                  <a href="/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-2">
            <div className="footer-link">
              <p>Quick Links</p>
              <ul>
                {footerMenu.map((singleMenu) => (
                  <li>
                    <Link to="/">{singleMenu.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="footer-contact">
              <p>Contact & Information</p>

              {footerContacts.map((footerContact) => {
                return (
                  <div className="contact-list">
                    <div className="contact-icon">
                      <img src={footerContact.icon} alt="call" />
                    </div>
                    <div className="contact-text">
                      <p>{footerContact.title}</p>
                      <h5>{footerContact.info}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="copy-text">
            <p>&copy; ApexionDentalClinic. All Right Reserved</p>
          </div>
          <div className="copy-links">
            <ul>
              <li>
                <Link to="/">Terms of Use</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
