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
      link: "/about", // Fixed: Changed from "/" to "/about"
    },
    {
      name: "Services",
      link: "/services", // Fixed: Changed from "/" to "/services"
    },
    {
      name: "FAQs",
      link: "/about", // You can update this when you create FAQ page
    },
    {
      name: "Contact Us",
      link: "/contact", // Fixed: Changed from "/" to "/contact"
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
      info: "10:00 AM - 07:00 PM",
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
              for our precision, comfort, and results, we're proud to be one of
              the top-rated clinics in the city.
            </p>

            <div className="social-logo">
              <p>Follow us on</p>
              <ul>
                <li>
                  <a href="/" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="/" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="/" aria-label="Instagram">
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
                {footerMenu.map((singleMenu, index) => (
                  <li key={index}>
                    {" "}
                    {/* Fixed: Added key prop */}
                    <Link to={singleMenu.link}>{singleMenu.name}</Link>{" "}
                    {/* Fixed: Using singleMenu.link instead of hardcoded "/" */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="footer-contact">
              <p>Contact & Information</p>

              {footerContacts.map((footerContact, index) => {
                return (
                  <div className="contact-list" key={index}>
                    {" "}
                    {/* Fixed: Added key prop */}
                    <div className="contact-icon">
                      <img src={footerContact.icon} alt={footerContact.title} />
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
                <Link to="/TermsOfUse">Terms of Use</Link>{" "}
                {/* Added class for easier debugging */}
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>{" "}
                {/* Fixed: Added actual route */}
              </li>
            </ul>
          </div>
        </div>
        <div className="developer-credit">
          <p>
            Designed, Developed, and Maintained by{" "}
            <span className="company-name">Gratia Technology Pvt Ltd</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
