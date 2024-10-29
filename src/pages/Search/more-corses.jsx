import React, { useState, useEffect } from "react";
import { getNewCourses } from "../../api/index";
import CourseTypeOne from "./course-one";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';


const CourseArea = ({ searchKey }) => {
  const [courses, setCourses] = useState([]);
  const [coursesPerRow, setCoursesPerRow] = useState(4);

  if (searchKey == null) {
    return null;
  }

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

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 525) {
        setCoursesPerRow(1);
      } else if (windowWidth < 768) {
        setCoursesPerRow(2); 
      } else if (windowWidth < 992) {
        setCoursesPerRow(2); 
      }else if (windowWidth < 1400) {
        setCoursesPerRow(2); 
      } else {
        setCoursesPerRow(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const numSets = Math.ceil(courses.length / coursesPerRow);
  const paddedCourses = [
    ...courses,
    ...Array(coursesPerRow - (courses.length % coursesPerRow)).fill(null),
  ];

  return (
    <div className="edu-course-area">
      <div className="carousel-container">
        <h3 className="heading-title" data-sal-delay="150" data-sal-duration="400">
          Hot and Fresh Courses
        </h3>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={coursesPerRow} 
          loop={false}
          style={{ height: '500px' }} 
        >
          {paddedCourses != null && paddedCourses.length > 0 ? (
            Array.from({ length: numSets }, (_, setIndex) => (
              <div key={setIndex} className="row" >
                {[...Array(coursesPerRow)].map((_, offset) => {
                  const courseIndex = setIndex * coursesPerRow + offset;
                  return (
                    <SwiperSlide key={offset} style={{height: "95%"}}>
                      {paddedCourses[courseIndex] && (
                        <CourseTypeOne course={paddedCourses[courseIndex]} />
                      )}
                    </SwiperSlide>
                  );
                })}
              </div>
            ))
          ) : (
            <h4>No Courses Available</h4>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default CourseArea;
