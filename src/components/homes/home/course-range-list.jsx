import React from "react";
import CourseTypeFour from "../../course/course-type-four";
import SortingArea from "../../../components/course-filter/sorting-area";
import { course_data } from "../../../data";
import { useState } from "react";

const CourseRangeList = ({ course }) => {
  // console.log(course)

  const coursePerView = 20;
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course);

  const handleLoadData = () => {
    setNext((value) => value + 4);
  };

  return (
    <>
      {courses != null && (
        <SortingArea
          course_items={course}
          num={courses?.slice(0, next)?.length}
          setCourses={setCourses}
          courses={courses}
        />
      )}

      <div className="row g-3 mb-5">
        {courses != null &&
          courses.slice(0, next)?.map((course, index) => {
            return (
              <div key={course.id} className="col-md-6 col-xl-3">
                <CourseTypeFour
                  data={course}
                  index={index}
                  courses={courses}
                  classes="course-box-shadow"
                />
              </div>
            );
          })}
      </div>
      <div>
      {/* {next < courses != null && (
        <div
          onClick={handleLoadData}
          className="load-more-btn"
          data-sal-delay="100"
          // data-sal="slide-up"
          data-sal-duration="1200"
          // style={{ display: next < courses ? "block" : "none" }}
        >
          <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
            Load More <i className="icon-56"></i>
          </a>
        </div>
      )} */}
      </div>
   
    </>
  );
};

export default CourseRangeList;
