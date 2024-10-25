import React from "react";
import Link from "next/link";

const CourseTypeTwo = ({ data, classes }) => {
  function getTotalLecturesCount(course) {
    return course.course_content.reduce((total, section) => {
      return total + (section.no_of_lectures || 0);
    }, 0);
  }
  return (
    <div className={`edu-course course-style-6 ${classes ? classes : ""}`}>
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data.id}`} legacyBehavior>
            <img
              src={`/assets/images/course/course-05/${data.img}`}
              alt="Course Thumb"
            />
          </Link>
          <div className="course-price price-round">
            ${Math.trunc(data.course_price)}
          </div>
        </div>
        <div className="content">
          <span className="course-level">{data.level}</span>
          <h5 className="title">
            <Link href={`/course-details/${data.id}`} legacyBehavior>
              {data.title}
            </Link>
          </h5>
          <ul className="course-meta">
            <li>
              <i className="icon-25"></i>
              {data.student} {data.student == 1 ? "Student" : "Students"}
            </li>
            <li>
              <i className="icon-24"></i>
              {getTotalLecturesCount(data)} Lessons
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CourseTypeTwo;
