import React from "react";
import "./Gallery.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import imgOne from "../../assets/servicePage/gallery/1.jpeg";
import imgTwo from "../../assets/servicePage/gallery/2.jpeg";
import imgThree from "../../assets/servicePage/gallery/3.jpeg";
import imgFour from "../../assets/servicePage/gallery/4.jpeg";
import imgFive from "../../assets/servicePage/gallery/5.jpeg";
import imgSix from "../../assets/servicePage/gallery/6.jpeg";

const Gallery = () => {
  return (
    <section
      className="gallery-section pt-100 pb-70"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <SectionTitle
          subTitle="Gallery"
          title="Some proof about our services for you"
          description="Take a look at real transformations and satisfied patients who have experienced our quality dental care. Our gallery showcases the results of our treatments and the modern, comfortable environment we provide"
        />
        <div className="row">
          <div className="col-md-5 col-sm-6">
            <div className="gallery-img">
              <img src={imgOne} alt="gallery" />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="gallery-img">
              <img src={imgTwo} alt="gallery" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="gallery-img">
              <img src={imgThree} alt="gallery" />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="gallery-img">
              <img src={imgFour} alt="gallery" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="gallery-img">
              <img src={imgFive} alt="gallery" />
            </div>
          </div>
          <div className="col-md-5 col-sm-6">
            <div className="gallery-img">
              <img src={imgSix} alt="gallery" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
