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

  const numSets = Math.ceil(courses.length / 4);
 
  const paddedCourses = [
    ...courses,
    ...Array(4 - (courses.length % 4)).fill(null),
  ];

  return (
    <div className="edu-course-area">
      <div className="carousel-container">
        <h3
          className="heading-title"
          data-sal-delay="150"
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
 
          {Array.from({ length: numSets }, (_, setIndex) => (
            <div
              className="col-12"
              key={setIndex}
              style={{ display: "flex", gap: "15px" }}
            >
              {[0, 1, 2, 3].map((offset) => {
                const courseIndex = (numSets - setIndex - 1) * 4 + offset;
                return (
                  <div
                    key={paddedCourses[courseIndex]?.id || offset}
                    style={{ flex: 1 }}
                  >
                    {paddedCourses[courseIndex] && (
                      <CourseTypeOne
                        course={paddedCourses[courseIndex]}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CourseArea;
