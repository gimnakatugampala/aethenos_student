import React, { useState } from "react";
import { course_data } from "../../data";
import CourseTypeOne from "./course-one";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CourseArea = () => {
  const [next, setNext] = useState(5); // Adjust the number of items as needed
  const [courses, setCourses] = useState(course_data);

  return (
    <div className="edu-course-area">
      <div className="carousel-container">
        <h3
          className="heading-title"
          data-sal-delay="150"
          data-sal="slide-up"
          data-sal-duration="400"
        >
          Hot and Fresh Courses
        </h3>

        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          emulateTouch={true}
          autoPlay={false}
          centerMode={false}
          showArrows={true}
          selectedItem={0}
          interval={5000}
          transitionTime={500}
          showIndicators={false}
          stopOnHover={true}
        >
          {courses.slice(1, next).map((course, index) => (
            <div
              className="col-12  px-3"
              key={course.id}
              style={{ display: "flex", gap: "25px" }}
            >
              {[1, 2, 3, 4].map((offset) => (
                <CourseTypeOne
                  key={course.id + offset}
                  data={[courses[index + offset]]}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CourseArea;
