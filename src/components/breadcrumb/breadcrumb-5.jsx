import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../contexts/mouse-move-context";
import moment from "moment";
import DisplayCardRatings from "../ratings-display/DisplayCardRatings";

const CourseBreadcrumb = ({ course }) => {
  const { title, instructor, language, rating_count, subtitle } = course || {};

  console.log(course);
  // const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="edu-breadcrumb-area breadcrumb-style-3 ">
      <div className="mx-5">
        <div className="breadcrumb-inner mx-5">
          <ul className="edu-breadcrumb m-0 p-0">
            <li className="breadcrumb-item">
              <a href={`/courses/${course.category_link_name}`}>
                {course.category}
              </a>
            </li>
            <li className="separator">
              <i className="icon-angle-right"></i>
            </li>
            <li className="breadcrumb-item">
              <a
                href={`/courses/${course.category_link_name}/${course.sub_category_link_name}`}
              >
                {course.sub_category}
              </a>
            </li>
            <li className="separator">
              <i className="icon-angle-right"></i>
            </li>
            <li className="breadcrumb-item">
              <a href={`/topic/${course.topic_link_name}`}>{course.topic}</a>
            </li>
            <li className="separator"></li>
            {/* <li className="breadcrumb-item active" aria-current="page">{subtitle}</li> */}
          </ul>

          <div className="page-title">
            <h3 className="col-md-12">{course.title}</h3>
            <h5 className="col-md-9 fw-light m-0 p-0">{course.sub_title}</h5>
          </div>

          <ul className="course-meta">
            <li className="course-rating">
            <DisplayCardRatings rating={Number.parseFloat(course.rating).toFixed(1)} />
              {/* <div className="rating">
                <i className="icon-23"></i>
                <i className="icon-23"></i>
                <i className="icon-23"></i>
                <i className="icon-23"></i>
                <i className="icon-23"></i>
              </div> */}

              <span className="rating-count">
                <a>
                  <b>({Number.parseFloat(course.rating).toFixed(1)})</b>
                </a>
              </span>
            </li>

            <li>
              <span className="text-decoration-underline">
                ({course.rating_count} {course.rating_count == 1 ? 'review' : 'reviews'})
              </span>
            </li>

            <li>
              <span>{course.student} {course.student == 1 ? 'student' : 'students'}</span>
            </li>
          </ul>
          <p className="m-0 p-0">
            <i className="icon-58"></i> Created by{" "}
            <a
              className="text-decoration-underline"
              href={`/users/${course.instructor_code}`}
            >
              {course.instructor}
            </a>
          </p>
          <ul className="course-meta">
            {/* <li className="course-rating"> */}

            <li>
              <span className="m-0 p-0">
                <i
                  style={{ fontSize: "17px" }}
                  className="fa-solid fa-calendar-days m-0"
                ></i>{" "}
                Created Date  {moment(course.created_date).format('DD-MM-YYYY')}
              </span>
            </li>
            <li>
              <i
                style={{ fontSize: "17px" }}
                className="fa-solid fa-globe m-0"
              ></i>{" "}
              {course.language}
            </li>
            <li>
              <span>
                <i
                  style={{ fontSize: "17px" }}
                  className="fa-solid fa-layer-group m-0"
                ></i>{" "}
                {course.level}
              </span>
            </li>

            {/* </li> */}
          </ul>
        </div>
      </div>
      {/* <ul className="shape-group">
        <li className="shape-1">
          <span></span>
        </li>
        <motion.li
          className="shape-2 scene"
          animate={{
            x: mouseReverse(40).x,
            y: mouseReverse(40).y,
          }}
        >
          <img src="/assets/images/about/shape-13.png" alt="shape" />
        </motion.li>
        <motion.li
          className="shape-3 scene"
          animate={{
            x: mouseDirection(40).x,
            y: mouseDirection(40).y,
          }}
        >
          <img src="/assets/images/about/shape-15.png" alt="shape" />
        </motion.li>
        <li className="shape-4">
          <span></span>
        </li>
        <motion.li
          className="shape-5 scene"
          animate={{
            x: mouseReverse(40).x,
            y: mouseReverse(40).y,
          }}
        >
          <img src="/assets/images/about/shape-07.png" alt="shape" />
        </motion.li>
      </ul> */}
    </div>
  );
};

export default CourseBreadcrumb;
