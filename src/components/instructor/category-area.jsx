import React from "react";
import {
    BookLibrary,
  Certificate,
  CertificateTwo,
  HybridDistanceProgramsTwo,
  Instructor,
  NonDegreeProgram,
  OffCanvasPrograms,
  OnlineClass,
  OnlineDegree,
  ScholarshipFacility,
  SkilledLecturers,
  SkilledLecturersTwo,
  User,
  UserTwo,
} from "../../svg";

const CategoryArea = () => {
  return (
    <div className="features-area-1 py-5">
      <div className="container">
        <div className="text-center m-2">
          <h2>Why Teach with Us?</h2>        
          {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi harum deserunt facere! Et quaerat quo, dolorum adipisci unde ipsa assumenda provident. Hic, praesentium. Sequi, error. Dignissimos est voluptatibus dicta in?</p> */}
        </div>
        <div className="row g-5 d-flex justify-content-center">
          
          <FeatureBox
            delay={"150"}
            color={"color-extra04-style"}
            icon={<img src="./images/icons/community.png" alt="Community Icon" />}
            title={
              <>
                <span>Reach a Global Audience </span>
              </>
            }
            text={"Share your expertise with students from around the world."}
          />

          <FeatureBox
            delay={"100"}
            color={"color-secondary-style"}
            icon={<img src="./assets/images/logo/excel-icon.png" alt="Excel Icon" />}
            title={
              <>
                <span>Free Excel Training App</span>
              </>
            }
            text={
              "Give your Excel students a novel and awesome learning experience through delivering your course on our innovative App."
            }
          />

          <FeatureBox
            delay={"150"}
            color={"color-primary-style"}
            icon={<SkilledLecturersTwo />}
            title={
              <>
                <span>Flexible Teaching</span>
              </>
            }
            text={"Create courses at your own pace and schedule."}
          />
        </div>
        <div className="row g-5 mt-5  d-flex justify-content-center">
          <FeatureBox
            delay={"150"}
            color={"color-extra05-style"}
            icon={<img src="/images/icons/dollar-sign.png" alt="Earn Income" />}
            title={
              <>
                <span>Earn Income</span>
              </>
            }
            text={"Monetize your knowledge and skills."}
          />

          <FeatureBox
            delay={"100"}
            color={"color-secondary-style"}
            icon={<UserTwo />}
            title={
              <>
                <span>Supportive Community</span>
              </>
            }
            text={
              "Connect with other instructors and get support from our team."
            }
          />

          <FeatureBox
            delay={"150"}
            color={"color-primary-style"}
            icon={<img src="/images/icons/personal-growth.png" alt="Professional Growth" />}
            title={
              <>
                <span>Professional Growth</span>
              </>
            }
            text={
              "Expand your professional network, build your expertise, and gain recognition in your field."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryArea;

const FeatureBox = ({ delay, icon, color, title, text }) => {
  return (
    <div
     className="col-sm-7 col-md-7 col-lg-3 mx-3"
      data-sal-delay={delay}
      data-sal="slide-up"
      data-sal-duration="800"
    >
      <div className={`features-box ${color} edublink-svg-animate`}>
    
        <div className="icon">{icon}</div>
        <div className="content">
          <h5 className="title">{title}</h5>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
