import React from "react";
import "./TestimoniCard.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

const TestimoniCard = ({ testimonail }) => {
  const { name, description, ratings } = testimonail;
  console.log("ratings:", ratings);

  return (
    <div className="col-lg-4 single-testimoni">
      <div className="testimonial-card">
        <div className="testimonial-text">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <ul className="testimonial-rating">
          {ratings?.map((rating) => (
            <li>{rating}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestimoniCard;
