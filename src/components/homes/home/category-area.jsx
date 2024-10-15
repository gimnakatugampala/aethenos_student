import {
  Certificate,
  Instructor,
  OnlineClass,
  User,
  Excel,
} from "../../../svg";
import { useState, useEffect } from "react";

const category_contents = [
  //   { icon: <OnlineClass/>, title: '3020', subtitle: 'Online Courses' },
  { icon: <Instructor />, title: "Top", subtitle: "Instructors" },
  { icon: <Excel />, title: "Innovative", subtitle: "Excel Training App" },
  { icon: <Certificate />, title: "Online", subtitle: "Certifications" },
  //   { icon: <User/>, title: '6000', subtitle: 'Members' },
];

const CategoryArea = () => {
  const [view, setView] = useState("d-flex justify-content-evenly"); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 795) {
        setView("d-flex justify-content-evenly");
      } else {
        setView("mx-5 d-flex flex-wrap");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="features-area-2 ">
      <div >
        <div className={view}>
          {category_contents.map((category, i) => (
            <div
              key={i}
              className="features-box features-style-2 edublink-svg-animate mx-1"
              style={{ border: "none", alignItems: "center" }}
            >
              <div className="icon">{category.icon}</div>
              <div className="content">
                <h5 className="title" style={{minWidth: "150px"}}>
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
