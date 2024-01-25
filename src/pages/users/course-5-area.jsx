import React from "react";
import { useRouter } from 'next/router';
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
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useEffect } from "react";
import { GetInstructorDetails, IMG_HOST } from "../../api";
import MainLoading from "../../functions/Loading/MainLoading";
import { SpinnerCircular } from 'spinners-react';



// course_items
const course_items = course_data.filter(
  (arr, index, self) =>
    index === self.findIndex((i) => i.img === arr.img && i.State === arr.State)
);

const stylesBlock = {
  fontWeight: "600",
  width: "200px",
  marginBottom: "10px",
  height: "50px",
  borderRadius: "0",
  transition: "background-color 0.3s",
  backgroundColor: "transparent",
  color: "inherit",
  borderWidth: "0.0005px",
  borderColor: "black",
}

const CourseFiveArea = () => {

  const router = useRouter();
  const { id } = router.query;

  const [instructor_details, setinstructor_details] = useState("")
  const [loading, setloading] = useState(true)

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


    useEffect(() => {

      if(id != null){
        GetInstructorDetails(id,setinstructor_details,setloading)
      }
   
    }, [id])
    

  return (
    <div className="edu-course-area course-area-1 section-gap-equal">
      <div className="container">
        <div className="row g-5">

          {loading ? <div className="col-md-5 m-auto">  <SpinnerCircular size={100} thickness={150} speed={100} color="#e01D20" /> </div>: (

          <div className="row col-md-12">
            <div className="col-md-8">
              <div>
                <p className="m-0 p-0"><b>INSTRUCTOR</b></p>
                <h1 className="m-0 p-0">{instructor_details.name}</h1>
                <h6 className="m-0 p-0">{instructor_details.headline}</h6>
           
              </div>

              <div className="d-flex my-2">

                <div className="m-3">
                  <p className="m-0 p-0">Total students</p>
                  <h5 className="m-0 p-0">{instructor_details.totalStudents}</h5>
                </div>

                <div className="m-3">
                  <p className="m-0 p-0">Reviews</p>
                  <h5 className="m-0 p-0">{instructor_details.reviews}</h5>
                </div>
              </div>
              
              <div className="my-3">
                <h5 className="m-0 p-0">About me</h5>
                <span className="ri-1x">
                  {instructor_details.about}
                </span>
              </div>
            </div>

            <div className="col-md-4 text-center mx-auto">
              <div className="m-5">
                <img
                  className="rounded-circle w-75"
                  style={{height:'220px',objectFit:'cover'}}
                  src={`${IMG_HOST}${instructor_details.profileImage}`}
                  alt={`${instructor_details.name}`}
                />
              </div>
              <a
                href={`mailto:${instructor_details.email}`}
                className="btn btn-outline-dark text-center fs-6 mb-1"
                style={stylesBlock}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#F0FFFF";
                  e.target.style.color = "inherit";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "inherit";
                }}
              >
                
                  <AlternateEmailIcon />
                  Email
              
              </a>

              <a
                href={`https://${instructor_details.website}`}
                className="btn btn-outline-dark text-center fs-6 mb-1"
                style={stylesBlock}
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
                href={`https://twitter.com/${instructor_details.twitter}`}
                className="btn btn-outline-dark text-center fs-6 mb-1"
                style={stylesBlock}
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
                href={`https://www.facebook.com/${instructor_details.facebook}`}
                className="btn btn-outline-dark text-center fs-6 mb-1"
                style={stylesBlock}
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
                href={`https://www.linkedin.com/in/${instructor_details.linkedin}`}
                className="btn btn-outline-dark text-center fs-6 mb-1"
                style={stylesBlock}
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

                {/* Youtube */}
              <a
                href={`https://www.youtube.com/c/${instructor_details.youtube}`}
                className="btn btn-outline-dark text-center fs-6 mb-1"
                style={stylesBlock}
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
          )}

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
