import React, { useState } from "react";
import SingleAccordion from "../../../components/course-details-2/single-accordion";
import { course_data } from "../../../data";
import SortingArea from "../../../components/course-filter/sorting-area";
import CourseTypeSix from "../../../components/course/course-type-six";
// import CourseTypeSix from "../course/course-type-six";

const CourseDetailsTwo = ({ course }) => {
  const coursePerView = 3;
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);

  const handleLoadData = () => {
    setNext((value) => value + 3);
  };

  const {} = course || {};

  const groupedCourses = {};
  courses.forEach((course) => {
    const category = course.category;
    if (!groupedCourses[category]) {
      groupedCourses[category] = [];
    }
    groupedCourses[category].push(course);
  });

  return (
    <section className=" mt-5 mb-5 course-details-area">
      <div className="container">
        <div className="row row--30">
          <div className="col-lg-12">
            <div className="course-details-content course-details-2">
              {/* overview */}

              <div>
                <div className="course-curriculam mb--90">
                  <h3
                    className="heading-title"
                    data-sal-delay="150"
                    data-sal="slide-up"
                    data-sal-duration="800"
                  >
                    Topics for This Course
                  </h3>
                  <p
                    data-sal-delay="150"
                    data-sal="slide-up"
                    data-sal-duration="800"
                  ></p>
                  <div
                    className="accordion edu-accordion"
                    id="accordionExample"
                    data-sal-delay="150"
                    data-sal="slide-up"
                    data-sal-duration="800"
                  >
                    <SingleAccordion
                      id="1"
                      title="Course Introduction"
                      desc={[
                        { title: "Introduction", icon: "icon-68" },
                        { title: "Course Overview", icon: "icon-68" },
                        {
                          title: "Course Overview",
                          badge_list: true,
                          question: 0,
                          minutes: 10,
                        },
                        {
                          title: "Course Exercise / Reference Files",
                          icon: "icon-68",
                        },
                        {
                          title:
                            "Code Editor Installation (Optional if you have one)",
                          icon: "icon-68",
                        },
                        { title: "Embedding PHP in HTML", icon: "icon-68" },
                      ]}
                    />
                    <SingleAccordion
                      id="2"
                      title="JavaScript Language Basics"
                      desc={[
                        { title: "Introduction", icon: "icon-68" },
                        { title: "Course Overview", icon: "icon-68" },
                        {
                          title: "Course Overview",
                          badge_list: true,
                          question: 2,
                          minutes: 12,
                        },
                        {
                          title: "Course Exercise / Reference Files",
                          icon: "icon-68",
                        },
                        {
                          title:
                            "Code Editor Installation (Optional if you have one)",
                          icon: "icon-68",
                        },
                        { title: "Embedding PHP in HTML", icon: "icon-68" },
                      ]}
                    />
                    <SingleAccordion
                      id="3"
                      title="Components & Databinding"
                      desc={[
                        { title: "Introduction", icon: "icon-68" },
                        { title: "Course Overview", icon: "icon-68" },
                        {
                          title: "Course Overview",
                          badge_list: true,
                          question: 4,
                          minutes: 15,
                        },
                        {
                          title: "Course Exercise / Reference Files",
                          icon: "icon-68",
                        },
                        {
                          title:
                            "Code Editor Installation (Optional if you have one)",
                          icon: "icon-68",
                        },
                        { title: "Embedding PHP in HTML", icon: "icon-68" },
                      ]}
                    />
                    <SingleAccordion
                      id="4"
                      title="Product Management Leadership"
                      desc={[
                        { title: "Introduction", icon: "icon-68" },
                        { title: "Course Overview", icon: "icon-68" },
                        {
                          title: "Course Overview",
                          badge_list: true,
                          question: 6,
                          minutes: 18,
                        },
                        {
                          title: "Course Exercise / Reference Files",
                          icon: "icon-68",
                        },
                        {
                          title:
                            "Code Editor Installation (Optional if you have one)",
                          icon: "icon-68",
                        },
                        { title: "Embedding PHP in HTML", icon: "icon-68" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <h3
                className="heading-title"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                Description
              </h3>
              <ul
                className="mb--90"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                <p>
                  Welcome to the Complete Web Development Bootcamp, the only
                  course you need to learn to code and become a full-stack web
                  developer. With 150,000+ ratings and a 4.8 average, my Web
                  Development course is one of the HIGHEST RATED courses in the
                  history of Udemy! At 65+ hours, this Web Development course is
                  without a doubt the most comprehensive web development course
                  available online. <br /> Even if you have zero programming
                  experience, this course will take you from beginner
                </p>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3
            className="heading-title"
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="800"
          >
            More Courses by Dr. Angela Yu
          </h3>

          <div className="edu-course-area course-area-1 ">
            <div className="container">
              <div className="row g-5">
                {courses?.slice(0, next)?.map((course) => (
                  <div key={course.id} className="col-md-6 col-lg-4">
                    <CourseTypeSix data={course} classes="course-box-shadow" />
                  </div>
                ))}
              </div>

              {next < courses.length && (
                <div
                  onClick={handleLoadData}
                  className="load-more-btn"
                  data-sal-delay="100"
                  data-sal="slide-up"
                  data-sal-duration="1200"
                >
                  <a className="edu-btn" style={{ cursor: "pointer" }}>
                    Load More <i className="icon-56"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsTwo;
