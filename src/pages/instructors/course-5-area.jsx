import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { course_data } from "../../data";
import CourseSidebarTwo from "./common/sidebar/course-sidebar-2";
import SortingArea from "./course-filter/sorting-area";
// import CourseSidebarTwo from "../../components/common/sidebar/course-sidebar-2";
// import SortingArea from "../../components/course-filter/sorting-area";
import CourseItems from "./course-items";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
// course_items
const course_items = course_data.filter(
  (arr, index, self) =>
    index === self.findIndex((i) => i.img === arr.img && i.State === arr.State)
);

const CourseFiveArea = () => {
  const [courses, setCourses] = useState(course_items);
  const [showing, setShowing] = useState(0);
  const { categories, instructors, levels, languages, price } = useSelector(
    (state) => state.filter
  );

  let items = courses
    ?.filter((item1) =>
      categories?.length !== 0
        ? categories?.some((item2) => item1.category == item2)
        : item1
    )
    .filter((item1) =>
      instructors?.length !== 0
        ? instructors?.some((item2) => item1.instructor == item2)
        : item1
    )
    .filter((item1) =>
      levels?.length !== 0
        ? levels?.some((item2) => item1.level == item2)
        : item1
    )
    .filter((item1) =>
      languages?.length !== 0
        ? languages?.some((item2) => item1.language == item2)
        : item1
    )
    .filter((item) => Number(item.course_price) <= price);

  return (
    <div className="edu-course-area course-area-1 section-gap-equal">
      <div className="container">
        <div className="row g-5">
          <div className="d-flex col-6">
            <div className="col-12">
              <div>
                <h6>INSTRUCTOR</h6>
                <h1>Dr. Angela Yu</h1>
                <h5>Data Scientist</h5>
                <button className="border-0 bg-danger text-white">
                  Aethenos Instructor Partner
                </button>
              </div>
              <div className="d-flex ">
                <div className=" m-lg-3">
                  <h4>Total students</h4>
                  <h3>2,543,010</h3>
                </div>

                <div className=" m-lg-3">
                  <h4>Reviews</h4>
                  <h3>677,929</h3>
                </div>
              </div>
              <div>
                <h3>About me</h3>
                <span className="ri-1x">
                  My name is Kirill Eremenko and I am super-psyched that you are
                  reading this! Professionally, I come from the Data Science
                  consulting space with experience in finance, retail, transport
                  and other industries. I was trained by the best analytics
                  mentors at Deloitte Australia and since starting on Udemy I
                  have passed on my knowledge to thousands of aspiring data
                  scientists. From my courses you will straight away notice how
                  I combine my real-life experience and academic background in
                  Physics and Mathematics to deliver professional step-by-step
                  coaching in the space of Data Science. One of the strongest
                  sides of my teaching style is that I focus on intuitive
                  explanations, so you can be sure that you will truly
                  understand even the most complex topics. To sum up, I am
                  absolutely and utterly passionate about Data Science and I am
                  looking forward to sharing my passion and knowledge with you!
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="m-lg-5">
                <img
                  className=" "
                  src="https://img-c.udemycdn.com/user/200_H/2364054_83cd_5.jpg"
                  alt=""
                />
              </div>
              <a
                className="btn btn-outline-dark text-center fs-4 my-2"
                style={{
                  fontWeight: "900",
                  width: "250px",
                  marginLeft: "10px",
                  paddingRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0",
                  transition: "background-color 0.3s",
                  backgroundColor: "transparent",
                  color: "inherit",
                  borderWidth: "0.0005px",
                  borderColor: "black",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F0FFFF";
                  e.target.style.color = "inherit";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                <LanguageIcon />
                Website
              </a>
              <a
                className="btn btn-outline-dark text-center fs-4 my-2"
                style={{
                  fontWeight: "900",
                  width: "250px",
                  marginLeft: "10px",
                  paddingRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0",
                  transition: "background-color 0.3s",
                  backgroundColor: "transparent",
                  color: "inherit",
                  borderWidth: "0.0005px",
                  borderColor: "black",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F0FFFF";
                  e.target.style.color = "inherit";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                <TwitterIcon />
                Twitter
              </a>
              <a
                className="btn btn-outline-dark text-center fs-4 my-2"
                style={{
                  fontWeight: "900",
                  width: "250px",
                  marginLeft: "10px",
                  paddingRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0",
                  transition: "background-color 0.3s",
                  backgroundColor: "transparent",
                  color: "inherit",
                  borderWidth: "0.0005px",
                  borderColor: "black",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F0FFFF";
                  e.target.style.color = "inherit";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                <FacebookIcon />
                Facebook
              </a>
              <a
                className="btn btn-outline-dark text-center fs-4 my-2"
                style={{
                  fontWeight: "900",
                  width: "250px",
                  marginLeft: "10px",
                  paddingRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0",
                  transition: "background-color 0.3s",
                  backgroundColor: "transparent",
                  color: "inherit",
                  borderWidth: "0.0005px",
                  borderColor: "black",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F0FFFF";
                  e.target.style.color = "inherit";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <a
                className="btn btn-outline-dark text-center fs-4 my-2"
                style={{
                  fontWeight: "900",
                  width: "250px",
                  marginLeft: "10px",
                  paddingRight: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0",
                  transition: "background-color 0.3s",
                  backgroundColor: "transparent",
                  color: "inherit",
                  borderWidth: "0.0005px",
                  borderColor: "black",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F0FFFF";
                  e.target.style.color = "inherit";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                <YouTubeIcon />
                Youtube
              </a>
            </div>
          </div>
          <div className="col-lg-3 order-lg-2">
            <CourseSidebarTwo course_items={course_items} />
          </div>

          <div className="col-lg-9 col-pr--35 order-lg-1">
            {/* sorting area start */}
            <SortingArea
              course_items={course_items}
              course_list={true}
              num={showing}
              setCourses={setCourses}
              courses={courses}
              items={items}
            />
            {/* sorting area end */}

            <CourseItems
              itemsPerPage={6}
              items={items}
              course_style="9"
              setShowing={setShowing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFiveArea;
