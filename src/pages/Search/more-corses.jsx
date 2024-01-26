import React, { useState, useEffect } from "react";
import { getNewCourses } from "../../api/index";
import CourseTypeOne from "./course-one";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CourseArea = ({ searchKey }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getNewCourses(searchKey);
        setCourses(coursesData);
        console.log("Courses:", coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [searchKey]);

  const numSets = Math.floor(courses.length / 4);

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

        {numSets > 0 && (
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
            {Array.from({ length: numSets }, (_, setIndex) => (
              <div
                className="col-12"
                key={setIndex}
                style={{ display: "flex", gap: "15px" }}
              >
                {[0, 1, 2, 3].map((offset) => (
                  <div
                    key={courses[setIndex * 4 + offset].id}
                    style={{ flex: 1 }}
                  >
                    <CourseTypeOne course={courses[setIndex * 4 + offset]} />
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default CourseArea;
