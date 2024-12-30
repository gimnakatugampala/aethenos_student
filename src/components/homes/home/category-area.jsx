import {
  Certificate,
  Instructor,
  Excel,
  DayMoney
} from "../../../svg";
import { useState, useEffect } from "react";

const category_contents = [
  //   { icon: <OnlineClass/>, title: '3020', subtitle: 'Online Courses' },
  { icon: <Instructor />, title: "Top", subtitle: "Instructors" },
  { icon: <Excel />, title: "Innovative", subtitle: "Excel Training App" },
  { icon: <Certificate />, title: "Online", subtitle: "Certifications" },
  { icon: <DayMoney />, title: "30 Day Money Back", subtitle: "Guarantee" },
  //   { icon: <User/>, title: '6000', subtitle: 'Members' },
];

const CategoryArea = () => {
  const [view, setView] = useState(""); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1050) {
        setView("d-flex justify-content-evenly mx-5");
      } else if (window.innerWidth > 630){
        setView("d-flex flex-wrap justify-content-evenly flex-start mx-5");
      }else if (window.innerWidth > 400){
        setView("d-flex flex-wrap flex-start mx-5");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="features-area-2">
      <div >
        <div className={view}>
          {category_contents.map((category, i) => (
            <div
              key={i}
              className="features-box features-style-2 edublink-svg-animate"
              style={{ border: "none", alignItems: "center" }}
            >
              <div className="icon">{category.icon}</div>
              <div className="content">
                <h5 className="title" style={{minWidth: "140px"}}>
                  <span>{category.title}</span>
                  {category.subtitle}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryArea;
