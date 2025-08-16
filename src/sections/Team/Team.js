// import React from "react";
// import "./Team.scss";
// import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import imgOne from "../../assets/about/team/1.png";
// import imgTwo from "../../assets/about/team/2.png";
// import imgThree from "../../assets/about/team/3.png";
// import imgFour from "../../assets/about/team/4.png";

// const Team = () => {
//   const teams = [
//     {
//       img: imgOne,
//       name: "Dianne Russell",
//     },
//     {
//       img: imgTwo,
//       name: "Esther Howard",
//     },
//     {
//       img: imgThree,
//       name: "Darrell Steward",
//     },
//     {
//       img: imgFour,
//       name: "Jenny Wilson",
//     },
//   ];

//   return (
//     <section
//       className="team-section pt-100"
//       data-aos="fade-up"
//       data-aos-duration="2000"
//     >
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-7">
//             <SectionTitle
//               subTitle="Meet our Team"
//               title="Get to know the Apexion's
//                             dental Team"
//             />
//           </div>

//           <div className="col-lg-5">
//             <p className="pt-5">
//               We are a dedicated team of dental professionals committed to
//               delivering exceptional care. With expertise, compassion, and
//               attention to detail, we work together to ensure every patient
//               enjoys a healthy, confident smile in a welcoming environment.
//             </p>
//           </div>
//         </div>

//         <div className="row">
//           {teams.map((team) => (
//             <div className="col-lg-3 col-sm-6">
//               <div className="team-card">
//                 <div className="team-img">
//                   <img src={team.img} alt="" />
//                 </div>
//                 <h3>{team.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Team.scss";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import imgOne from "../../assets/about/team/1.png";
import imgTwo from "../../assets/about/team/2.png";
import imgThree from "../../assets/about/team/3.png";
import imgFour from "../../assets/about/team/4.png";

const Team = () => {
  const navigate = useNavigate();

  const teams = [
    {
      img: imgOne,
      name: "Dianne Russell",
      position: "Lead Dentist",
    },
    {
      img: imgTwo,
      name: "Esther Howard",
      position: "Oral Surgeon",
    },
    {
      img: imgThree,
      name: "Darrell Steward",
      position: "Orthodontist",
    },
    {
      img: imgFour,
      name: "Jenny Wilson",
      position: "Dental Hygienist",
    },
  ];

  const handleKnowMore = () => {
    navigate("/team-details");
  };

  return (
    <section
      className="team-section pt-100"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <SectionTitle
              subTitle="Meet our Team"
              title="Get to know the Apexion's dental Team"
            />
          </div>

          <div className="col-lg-5">
            <p className="pt-5">
              We are a dedicated team of dental professionals committed to
              delivering exceptional care. With expertise, compassion, and
              attention to detail, we work together to ensure every patient
              enjoys a healthy, confident smile in a welcoming environment.
            </p>
          </div>
        </div>

        <div className="row">
          {teams.map((team, index) => (
            <div key={index} className="col-lg-3 col-sm-6">
              <div className="team-card">
                <div className="team-img">
                  <img src={team.img} alt={team.name} />
                </div>
                <h3>{team.name}</h3>
                {team.position && (
                  <p className="team-position">{team.position}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Know More Button */}
        <div className="row">
          <div className="col-12 text-center mt-5">
            <div className="theme-btn">
              <button onClick={handleKnowMore} type="button">
                More About Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
