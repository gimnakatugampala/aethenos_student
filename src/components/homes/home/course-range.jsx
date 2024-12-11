import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CourseRangeList from "./course-range-list";
import CardContainer from "../../../contexts/CardContainer";
import { useEffect } from "react";
import {
  GetCourseHomeBusiness,
  GetCourseHomeDesign,
  GetCourseHomeDevelopment,
  GetCourseHomeITSoftware,
  GetCourseHomeMarketing,
  GetCourseHomePersonalDevelopment,
  GetCourseHomePhotography,
} from "../../../api";
import { useState } from "react";
import CoursesPotraitSkeleton from "../../../functions/Skeletons/CoursesPotraitSkeleton";
const mainfs = {
  fontSize: "calc(0.8rem + 0.6vw)",
};
const secfs = {
  fontSize: "calc(0.6rem + 0.6vw)",
};

const CourseRange = () => {
  const [business_courses, setbusiness_courses] = useState([]);
  const [deisgn_courses, setdeisgn_courses] = useState([]);
  const [photography_courses, setphotography_courses] = useState([]);
  const [development_courses, setdevelopment_courses] = useState([]);
  const [marketing_courses, setmarketing_courses] = useState([]);
  const [it_software_courses, setit_software_courses] = useState([]);
  const [personal_development_courses, setpersonal_development_courses] =
    useState([]);

  const [loading_business_courses, setloading_business_courses] =
    useState(true);
  const [loading_design_courses, setloading_design_courses] = useState(true);
  const [loading_photography_courses, setloading_photography_courses] =
    useState(true);
  const [loading_development_courses, setloading_development_courses] =
    useState(true);
  const [loading_marketing_courses, setloading_marketing_courses] =
    useState(true);
  const [loading_it_software_courses, setloading_it_software_courses] =
    useState(true);
  const [
    loading_personal_development_courses,
    setloading_personal_development_courses,
  ] = useState(true);

  useEffect(() => {
    GetCourseHomePersonalDevelopment(
      setpersonal_development_courses,
      setloading_personal_development_courses
    );
    GetCourseHomeITSoftware(
      setit_software_courses,
      setloading_it_software_courses
    );
    // GetCourseHomeMarketing(setmarketing_courses, setloading_marketing_courses);
    // GetCourseHomeDevelopment(
    //   setdevelopment_courses,
    //   setloading_development_courses
    // );
    // GetCourseHomePhotography(
    //   setloading_photography_courses,
    //   setphotography_courses
    // );
    // GetCourseHomeDesign(setdeisgn_courses, setloading_design_courses);
    // GetCourseHomeBusiness(setbusiness_courses, setloading_business_courses);
  }, []);

  return (
    <div className="edu-brand-area brand-area-1 p-3 ">
      <div className="container-fluid">
        <div className="row">
          <div> 
            <h2 className="title m-0 mb-1 mt-3">A broad selection of courses</h2>
            {/* <p className="m-0" style={mainfs}>
              Choose from over 210,000 online video courses with new additions
              published every month
            </p>  */}
          </div>

       {/* Excel */}
<div className="col-md-12">
  <div className="course-details-content">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="personal-development-tab"
          data-bs-toggle="tab"
          data-bs-target="#personal-development"
          type="button"
          role="tab"
          aria-controls="personal-development"
          aria-selected="true"
        >
          Excel Courses
        </button>
      </li>
    </ul>
  </div>
</div>

<div className="col-lg-12 p-3">
  <div className="tab-content" id="myTabContent">
    <div
      className="tab-pane fade show active"
      id="personal-development"
      role="tabpanel"
      aria-labelledby="personal-development-tab"
    >
      <div className="course-tab-content">
        <div className="course-overview">
          {loading_personal_development_courses ? (
            <div className="row">
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
            </div>
          ) : personal_development_courses != null &&
            personal_development_courses.length > 0 ? (
            <CourseRangeList course={personal_development_courses} />
          ) : (
            <h4 className="mt-3 d-flex justify-content-center">
              No Excel Courses Available
            </h4>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

{/* Web */}
{/* <div className="col-md-12">
  <div className="course-details-content">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="web-development-tab"
          data-bs-toggle="tab"
          data-bs-target="#web-development"
          type="button"
          role="tab"
          aria-controls="web-development"
          aria-selected="true"
        >
          Development Courses
        </button>
      </li>
    </ul>
  </div>
</div>

<div className="col-lg-12 p-3">
  <div className="tab-content" id="myTabContent">
    <div
      className="tab-pane fade show active"
      id="web-development"
      role="tabpanel"
      aria-labelledby="web-development-tab"
    >
      <div className="course-tab-content">
        <div className="course-overview">
          {loading_it_software_courses ? (
            <div className="row">
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
              <CoursesPotraitSkeleton />
            </div>
          ) : it_software_courses != null &&
            it_software_courses.length > 0 ? (
            <CourseRangeList course={it_software_courses} />
          ) : (
            <h4 className="mt-3 d-flex justify-content-center">
              No Development Courses Available
            </h4>
          )}
        </div>
      </div>
    </div>
  </div>
</div> */}


        </div>
      </div>
    </div>
  );
};

export default CourseRange;
