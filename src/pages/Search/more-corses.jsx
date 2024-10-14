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

  console.log(numSets + " numsets");

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
          duration={500}
          animation="slide"
          navButtonsAlwaysVisible={true}
          indicators={false}
        >
          {courses != null && courses.length > 0 ? (
            Array.from({ length: numSets }, (_, setIndex) => (
              <div key={setIndex} className="row">
                {[0, 1, 2, 3].map((offset) => {
                  const courseIndex = setIndex * 4 + offset;
                  return (
                    <div key={offset} className="col-md-4">
                      {paddedCourses[courseIndex] && (
                        <CourseTypeOne course={paddedCourses[courseIndex]} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <h4>No Courses Available</h4>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default CourseArea;
