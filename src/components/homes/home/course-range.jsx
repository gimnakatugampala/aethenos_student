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
    GetCourseHomeMarketing(setmarketing_courses, setloading_marketing_courses);
    GetCourseHomeDevelopment(
      setdevelopment_courses,
      setloading_development_courses
    );
    GetCourseHomePhotography(
      setloading_photography_courses,
      setphotography_courses
    );
    GetCourseHomeDesign(setdeisgn_courses, setloading_design_courses);
    GetCourseHomeBusiness(setbusiness_courses, setloading_business_courses);
  }, []);

  return (
    <div className="edu-brand-area brand-area-1 p-3 ">
      <div className="container-fluid">
        <div className="row">
          <div className="mb-4"> 
            <h2 className="title m-0 mb-1 mt-1">A broad selection of courses</h2>
            {/* <p className="m-0" style={mainfs}>
              Choose from over 210,000 online video courses with new additions
              published every month
            </p>  */}
          </div>

          <div className="col-md-12">
            <div className="course-details-content">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                
                {/* <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="business-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#business"
                    type="button"
                    role="tab"
                    aria-controls="business"
                    aria-selected="true"
                  >
                    Business
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="design-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#design"
                    type="button"
                    role="tab"
                    aria-controls="design"
                    aria-selected="false"
                  >
                    Design
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="photography-video-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#photography-video"
                    type="button"
                    role="tab"
                    aria-controls="photography-video"
                    aria-selected="false"
                  >
                    Photography & Video
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="development-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#development"
                    type="button"
                    role="tab"
                    aria-controls="development"
                    aria-selected="false"
                  >
                    Development
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="marketing-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#marketing"
                    type="button"
                    role="tab"
                    aria-controls="marketing"
                    aria-selected="false"
                  >
                    Marketing
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="it-software-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#it-software"
                    type="button"
                    role="tab"
                    aria-controls="it-software"
                    aria-selected="false"
                  >
                    IT & Software
                  </button>
                </li> */}

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="personal-development-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#personal-development"
                    type="button"
                    role="tab"
                    aria-controls="personal-development"
                    aria-selected="false"
                  >
                    Excel Courses
                  </button>
                </li>

              </ul>
            </div>
          </div>

          <div className="col-lg-12 p-3">
            <div className="tab-content" id="myTabContent">

              {/* <div
                className="tab-pane fade show active"
                id="business"
                role="tabpanel"
                aria-labelledby="business-tab"
              >
                <div className="course-tab-content">
                  <div className="course-overview">
                 

                    {loading_business_courses ? (
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
                    ) : business_courses != null &&
                      business_courses.length > 0 ? (
                      <CourseRangeList course={business_courses} />
                    ) : (
                      <h4 className="mt-3 d-flex justify-content-center">No Business Courses Available</h4>
                    )}

            
                  </div>
                </div>
              </div> */}

              {/* <div
                className="tab-pane fade"
                id="design"
                role="tabpanel"
                aria-labelledby="design-tab"
              >
                <div className="course-tab-content">
                  <div className="course-overview">
                

                    {loading_design_courses ? (
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
                    ) : deisgn_courses != null && deisgn_courses.length > 0 ? (
                      <CourseRangeList course={deisgn_courses} />
                    ) : (
                      <h4 className="mt-3 d-flex justify-content-center">No Design Courses Available</h4>
                    )}

                  </div>
                </div>
              </div> */}

              {/* <div
                className="tab-pane fade"
                id="photography-video"
                role="tabpanel"
                aria-labelledby="photography-video-tab"
              >
                <div className="course-tab-content">
                  <div className="course-overview">
                  

                    {loading_photography_courses ? (
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
                    ) : photography_courses != null &&
                      photography_courses.length > 0 ? (
                      <CourseRangeList course={photography_courses} />
                    ) : (
                      <h4 className="mt-3 d-flex justify-content-center">No Photography Courses Available</h4>
                    )}

                
                  </div>
                </div>
              </div> */}

              {/* <div
                className="tab-pane fade"
                id="development"
                role="tabpanel"
                aria-labelledby="development-tab"
              >
                <div className="course-tab-content">
                  <div className="course-overview">
                  

                    {loading_development_courses ? (
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
                    ) : development_courses != null &&
                      development_courses.length > 0 ? (
                      <CourseRangeList course={development_courses} />
                    ) : (
                      <h4 className="mt-3 d-flex justify-content-center">No Development Courses Available</h4>
                    )}

                  
                  </div>
                </div>
              </div> */}

              {/* <div
                className="tab-pane fade"
                id="marketing"
                role="tabpanel"
                aria-labelledby="marketing-tab"
              >
                <div className="course-tab-content">
                  <div className="course-overview">
                 

                    {loading_marketing_courses ? (
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
                    ) : marketing_courses != null &&
                      marketing_courses.length > 0 ? (
                      <CourseRangeList course={marketing_courses} />
                    ) : (
                      <h4 className="mt-3 d-flex justify-content-center">No Marketing Courses Available</h4>
                    )}

                  
                  </div>
                </div>
              </div> */}

              {/* <div
                className="tab-pane fade"
                id="it-software"
                role="tabpanel"
                aria-labelledby="it-software-tab"
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
                        No It & Software Courses Available
                      </h4>
                    )}

         
                  </div>
                </div>
              </div> */}

              <div
                className="tab-pane fade show active"
                id="personal-development"
                role="tabpanel"
                aria-labelledby="personal-development-tab"
              >
                <div className="course-tab-content">
                  <div className="course-overview">
                    {/* <CourseRangeList /> */}

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
                      <h4 className="mt-3 d-flex justify-content-center" >
                        No Excel Courses Available
                      </h4>
                    )}

                    {/* {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRange;
