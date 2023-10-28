import React from "react";
import { useState } from "react";
import { course_data } from "../../../data";
import SortingArea from "../../../components/course-filter/sorting-area";
import CourseTypeOne from "../../../components/course/course-type-one";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardContainer from '../../../contexts/CardContainer'

import MDBContainer from "./MDBContainer";
import Instructor from "./Instructor";
import Buttons from "./Buttons";

const CourseArea = () => {
  const coursePerView = 8;
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);
  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 4);
  };
  return (
    <div >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="font-weight-bold">
            Causes to get you started
            </h4>
            <br />
          </div>
        </div>
      </div>
      <div className="container">
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
            <h4 className="font-weight-bold mb-4">Featured course</h4>
            <CardContainer className="mb-5">
              <MDBContainer />
            </CardContainer>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className="font-weight-bold">Popular Topics</h4>
            <div>
              <Buttons />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className="font-weight-bold">Popular Instructors</h4>
            <Instructor />
          </div>
        </div>
      </div>


    </div>
  );
};

export default CourseArea;
