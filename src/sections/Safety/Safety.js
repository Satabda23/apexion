import React from "react";
import "./Safety.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Safety = () => {
  return (
    <section
      className="safty-section pt-100 section-bg section-common pb-70"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <SectionTitle
          subTitle="Safety"
          title="We put the safety first"
          description="Our commitment to the highest standards of hygiene, sterilization, and care ensures that every dental visit is safe, comfortable, and worry-free for our patients."
        />

        <div className="safety-video ratio ratio-16x9">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/scJH8HA8zAM?si=DOQrA_TrFCiL_j6P"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Safety;
