import React from "react";
import { useRouter } from "next/router";
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
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useEffect } from "react";
import {
  GetInstructorDetails,
  IMG_HOST,
  GetCourseDetailsByInstructerCode,
} from "../../api";
import MainLoading from "../../functions/Loading/MainLoading";
import { SpinnerCircular } from "spinners-react";
// import SearchResults from '../../../components/course-category/landscape-courses/searchResults'
import SearchResults from "../../components/course-category/landscape-courses/searchResults";
import LargeLoading from "../../functions/Loading/LargeLoading";
import DisplayCardRatings from "../../components/ratings-display/DisplayCardRatings";

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
};

const CourseFiveArea = () => {
  const router = useRouter();
  const { id } = router.query;

  const [instructor_details, setinstructor_details] = useState("");
  const [loading, setloading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (id != null) {
      GetInstructorDetails(id, setinstructor_details, setloading);
      GetCourseDetailsByInstructerCode(id, setCourses);
    }

    // console.log(instructor_details)
  }, [id]);

  return (
    <div className="edu-course-area course-area-1 section-gap-equal">
      <div className="mx-2 mx-sm-3 mx-md-4 mx-lg-3">
        <div className="row g-5 mx-2 mx-sm-3 mx-md-4 mx-lg-3  justify-content-center">
          {loading ? (
            <LargeLoading />
          ) : (
            <div className="row col-md-12">
              <div className="col-md-8">
                <div>
                  <p className="m-0 p-0 mb-3">
                    <b>INSTRUCTOR</b>
                  </p>
                  <h1 className="m-0 p-0">{instructor_details.name}</h1>
                  <h6 className="m-0 p-0">{instructor_details.headline}</h6>
                </div>

                <div className="d-flex my-2">
                  <div className="m-3">
                    <p className="m-0 p-0">
                      Total{" "}
                      {instructor_details.totalStudents == 1
                        ? "Student"
                        : "Students"}
                    </p>
                    <h6 className="m-0 p-0">
                      {instructor_details.totalStudents}
                    </h6>
                  </div>

                  <div className="m-3">
                    <p className="m-0 p-0">Reviews</p>
                    <h6 className="m-0 p-0">{instructor_details.reviews}</h6>
                  </div>

                  <div className="m-3">
                    <p className="m-0 p-0">Ratings</p>

                    {instructor_details.rating &&
                    Number.parseFloat(instructor_details.rating) > 0 ? (
                      <h5 className="m-0 p-0">
                        <DisplayCardRatings
                          rating={Number.parseFloat(
                            instructor_details.rating
                          ).toFixed(1)}
                        />
                        <h6>
                          (
                          {Number.parseFloat(instructor_details.rating).toFixed(
                            1
                          )}
                          )
                        </h6>
                      </h5>
                    ) : (
                      <h6 className="m-0 p-0">0.0</h6>
                    )}
                  </div>
                </div>

                <div className="my-3 mx-3">
                  <h5 className="m-0 p-0">About me</h5>
                  <span className="ri-1x">{instructor_details.about}</span>
                </div>
              </div>

              <div className="col-md-4 text-center mx-auto">
              <div
          className="m-5"
          style={{
            width: "220px",
            height: "220px",
            margin: "0 auto", // Center the container within the parent
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="rounded-circle"
            style={{ width: "100%", height: "100%", objectFit: "cover" , backgroundPositionY :'40px'}}
            src={
              instructor_details.profileImage == null
                ? `/images/course/instructor_profile_img.png`
                : `${IMG_HOST}${instructor_details.profileImage}`
            }
            alt={`${instructor_details.name}`}
          />
        </div>



                {/* <a
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
                </a> */}

                {instructor_details.secondaryEmail && (
                  <a
                    href={`mailto:${instructor_details.secondaryEmail}`}
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
                )}

                {instructor_details.website && (
                  <a
                    target="_blank"
                    href={
                      instructor_details.website.startsWith("http")
                        ? instructor_details.website
                        : `https://${instructor_details.website}`
                    }
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
                )}

                {instructor_details.twitter && (
                  <a
                    target="_blank"
                    href={
                      instructor_details.twitter.startsWith("http")
                        ? instructor_details.twitter
                        : `https://twitter.com/${instructor_details.twitter}`
                    }
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
                    <i className="fa-brands fa-x-twitter"></i>
                    Twitter
                  </a>
                )}

                {instructor_details.facebook && (
                  <a
                    target="_blank"
                    href={
                      instructor_details.facebook.startsWith("http")
                        ? instructor_details.facebook
                        : `https://www.facebook.com/${instructor_details.facebook}`
                    }
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
                )}

                {instructor_details.linkedin && (
                  <a
                    target="_blank"
                    href={
                      instructor_details.linkedin.startsWith("http")
                        ? instructor_details.linkedin
                        : `https://www.linkedin.com/in/${instructor_details.linkedin}`
                    }
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
                )}

                {/* Youtube */}
                {instructor_details.youtube && (
                  <a
                    target="_blank"
                    href={
                      instructor_details.youtube.startsWith("http")
                        ? instructor_details.youtube
                        : `https://www.youtube.com/@${instructor_details.youtube}`
                    }
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
                )}
              </div>
            </div>
          )}

          <SearchResults allcourses={courses} />
        </div>
      </div>
    </div>
  );
};

export default CourseFiveArea;
