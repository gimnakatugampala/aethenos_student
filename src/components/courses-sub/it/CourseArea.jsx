import React from "react";
import { useState } from "react";
import { course_data } from "../../data";
import SortingArea from "../course-filter/sorting-area";
import CourseTypeOne from "../course/course-type-one";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

import MDBContainer from "./MDBContainer";
import Instructor from "./Instructor";

const CourseArea = () => {
  const coursePerView = 8;
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);
  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 4);
  };
  return (
    <div className="edu-course-area course-area-1 gap-tb-text">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-bold display-3">IT</h1>
            <br />
            <h2>Causes to get you started</h2>
          </div>
        </div>
      </div>
      <div className="container mb-5">
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
                <CourseTypeOne data={course} classes="course-box-shadow" />
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
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-bold mt-5 mb-5">Featured course</h1>
            <Card className="mb-5">
              <MDBContainer />
            </Card>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-bold">Popular Instructors</h1>
            <Instructor />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-bold">All IT courses</h1>
            <Card className="p-3">
              <h4>Not sure? All courses have a 30-day money-back guarantee</h4>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseArea;
