import React, { useState, useEffect } from "react";
import SubmitTestimonial from "./SubmitTestimonial";
import "./Testimonial.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TestimoniCard from "../../components/TestimoniCard/TestimoniCard";
import { AiFillStar } from "react-icons/ai";
import Slider from "react-slick";
import axios from "axios";

const Testimonial = () => {
  const [testimonails, setTestimonials] = useState([]);

  // ✅ Load reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/latest`
        );
        console.log("Raw response:", res.data.data.reviews);
        const formatted = res.data.data.reviews.map((item) => ({
          name: item.name,
          description: item.text,
          rating: item.rating,
        }));
        console.log("Fetched reviews:", formatted);
        // Optional: Add default reviews if no DB reviews found
        if (formatted.length === 0) {
          setTestimonials([
            {
              name: "Satabda Hazarika",
              description:
                "One of the best clinics in town. I'm happy with their professional behavior.",
              rating: 5,
            },
            {
              name: "Biju Pegu",
              description: "Exceptional professionalism delivered by the team.",
              rating: 5,
            },
          ]);
        } else {
          setTestimonials(formatted);
        }
      } catch (error) {
        console.error("Error loading testimonials:", error);
      }
    };

    fetchReviews();
  }, []);

  // ✅ Add new review instantly
  const handleNewReview = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="testimonail-section section-bg section-common pt-100 pb-70"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <SectionTitle
              subTitle="TESTIMONIAL"
              title="What people have said about us"
            />
          </div>
          <div className="col-lg-6">
            <p className="pt-5">
              Reviews are authentic social proof that boost credibility and
              guide improvements, helping organizations attract and retain
              customers. What our patients are saying – from Google and beyond.
            </p>
          </div>
        </div>

        <Slider {...settings} className="testimoni-slider">
          {testimonails.map((testimonail, idx) => (
            <TestimoniCard
              key={idx}
              testimonail={{
                name: testimonail.name,
                description: testimonail.description,
                ratings: Array(testimonail.rating).fill(<AiFillStar />),
              }}
            />
          ))}
        </Slider>

        <SubmitTestimonial onSubmit={handleNewReview} />
      </div>
    </section>
  );
};

export default Testimonial;
