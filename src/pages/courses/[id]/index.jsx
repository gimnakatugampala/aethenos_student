import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Footer, Header, Wrapper } from "../../../layout";
import SEO from "../../../components/seo";
import {
  GetAllCoursesByCategory,
  GetCourseCategoryTitle,
  GetCoursesByCategoryInstructor,
  GetCoursesByCategoryMostPopular,
  GetCoursesByCategoryNew,
  GetCoursesByCategoryTopics,
  GetCoursesByCategoryTrending,
  GetSubCategoriesByCategoryLinkName,
} from "../../../api";
import CourseTypeOne from "../../../components/course/course-type-one";
import CourseFourArea from "../../../components/course-category/landscape-courses/searchResults";
import { course_data } from "../../../data";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import CardContainer from "../../../contexts/CardContainer";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import OneLineSkeleton from "../../../functions/Skeletons/OneLineSkeleton";
import CoursesPotraitSkeleton from "../../../functions/Skeletons/CoursesPotraitSkeleton";
import TopicsListSkeleton from "../../../functions/Skeletons/TopicsListSkeleton";
import InstructorsListSkeleton from "../../../functions/Skeletons/InstructorsListSkeleton";
import LandscapeListSkeleton from "../../../functions/Skeletons/LandscapeListSkeleton";

