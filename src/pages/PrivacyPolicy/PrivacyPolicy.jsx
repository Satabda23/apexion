import React, { useEffect } from "react";
import "./PrivacyPolicy.scss";
import { scrollToSection, initializeAccordion } from "./PrivacyPolicy.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Footer from "../../sections/Footer/Footer.js";

const PrivacyPolicy = () => {
  useEffect(() => {
    initializeAccordion();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-page">
         <Navbar />
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <div className="hero-content">
            {/* <span className="hero-badge">LEGAL</span> */}
            <h1 className="hero-title">Privacy Policy</h1>
            <p className="hero-description">
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your information when you visit
              Apexion Dental Clinic.
            </p>
            <p className="last-updated">Last Updated: October 27, 2025</p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="quick-navigation">
        <div className="container">
          <h2 className="section-title">Quick Links</h2>
          <div className="nav-cards">
            <button
              onClick={() => scrollToSection("information-collection")}
              className="nav-card"
            >
              <div className="card-icon">📋</div>
              <h4>Information We Collect</h4>
            </button>
            <button
              onClick={() => scrollToSection("information-use")}
              className="nav-card"
            >
              <div className="card-icon">🎯</div>
              <h4>How We Use Information</h4>
            </button>
            <button
              onClick={() => scrollToSection("information-sharing")}
              className="nav-card"
            >
              <div className="card-icon">🤝</div>
              <h4>Information Sharing</h4>
            </button>
            <button
              onClick={() => scrollToSection("data-security")}
              className="nav-card"
            >
              <div className="card-icon">🔒</div>
              <h4>Data Security</h4>
            </button>
            {/* <button
              onClick={() => scrollToSection("cookies")}
              className="nav-card"
            >
              <div className="card-icon">🍪</div>
              <h4>Cookies</h4>
            </button> */}
            <button
              onClick={() => scrollToSection("user-rights")}
              className="nav-card"
            >
              <div className="card-icon">⚖️</div>
              <h4>Your Rights</h4>
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="policy-content">
        {/* Information Collection Section */}
        <section
          id="information-collection"
          className="content-section light-bg"
        >
          <div className="container">
            <div className="section-header">
              <h2>Information We Collect</h2>
              <div className="header-line"></div>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <div className="card-icon-large">👤</div>
                <h3>Personal Information</h3>
                <p>
                  Information you provide directly to us when booking
                  appointments or contacting our clinic:
                </p>
                <ul className="feature-list">
                  <li>Name and contact details</li>
                  <li>Date of birth and age</li>
                  <li>Medical and dental history</li>
                  <li>Insurance information</li>
                  <li>Emergency contact details</li>
                </ul>
              </div>
              <div className="content-card">
                <div className="card-icon-large">💻</div>
                <h3>Automatically Collected Information</h3>
                <p>
                  Technical information collected when you visit our website:
                </p>
                <ul className="feature-list">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website information</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section id="information-use" className="content-section white-bg">
          <div className="container">
            <div className="section-header">
              <h2>How We Use Your Information</h2>
              <div className="header-line"></div>
            </div>
            <div className="use-grid">
              <div className="use-item">
                <div className="use-icon">🦷</div>
                <div className="use-content">
                  <h4>Provide Dental Services</h4>
                  <p>
                    To deliver quality dental care, manage appointments, and
                    maintain your treatment records
                  </p>
                </div>
              </div>
              <div className="use-item">
                <div className="use-icon">📞</div>
                <div className="use-content">
                  <h4>Communication</h4>
                  <p>
                    To send appointment reminders, treatment updates, and
                    respond to your inquiries
                  </p>
                </div>
              </div>
              <div className="use-item">
                <div className="use-icon">💳</div>
                <div className="use-content">
                  <h4>Billing & Insurance</h4>
                  <p>
                    To process payments and work with insurance providers for
                    claim processing
                  </p>
                </div>
              </div>
              <div className="use-item">
                <div className="use-icon">📊</div>
                <div className="use-content">
                  <h4>Improve Services</h4>
                  <p>
                    To analyze and enhance our dental services and patient
                    experience
                  </p>
                </div>
              </div>
              <div className="use-item">
                <div className="use-icon">📧</div>
                <div className="use-content">
                  <h4>Marketing</h4>
                  <p>
                    To send promotional offers and dental health tips (with your
                    consent)
                  </p>
                </div>
              </div>
              <div className="use-item">
                <div className="use-icon">⚖️</div>
                <div className="use-content">
                  <h4>Legal Compliance</h4>
                  <p>
                    To comply with healthcare regulations and legal requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Sharing */}
        <section id="information-sharing" className="content-section light-bg">
          <div className="container">
            <div className="section-header">
              <h2>Information Sharing & Disclosure</h2>
              <div className="header-line"></div>
            </div>
            <div className="info-box highlight">
              <p>
                <strong>We do not sell your personal information.</strong> We
                may share your information only in the following circumstances:
              </p>
            </div>
            <div className="sharing-cards">
              <div className="sharing-card">
                <h4>🏥 Healthcare Providers</h4>
                <p>
                  With specialists, laboratories, and other healthcare
                  professionals involved in your treatment
                </p>
              </div>
              <div className="sharing-card">
                <h4>💼 Insurance Companies</h4>
                <p>
                  With your insurance provider for claim processing and
                  verification purposes
                </p>
              </div>
              <div className="sharing-card">
                <h4>🔧 Service Providers</h4>
                <p>
                  With trusted third-party vendors who help us operate our
                  clinic (IT services, payment processors)
                </p>
              </div>
              <div className="sharing-card">
                <h4>⚖️ Legal Obligations</h4>
                <p>
                  When required by law or to protect the rights and safety of
                  our patients and staff
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section id="data-security" className="content-section white-bg">
          <div className="container">
            <div className="section-header">
              <h2>Data Security</h2>
              <div className="header-line"></div>
            </div>
            <p className="section-intro">
              We take the protection of your personal and medical information
              seriously. Our security measures include:
            </p>
            <div className="security-features">
              <div className="security-feature">
                <div className="feature-icon">🔐</div>
                <h4>Encryption</h4>
                <p>
                  SSL/TLS encryption for all data transmitted through our
                  website
                </p>
              </div>
              <div className="security-feature">
                <div className="feature-icon">🛡️</div>
                <h4>Secure Storage</h4>
                <p>Protected servers with restricted access for data storage</p>
              </div>
              <div className="security-feature">
                <div className="feature-icon">👥</div>
                <h4>Access Control</h4>
                <p>
                  Limited access to personal information on a need-to-know basis
                </p>
              </div>
              <div className="security-feature">
                <div className="feature-icon">🔍</div>
                <h4>Regular Audits</h4>
                <p>Periodic security assessments and compliance reviews</p>
              </div>
            </div>
            <div className="info-box warning">
              <p>
                <strong>Important:</strong> While we implement strong security
                measures, no system is completely secure. We cannot guarantee
                absolute security but continuously work to protect your
                information.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        {/* <section id="cookies" className="content-section light-bg">
          <div className="container">
            <div className="section-header">
              <h2>Cookies & Tracking Technologies</h2>
              <div className="header-line"></div>
            </div>
            <p className="section-intro">
              We use cookies and similar technologies to improve your experience
              on our website.
            </p>
            <div className="accordion-container">
              <div className="accordion-item">
                <button className="accordion-btn">
                  <span className="accordion-title">
                    <span className="accordion-icon">🔧</span>
                    Essential Cookies
                  </span>
                  <span className="accordion-toggle">+</span>
                </button>
                <div className="accordion-content">
                  <p>
                    These cookies are necessary for the website to function
                    properly. They enable basic features like page navigation,
                    secure areas access, and remember your consent preferences.
                    These cannot be disabled.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-btn">
                  <span className="accordion-title">
                    <span className="accordion-icon">📊</span>
                    Analytics Cookies
                  </span>
                  <span className="accordion-toggle">+</span>
                </button>
                <div className="accordion-content">
                  <p>
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. We use this data to improve our website
                    performance and user experience.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-btn">
                  <span className="accordion-title">
                    <span className="accordion-icon">⚙️</span>
                    Functional Cookies
                  </span>
                  <span className="accordion-toggle">+</span>
                </button>
                <div className="accordion-content">
                  <p>
                    These cookies enable enhanced functionality and
                    personalization. They may be set by us or by third-party
                    providers whose services we use on our pages. They help
                    remember your preferences and provide customized features.
                  </p>
                </div>
              </div>
            </div>
            <div className="cookie-control-box">
              <p>
                You can manage your cookie preferences through your browser
                settings. Please note that blocking certain cookies may impact
                your experience on our website.
              </p>
            </div>
          </div>
        </section> */}

        {/* Your Rights */}
        <section id="user-rights" className="content-section white-bg">
          <div className="container">
            <div className="section-header">
              <h2>Your Privacy Rights</h2>
              <div className="header-line"></div>
            </div>
            <p className="section-intro">
              You have certain rights regarding your personal information. These
              include:
            </p>
            <div className="rights-grid">
              <div className="right-item">
                <div className="right-number">01</div>
                <h4>Access Your Data</h4>
                <p>
                  Request a copy of the personal information we hold about you
                </p>
              </div>
              <div className="right-item">
                <div className="right-number">02</div>
                <h4>Correct Inaccuracies</h4>
                <p>
                  Request corrections to any inaccurate or incomplete
                  information
                </p>
              </div>
              <div className="right-item">
                <div className="right-number">03</div>
                <h4>Request Deletion</h4>
                <p>
                  Ask us to delete your personal information (subject to legal
                  requirements)
                </p>
              </div>
              <div className="right-item">
                <div className="right-number">04</div>
                <h4>Data Portability</h4>
                <p>Receive your data in a structured, commonly used format</p>
              </div>
              <div className="right-item">
                <div className="right-number">05</div>
                <h4>Withdraw Consent</h4>
                <p>Withdraw consent for marketing communications at any time</p>
              </div>
              <div className="right-item">
                <div className="right-number">06</div>
                <h4>File a Complaint</h4>
                <p>
                  Lodge a complaint with your local data protection authority
                </p>
              </div>
            </div>
            <div className="contact-rights-box">
              <p>
                To exercise any of these rights, please contact us using the
                information below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {/* <section className="contact-section light-bg">
          <div className="container">
            <div className="contact-wrapper">
              <div className="contact-header">
                <h2>Questions About This Policy?</h2>
                <p>
                  If you have any questions or concerns about our Privacy
                  Policy, we're here to help.
                </p>
              </div>
              <div className="contact-info-grid">
                <div className="contact-info-card">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h5>Email Us</h5>
                    <a href="mailto:privacy@apexiondental.com">
                      privacy@apexiondental.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <h5>Call Us</h5>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">📍</div>
                  <div className="contact-details">
                    <h5>Visit Us</h5>
                    <p>
                      Apexion Dental Clinic
                      <br />
                      123 Healthcare Street, City
                    </p>
                  </div>
                </div>
              </div>
              <button className="primary-btn">Contact Us</button>
            </div>
          </div>
        </section> */}
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;