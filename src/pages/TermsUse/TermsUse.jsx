import React, { useEffect } from "react";
import "./TermsUse.scss";
import { scrollToSection, initializeAccordion } from "./TermsUseHelpers.js";

const TermsOfUse = () => {
  useEffect(() => {
    initializeAccordion();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-of-use-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">LEGAL</span>
            <h1 className="hero-title">Terms of Use</h1>
            <p className="hero-description">
              Please read these Terms of Use carefully before using Apexion
              Dental Clinic's website and services. By accessing our website,
              you agree to be bound by these terms.
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
              onClick={() => scrollToSection("acceptance-terms")}
              className="nav-card"
            >
              <div className="card-icon">✅</div>
              <h4>Acceptance of Terms</h4>
            </button>
            <button
              onClick={() => scrollToSection("services-description")}
              className="nav-card"
            >
              <div className="card-icon">🏥</div>
              <h4>Services Description</h4>
            </button>
            <button
              onClick={() => scrollToSection("user-responsibilities")}
              className="nav-card"
            >
              <div className="card-icon">👤</div>
              <h4>User Responsibilities</h4>
            </button>
            <button
              onClick={() => scrollToSection("appointment-policy")}
              className="nav-card"
            >
              <div className="card-icon">📅</div>
              <h4>Appointment Policy</h4>
            </button>
            <button
              onClick={() => scrollToSection("intellectual-property")}
              className="nav-card"
            >
              <div className="card-icon">©️</div>
              <h4>Intellectual Property</h4>
            </button>
            <button
              onClick={() => scrollToSection("limitation-liability")}
              className="nav-card"
            >
              <div className="card-icon">⚖️</div>
              <h4>Limitation of Liability</h4>
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="terms-content">
        {/* Acceptance of Terms */}
        <section id="acceptance-terms" className="content-section light-bg">
          <div className="container">
            <div className="section-header">
              <h2>Acceptance of Terms</h2>
              <div className="header-line"></div>
            </div>
            <div className="intro-box">
              <p>
                By accessing and using Apexion Dental Clinic's website and
                services, you acknowledge that you have read, understood, and
                agree to be bound by these Terms of Use and our Privacy Policy.
                If you do not agree to these terms, please do not use our
                services.
              </p>
            </div>
            <div className="content-grid">
              <div className="content-card">
                <div className="card-icon-large">📜</div>
                <h3>Agreement to Terms</h3>
                <p>
                  These terms constitute a legally binding agreement between you
                  and Apexion Dental Clinic.
                </p>
                <ul className="feature-list">
                  <li>Applies to all visitors and users</li>
                  <li>Governs use of website and services</li>
                  <li>May be updated periodically</li>
                  <li>Continued use means acceptance</li>
                </ul>
              </div>
              <div className="content-card">
                <div className="card-icon-large">🔄</div>
                <h3>Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time.
                  Changes become effective immediately upon posting.
                </p>
                <ul className="feature-list">
                  <li>Updates posted on this page</li>
                  <li>Date of last revision displayed</li>
                  <li>Review terms periodically</li>
                  <li>Email notifications for major changes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Description */}
        <section
          id="services-description"
          className="content-section white-bg"
        >
          <div className="container">
            <div className="section-header">
              <h2>Services Description</h2>
              <div className="header-line"></div>
            </div>
            <p className="section-intro">
              Apexion Dental Clinic provides comprehensive dental care services
              to our patients. Our services include:
            </p>
            <div className="services-grid">
              <div className="service-item">
                <div className="service-icon">🦷</div>
                <div className="service-content">
                  <h4>General Dentistry</h4>
                  <p>
                    Routine check-ups, cleanings, fillings, and preventive care
                  </p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon">✨</div>
                <div className="service-content">
                  <h4>Cosmetic Dentistry</h4>
                  <p>Teeth whitening, veneers, and smile enhancement services</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon">🔧</div>
                <div className="service-content">
                  <h4>Restorative Dentistry</h4>
                  <p>Crowns, bridges, implants, and dentures</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon">👶</div>
                <div className="service-content">
                  <h4>Pediatric Dentistry</h4>
                  <p>Specialized dental care for children and adolescents</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon">🚨</div>
                <div className="service-content">
                  <h4>Emergency Care</h4>
                  <p>Immediate treatment for dental emergencies</p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-icon">🦴</div>
                <div className="service-content">
                  <h4>Orthodontics</h4>
                  <p>Braces, aligners, and teeth straightening solutions</p>
                </div>
              </div>
            </div>
            <div className="info-box highlight">
              <p>
                <strong>Important:</strong> All services are provided by
                licensed dental professionals. Treatment plans are customized
                based on individual patient needs and may vary.
              </p>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section
          id="user-responsibilities"
          className="content-section light-bg"
        >
          <div className="container">
            <div className="section-header">
              <h2>User Responsibilities</h2>
              <div className="header-line"></div>
            </div>
            <p className="section-intro">
              As a user of our website and services, you agree to:
            </p>
            <div className="responsibilities-cards">
              <div className="responsibility-card">
                <div className="card-number">01</div>
                <h4>Provide Accurate Information</h4>
                <p>
                  Ensure all personal, medical, and contact information provided
                  is accurate, current, and complete.
                </p>
              </div>
              <div className="responsibility-card">
                <div className="card-number">02</div>
                <h4>Maintain Account Security</h4>
                <p>
                  Keep your account credentials confidential and notify us
                  immediately of any unauthorized access.
                </p>
              </div>
              <div className="responsibility-card">
                <div className="card-number">03</div>
                <h4>Use Services Appropriately</h4>
                <p>
                  Use our website and services only for lawful purposes and in
                  accordance with these terms.
                </p>
              </div>
              <div className="responsibility-card">
                <div className="card-number">04</div>
                <h4>Respect Others</h4>
                <p>
                  Treat staff, other patients, and all individuals with courtesy
                  and respect at all times.
                </p>
              </div>
              <div className="responsibility-card">
                <div className="card-number">05</div>
                <h4>Follow Medical Advice</h4>
                <p>
                  Comply with treatment plans and follow post-treatment care
                  instructions provided by our dentists.
                </p>
              </div>
              <div className="responsibility-card">
                <div className="card-number">06</div>
                <h4>Make Timely Payments</h4>
                <p>
                  Pay for services rendered according to agreed terms and
                  maintain updated insurance information.
                </p>
              </div>
            </div>
            <div className="prohibited-activities">
              <h3>Prohibited Activities</h3>
              <div className="prohibited-list">
                <div className="prohibited-item">
                  <span className="icon">❌</span>
                  <span>Providing false or misleading information</span>
                </div>
                <div className="prohibited-item">
                  <span className="icon">❌</span>
                  <span>
                    Attempting to access unauthorized areas of the website
                  </span>
                </div>
                <div className="prohibited-item">
                  <span className="icon">❌</span>
                  <span>Using automated systems to scrape data</span>
                </div>
                <div className="prohibited-item">
                  <span className="icon">❌</span>
                  <span>Impersonating staff or other users</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Policy */}
        <section id="appointment-policy" className="content-section white-bg">
          <div className="container">
            <div className="section-header">
              <h2>Appointment Policy</h2>
              <div className="header-line"></div>
            </div>
            <div className="policy-boxes">
              <div className="policy-box">
                <h3>📅 Booking Appointments</h3>
                <p>
                  Appointments can be scheduled online through our website, by
                  phone, or in person. Please book at least 24 hours in advance
                  for routine care.
                </p>
              </div>
              <div className="policy-box">
                <h3>⏰ Arrival Time</h3>
                <p>
                  Please arrive 10-15 minutes before your scheduled appointment
                  time to complete necessary paperwork and check-in procedures.
                </p>
              </div>
              <div className="policy-box">
                <h3>🔔 Cancellation Policy</h3>
                <p>
                  Cancellations must be made at least 24 hours in advance. Late
                  cancellations or no-shows may result in a cancellation fee.
                </p>
              </div>
              <div className="policy-box">
                <h3>📞 Rescheduling</h3>
                <p>
                  To reschedule an appointment, please contact us as soon as
                  possible. We will do our best to accommodate your preferred
                  time.
                </p>
              </div>
            </div>
            <div className="accordion-container">
              <div className="accordion-item">
                <button className="accordion-btn">
                  <span className="accordion-title">
                    <span className="accordion-icon">⏱️</span>
                    Late Arrival Policy
                  </span>
                  <span className="accordion-toggle">+</span>
                </button>
                <div className="accordion-content">
                  <p>
                    If you arrive more than 15 minutes late for your
                    appointment, we may need to reschedule to ensure quality
                    care for all patients. We understand that delays happen, so
                    please call us if you're running late and we'll do our best
                    to accommodate you.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-btn">
                  <span className="accordion-title">
                    <span className="accordion-icon">🚨</span>
                    Emergency Appointments
                  </span>
                  <span className="accordion-toggle">+</span>
                </button>
                <div className="accordion-content">
                  <p>
                    For dental emergencies, please call our clinic immediately.
                    We reserve time slots each day for urgent cases and will
                    make every effort to see you on the same day. Emergency
                    services may be subject to additional fees.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-btn">
                  <span className="accordion-title">
                    <span className="accordion-icon">📋</span>
                    Insurance & Payment
                  </span>
                  <span className="accordion-toggle">+</span>
                </button>
                <div className="accordion-content">
                  <p>
                    Please bring your insurance card and a valid ID to your
                    first appointment. Payment is due at the time of service. We
                    accept cash, credit cards, and most dental insurance plans.
                    Payment plans may be available for extensive treatments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section
          id="intellectual-property"
          className="content-section light-bg"
        >
          <div className="container">
            <div className="section-header">
              <h2>Intellectual Property Rights</h2>
              <div className="header-line"></div>
            </div>
            <div className="ip-content">
              <div className="ip-main">
                <h3>Our Content & Trademarks</h3>
                <p>
                  All content on this website, including but not limited to
                  text, graphics, logos, images, videos, and software, is the
                  property of Apexion Dental Clinic or its content suppliers and
                  is protected by international copyright and trademark laws.
                </p>
              </div>
              <div className="ip-grid">
                <div className="ip-card">
                  <div className="ip-icon">©️</div>
                  <h4>Copyright Protection</h4>
                  <p>
                    All website content is copyrighted and may not be reproduced
                    without permission.
                  </p>
                </div>
                <div className="ip-card">
                  <div className="ip-icon">™️</div>
                  <h4>Trademarks</h4>
                  <p>
                    Our name, logo, and brand marks are registered trademarks.
                  </p>
                </div>
                <div className="ip-card">
                  <div className="ip-icon">🖼️</div>
                  <h4>Media Rights</h4>
                  <p>Photos, videos, and graphics are protected intellectual property.</p>
                </div>
                <div className="ip-card">
                  <div className="ip-icon">📝</div>
                  <h4>Written Content</h4>
                  <p>
                    Articles, blog posts, and educational materials are
                    copyrighted.
                  </p>
                </div>
              </div>
              <div className="info-box warning">
                <p>
                  <strong>Unauthorized Use:</strong> Any unauthorized use of our
                  intellectual property may result in legal action. For
                  permission to use our content, please contact us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section
          id="limitation-liability"
          className="content-section white-bg"
        >
          <div className="container">
            <div className="section-header">
              <h2>Limitation of Liability</h2>
              <div className="header-line"></div>
            </div>
            <div className="liability-content">
              <div className="info-box highlight">
                <p>
                  <strong>Disclaimer:</strong> To the maximum extent permitted
                  by law, Apexion Dental Clinic shall not be liable for any
                  indirect, incidental, special, consequential, or punitive
                  damages arising from your use of our services.
                </p>
              </div>
              <div className="liability-sections">
                <div className="liability-section">
                  <h3>Website Use</h3>
                  <p>
                    Our website is provided "as is" without warranties of any
                    kind. We do not guarantee that the website will be
                    error-free or uninterrupted. While we strive for accuracy,
                    we do not warrant that information on the website is
                    complete or current.
                  </p>
                </div>
                <div className="liability-section">
                  <h3>Medical Information</h3>
                  <p>
                    Information on this website is for educational purposes only
                    and should not replace professional medical advice.
                    Treatment outcomes may vary, and we cannot guarantee
                    specific results. Always consult with a qualified dentist
                    for personalized care.
                  </p>
                </div>
                <div className="liability-section">
                  <h3>Third-Party Links</h3>
                  <p>
                    Our website may contain links to third-party websites. We
                    are not responsible for the content, privacy practices, or
                    terms of use of any linked sites. Use of third-party
                    websites is at your own risk.
                  </p>
                </div>
                <div className="liability-section">
                  <h3>Maximum Liability</h3>
                  <p>
                    In no event shall our total liability to you for all damages
                    exceed the amount you paid for services during the six
                    months preceding the claim. Some jurisdictions do not allow
                    limitation of liability, so this may not apply to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Terms */}
        <section className="additional-terms-section light-bg">
          <div className="container">
            <div className="section-header">
              <h2>Additional Terms</h2>
              <div className="header-line"></div>
            </div>
            <div className="additional-grid">
              <div className="additional-card">
                <h4>⚖️ Governing Law</h4>
                <p>
                  These Terms shall be governed by the laws of the jurisdiction
                  in which Apexion Dental Clinic operates, without regard to
                  conflict of law provisions.
                </p>
              </div>
              <div className="additional-card">
                <h4>🔗 Severability</h4>
                <p>
                  If any provision of these Terms is found to be unenforceable,
                  the remaining provisions will continue in full force and
                  effect.
                </p>
              </div>
              <div className="additional-card">
                <h4>📧 Communications</h4>
                <p>
                  By using our services, you consent to receive electronic
                  communications from us. These may include appointment
                  reminders, newsletters, and service updates.
                </p>
              </div>
              <div className="additional-card">
                <h4>✍️ Entire Agreement</h4>
                <p>
                  These Terms constitute the entire agreement between you and
                  Apexion Dental Clinic regarding the use of our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section white-bg">
          <div className="container">
            <div className="contact-wrapper">
              <div className="contact-header">
                <h2>Questions About These Terms?</h2>
                <p>
                  If you have any questions or concerns about our Terms of Use,
                  please don't hesitate to contact us.
                </p>
              </div>
              <div className="contact-info-grid">
                <div className="contact-info-card">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h5>Email Us</h5>
                    <a href="mailto:legal@apexiondental.com">
                      legal@apexiondental.com
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
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;