export async function getServerSideProps({ query }) {
  try {
    const { id } = query;

    if (!id) {
      return {
        props: {
          CatName: "Category Not Found"
        },
      };
    }

    

    return {
      props: {
        CatName: id .split(/[_-]/) // Split by both underscore and hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
        .join(" ") // Join with space
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      props: {
        TName: "Error Loading Category details",
      },
    };
  }
}

const GetCourseByCategory = ({ CatName }) => {
  const router = useRouter();
  const { id } = router.query;
  const coursePerView = 8;
  const [next, setNext] = useState(coursePerView);

  const [sub_categories, setsub_categories] = useState([]);

  const [most_popular_courses, setmost_popular_courses] = useState(course_data);
  const [new_courses, setnew_courses] = useState([]);
  const [popular_topics, setpopular_topics] = useState([]);

  const [allcourses, setallcourses] = useState(course_data);

  const [instructors, setinstructors] = useState([]);
  const [trending_courses, settrending_courses] = useState(course_data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [loading_sub_categories, setloading_sub_categories] = useState(true);
  const [loading_top_title, setloading_top_title] = useState(true);
  const [loading_most_popular_courses, setloading_most_popular_courses] =
    useState(true);
  const [loading_new_courses, setloading_new_courses] = useState(true);
  const [loading_trending_courses, setloading_trending_courses] =
    useState(true);
  const [loading_topics_list, setloading_topics_list] = useState(true);
  const [loading_instructors_list, setloading_instructors_list] =
    useState(true);
  const [loading_all_courses_list, setloading_all_courses_list] =
    useState(true);

  const [CategoryName, setCategoryName] = useState("");

  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 4);
  };

  useEffect(() => {
    if (id != null) {
      GetSubCategoriesByCategoryLinkName(
        id,
        setsub_categories,
        setloading_sub_categories
      );
      GetCourseCategoryTitle(setCategoryName, id, setloading_top_title);
      GetCoursesByCategoryNew(setnew_courses, setloading_new_courses, id);
      GetCoursesByCategoryMostPopular(
        setmost_popular_courses,
        setloading_most_popular_courses,
        id
      );
      GetCoursesByCategoryTrending(
        settrending_courses,
        setloading_trending_courses,
        id
      );
      GetCoursesByCategoryInstructor(
        id,
        setinstructors,
        setloading_instructors_list
      );
      GetCoursesByCategoryTopics(id, setpopular_topics, setloading_topics_list);
      GetAllCoursesByCategory(id, setallcourses, setloading_all_courses_list);
      // console.log(id)
    }

    console.log(instructors);
  }, [CategoryName, loading_top_title, id]);

  const ITEM_HEIGHT = 48;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <SEO pageTitle={`Category ● ${CatName}`} />
      <Header />

      {loading_sub_categories ? (
        <div className="container-fluid p-3">
          <OneLineSkeleton height={60} />
        </div>
      ) : (
        <CardContainer className="p-3">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="d-flex align-items-center">
              <Typography className="mx-3">
                <a href={`/courses/${id}`}>
                  <b>{CategoryName == "" ? "Loading" : CategoryName}</b>
                </a>
              </Typography>

              <i className="fas fa-chevron-right fa-2x"></i>

              {sub_categories != null &&
                sub_categories.length > 0 &&
                sub_categories.slice(0, 5).map((subCategory, index) => (
                  <Typography key={index} className="mx-3">
                    <a href={`/courses/${id}/${subCategory.subLinkName}`}>
                      {subCategory.subCategory}
                    </a>
                  </Typography>
                ))}
            </div>

            {sub_categories != null && sub_categories.length > 5 && (
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            )}

            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                },
              }}
            >
              {sub_categories != null &&
                sub_categories.length > 0 &&
                sub_categories.slice(5).map((sub_cat_option, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    <a href={`/courses/${id}/${sub_cat_option.subLinkName}`}>
                      {sub_cat_option.subCategory}
                    </a>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </CardContainer>
      )}

      <section className="edu-section-gap course-details-area p-0">
        <div className=" mx-2 mx-sm-5 mx-md-5 mx-lg-5">
          <div className="row  mx-2 mx-sm-5 mx-md-5 mx-lg-5">
            {loading_top_title ? (
              <>
                <OneLineSkeleton height={20} />
                <OneLineSkeleton height={20} />
              </>
            ) : (
              <>
                <h2>{CategoryName} Courses</h2>
                <h4>Courses to get you started</h4>
              </>
            )}

            <div className="col-lg-5">
              <div className="course-details-content">
                <ul
                  className="nav nav-tabs justify-content-start"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="most-popular-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#most-popular"
                      type="button"
                      role="tab"
                      aria-controls="most-popular"
                      aria-selected="true"
                    >
                      Most Popular
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="new-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#new"
                      type="button"
                      role="tab"
                      aria-controls="new"
                      aria-selected="false"
                    >
                      New
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="trending-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#trending"
                      type="button"
                      role="tab"
                      aria-controls="trending"
                      aria-selected="false"
                    >
                      Trending
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-12 p-3">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="most-popular"
                  role="tabpanel"
                  aria-labelledby="most-popular-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-overview">
                      {loading_most_popular_courses ? (
                        <div className="row">
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                        </div>
                      ) : (
                        <div className="row g-3 mb-5">
                          {most_popular_courses != null &&
                          most_popular_courses.length > 0 ? (
                            most_popular_courses
                              .slice(0, next)
                              ?.map((course) => {
                                return (
                                  <div
                                    key={course.id}
                                    className="col-md-6 col-xl-3"
                                  >
                                    <CourseTypeOne
                                      data={course}
                                      classes="course-box-shadow"
                                    />
                                  </div>
                                );
                              })
                          ) : (
                            <h4>No Most Popular Courses Available</h4>
                          )}
                        </div>
                      )}

                      {next < most_popular_courses.length && (
                        <div
                          onClick={handleLoadData}
                          className="load-more-btn"
                          data-sal-delay="100"
                          data-sal="slide-up"
                          data-sal-duration="1200"
                        >
                          <a
                            className="edu-btn mb-5"
                            style={{ cursor: "pointer" }}
                          >
                            Load More <i className="icon-56"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="new"
                  role="tabpanel"
                  aria-labelledby="new-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-overview">
                      {loading_new_courses ? (
                        <div className="row">
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                        </div>
                      ) : (
                        <div className="row g-3 mb-5">
                          {new_courses != null && new_courses.length > 0 ? (
                            new_courses.slice(0, next)?.map((course) => {
                              return (
                                <div
                                  key={course.id}
                                  className="col-md-6 col-xl-3"
                                >
                                  <CourseTypeOne
                                    data={course}
                                    classes="course-box-shadow"
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <h4>No New Courses Available</h4>
                          )}
                        </div>
                      )}

                      {next < new_courses.length && (
                        <div
                          onClick={handleLoadData}
                          className="load-more-btn"
                          data-sal-delay="100"
                          data-sal="slide-up"
                          data-sal-duration="1200"
                        >
                          <a
                            className="edu-btn mb-5"
                            style={{ cursor: "pointer" }}
                          >
                            Load More <i className="icon-56"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="trending"
                  role="tabpanel"
                  aria-labelledby="trending-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-overview">
                      {loading_trending_courses ? (
                        <div className="row">
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                          <CoursesPotraitSkeleton />
                        </div>
                      ) : (
                        <div className="row g-3 mb-5">
                          {trending_courses != null &&
                          trending_courses.length > 0 ? (
                            trending_courses.slice(0, next)?.map((course) => {
                              return (
                                <div
                                  key={course.id}
                                  className="col-md-6 col-xl-3"
                                >
                                  <CourseTypeOne
                                    data={course}
                                    classes="course-box-shadow"
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <h4>No Trending Courses Available</h4>
                          )}
                        </div>
                      )}

                      {next < trending_courses.length && (
                        <div
                          onClick={handleLoadData}
                          className="load-more-btn"
                          data-sal-delay="100"
                          data-sal="slide-up"
                          data-sal-duration="1200"
                        >
                          <a
                            className="edu-btn mb-5"
                            style={{ cursor: "pointer" }}
                          >
                            Load More <i className="icon-56"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mb-5">
              <h4 className="p-2">Popular Topics</h4>

              {loading_topics_list ? (
                <div className="row">
                  <TopicsListSkeleton />
                  <TopicsListSkeleton />
                  <TopicsListSkeleton />
                  <TopicsListSkeleton />
                </div>
              ) : (
                <Carousel
                  autoPlay={false}
                  duration={500}
                  animation="slide"
                  navButtonsAlwaysVisible={true}
                  indicators={false}
                >
                  {popular_topics != null || popular_topics.length > 0 ? (
                    popular_topics.map((item, i) => (
                      <div key={i} className="row">
                        {item.topics.map((topic, index) => (
                          <div key={index} className="col-md-3 text-center">
                            <CardContainer>
                              <a href={`/topic/${topic.topicLinkName}`}>
                                {topic.topic}
                              </a>
                            </CardContainer>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <h4>No Topics Available</h4>
                  )}
                </Carousel>
              )}
            </div>

            <div className="col-lg-12 mb-5">
              <h4 className="p-2">Popular Instructors</h4>

              {loading_instructors_list ? (
                <div className="row">
                  <InstructorsListSkeleton />
                  <InstructorsListSkeleton />
                  <InstructorsListSkeleton />
                </div>
              ) : (
                <Carousel
                  autoPlay={false}
                  duration={500}
                  animation="slide"
                  navButtonsAlwaysVisible={true}
                  indicators={false}
                >
                  {instructors != null || instructors.length > 0 ? (
                    instructors.map((page, index) => (
                      <div key={index} className="row">
                        {page.single.map((item, itemIndex) => (
                          <CardContainer
                            key={itemIndex}
                            className="col-md-4 mb-2 p-2"
                          >
                            <a href={`/users/${item.userCode}`}>
                              <div
                                className="row h-100 p-0 m-0"
                                style={{
                                  borderRadius: "0",
                                  transition: "background-color 0.3s",
                                  backgroundColor: "transparent",
                                  color: "inherit",
                                  textAlign: "left",
                                }}
                              >
                                <div className="col-md-3">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                      borderRadius: "50%",
                                      height: "50px",
                                      width: "55px",
                                    }}
                                  />
                                </div>
                                <div className="col-md-9">
                                  <h6
                                    className="m-0 p-0"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {item.title.length > 17
                                      ? item.title.slice(0, 17) + "..."
                                      : item.title}
                                  </h6>
                                  <div>
                                    <p
                                      className="m-0 p-0"
                                      style={{ fontSize: "13px" }}
                                    >
                                      {item.description.length > 35
                                        ? item.description.slice(0, 35) + "..."
                                        : item.description}
                                    </p>
                                  </div>

                                  <div className="d-flex align-items-center">
                                    <span>
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "18px",
                                          color: "#B4690E",
                                        }}
                                      >
                                        {item.rating}
                                      </span>
                                      <StarIcon
                                        style={{
                                          fontSize: "20px",
                                          color: "#B4690E",
                                        }}
                                      />
                                    </span>

                                    <p
                                      className="m-0 p-0 align-self-center mt-1 ml-1"
                                      style={{
                                        fontSize: "12px",
                                        color: "#B4690E",
                                      }}
                                    >
                                      Instructor Rating
                                    </p>
                                  </div>
                                  <div>
                                    <div className="d-flex align-items-center">
                                      <p
                                        className="mx-1 mb-0 mt-0 p-0"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                          // color: "black",
                                        }}
                                      >
                                        {item.students}
                                      </p>
                                      <p
                                        className="mx-1 mb-0 mt-0 p-0"
                                        style={{
                                          // fontWeight: "bold",
                                          fontSize: "13px",
                                          // color: "black",
                                        }}
                                      >
                                        {" "}
                                        students
                                      </p>
                                    </div>

                                    <div className="d-flex align-items-center">
                                      <p
                                        className="mx-1 mb-0 mt-0"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                          // color: "black",
                                        }}
                                      >
                                        {item.courses}
                                      </p>
                                      <p
                                        className="mx-1 mb-0 mt-0"
                                        style={{
                                          marginLeft: "5px",
                                          fontSize: "13px",
                                          // color: "black",
                                        }}
                                      >
                                        courses
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </CardContainer>
                        ))}
                      </div>
                    ))
                  ) : (
                    <h4>No Instructors Found</h4>
                  )}
                </Carousel>
              )}
            </div>

            <div className="col-lg-12 mb-5">
              {loading_top_title ? (
                <OneLineSkeleton height={20} />
              ) : (
                <h4 className="p-2">All {CategoryName} courses</h4>
              )}

              {loading_all_courses_list ? (
                <LandscapeListSkeleton />
              ) : (
                allcourses.length > 0 && (
                  <CourseFourArea allcourses={allcourses} />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Wrapper>
  );
};

export default GetCourseByCategory;
