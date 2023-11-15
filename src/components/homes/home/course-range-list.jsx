import React from 'react'
import CourseTypeFour from '../../course/course-type-four'
import SortingArea from "../../../components/course-filter/sorting-area";
import { course_data } from "../../../data";
import { useState } from 'react';


const CourseRangeList = () => {

    const coursePerView = 8;
    const [next, setNext] = useState(coursePerView);
    const [courses, setCourses] = useState(course_data);

    const handleLoadData = () => {
        setNext((value) => value + 4);
      };

  return (
    <>
            <SortingArea
          course_items={course_data}
          num={courses?.slice(0, next)?.length}
          setCourses={setCourses}
          courses={courses}
        />
        <div className="row g-5 mb-5">
          {courses.slice(0, next)?.map((course) => {
            return (
              <div key={course.id} className="col-md-6 col-xl-3">
                <CourseTypeFour data={course} classes="course-box-shadow" />
              </div>
            );
          })}
        </div>
        {next < courses.length && (
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
        )}
             
    </>
  )
}

export default CourseRangeList