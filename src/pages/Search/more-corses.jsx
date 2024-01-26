import React, { useState, useEffect } from "react";
import { getNewCourses } from "../../api/index";
import CourseTypeOne from "./course-one";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CourseArea = ({ searchKey }) => { // Destructure the props to get searchTerm
  const [next, setNext] = useState(5);
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
              className="col-12"
              key={course.id}
              style={{ display: "flex", gap: "15px" }}
            >
              {[1, 2, 3, 4].map((offset) => (
                <div key={course.id + offset} style={{ flex: 1 }}>
                  <CourseTypeOne
                    course={courses[index + offset]} 
                  />
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CourseArea;
