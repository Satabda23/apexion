import React from "react";
import "./TeamDetails.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../sections/Footer/Footer";
import imgOne from "../../assets/about/team/1.png";
import imgTwo from "../../assets/about/team/2.png";
import imgThree from "../../assets/about/team/3.png";
import imgFour from "../../assets/about/team/4.png";

const TeamDetails = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dianne Russell",
      position: "Lead Dentist",
      photo: imgOne,
      qualifications: [
        "DDS from Harvard School of Dental Medicine",
        "Board Certified in General Dentistry",
        "Advanced Training in Cosmetic Dentistry",
      ],
      expertise: [
        "Cosmetic Dentistry",
        "Dental Implants",
        "Root Canal Therapy",
        "Preventive Care",
      ],
      experience: "15+ years",
      email: "dianne.russell@apexion.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Esther Howard",
      position: "Oral Surgeon",
      photo: imgTwo,
      qualifications: [
        "DDS from University of Pennsylvania",
        "Oral and Maxillofacial Surgery Residency",
        "Board Certified Oral Surgeon",
      ],
      expertise: [
        "Wisdom Tooth Extraction",
        "Dental Implant Surgery",
        "Jaw Surgery",
        "Facial Trauma Treatment",
      ],
      experience: "12+ years",
      email: "esther.howard@apexion.com",
      phone: "+1 (555) 123-4568",
    },
    {
      id: 3,
      name: "Darrell Steward",
      position: "Orthodontist",
      photo: imgThree,
      qualifications: [
        "DDS from UCLA School of Dentistry",
        "Orthodontic Residency Certificate",
        "American Board of Orthodontics Certified",
      ],
      expertise: [
        "Traditional Braces",
        "Invisalign Treatment",
        "Pediatric Orthodontics",
        "Adult Orthodontics",
      ],
      experience: "10+ years",
      email: "darrell.steward@apexion.com",
      phone: "+1 (555) 123-4569",
    },
    {
      id: 4,
      name: "Jenny Wilson",
      position: "Dental Hygienist",
      photo: imgFour,
      qualifications: [
        "Associate Degree in Dental Hygiene",
        "Licensed Dental Hygienist",
        "CPR and First Aid Certified",
      ],
      expertise: [
        "Teeth Cleaning",
        "Periodontal Therapy",
        "Patient Education",
        "Oral Health Assessment",
      ],
      experience: "8+ years",
      email: "jenny.wilson@apexion.com",
      phone: "+1 (555) 123-4570",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="team-details-page">
        {/* Header Section */}
        <div className="team-details-header section-bg section-common">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="text-center">
                  <h1 className="team-details-title">Meet Our Expert Team</h1>
                  <p className="team-details-description">
                    Our dedicated team of dental professionals brings years of
                    experience and specialized expertise to provide you with the
                    highest quality care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="team-details-content pt-100 pb-70">
          <div className="container">
            <div className="row team-members-grid">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="col-lg-6 col-md-6 mb-5"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <div className="team-member-card">
                    {/* Photo Section */}
                    <div className="team-member-photo">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="img-fluid"
                      />
                      <div className="team-member-overlay">
                        <h3>{member.name}</h3>
                        <p>{member.position}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="team-member-content">
                      {/* Experience Badge */}
                      <div className="experience-badge">
                        {member.experience} Experience
                      </div>

                      {/* Qualifications */}
                      <div className="info-section">
                        <h4 className="section-title">
                          <svg
                            className="section-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                          Qualifications
                        </h4>
                        <ul className="qualifications-list">
                          {member.qualifications.map((qualification, index) => (
                            <li key={index}>
                              <span className="bullet-point"></span>
                              {qualification}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expertise */}
                      <div className="info-section">
                        <h4 className="section-title">
                          <svg
                            className="section-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          Areas of Expertise
                        </h4>
                        <div className="expertise-tags">
                          {member.expertise.map((skill, index) => (
                            <span key={index} className="expertise-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="team-member-contact">
                        <div className="contact-links">
                          <a
                            href={`mailto:${member.email}`}
                            className="contact-link"
                          >
                            <svg
                              className="contact-icon"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            {member.email}
                          </a>
                          <a
                            href={`tel:${member.phone}`}
                            className="contact-link"
                          >
                            <svg
                              className="contact-icon"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="row">
              <div className="col-12">
                <div className="team-cta text-center">
                  <p>
                    Ready to schedule an appointment with one of our
                    specialists?
                  </p>
                  <div className="theme-btn">
                    <a href="/contact">Book Appointment</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TeamDetails;
