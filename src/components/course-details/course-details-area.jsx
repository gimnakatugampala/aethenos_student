import React, { useEffect, useState } from "react";
import CourseDetailsSidebar from "../common/sidebar/course-details-sidebar";
import CommentFormCourse from "../forms/comment-form-course";
import SingleComment from "./single-comment";
import SingleProgressbar from "./single-progressbar";
import { GetReviewsByCode, IMG_HOST } from "../../api";
import Accordian from "./accordian";
import { Rating } from "react-simple-star-rating";
import CardContainer from "../course-content/CardContainer";
import moment from "moment";
import { Avatar } from "@mui/material";

const CourseDetailsArea = ({ course }) => {
  const {
    course_desc,
    course_desc_2,
    learn_list,
    course_desc_3,
    curriculum_desc,
    course_lessons,
    instructor_img,
    instructor_title,
    instructor_desc,
    social_links,
    reviews,
    instructor,
    rating,
    rating_count,
  } = course || {};

  const [featured_reviews, setfeatured_reviews] = useState(null);
  // get the Reviews
  useEffect(() => {
    GetReviewsByCode(course.course_code, setfeatured_reviews);
  }, [featured_reviews]);

  function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    const dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0) return;

    return (
      (dayDiff === 0 &&
        ((diff < 60 && "Just now") ||
          (diff < 120 && "1 minute ago") ||
          (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
          (diff < 7200 && "1 hour ago") ||
          (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
      (dayDiff === 1 && "Yesterday") ||
      (dayDiff < 30 && dayDiff + " days ago") ||
      (dayDiff < 365 && Math.ceil(dayDiff / 30) + " months ago") ||
      "Over a year ago"
    );
  }

  return (
    <section className="edu-section-gap course-details-3">
      <div className="mx-5">
        <div className="row row--30 mx-5">
          <div className="col-lg-8 pt-0">
            <div className="course-details-content pt-0">
              <ul
                className="nav nav-tabs justify-content-start"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#overview"
                    type="button"
                    role="tab"
                    aria-controls="overview"
                    aria-selected="true"
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="carriculam-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#carriculam"
                    type="button"
                    role="tab"
                    aria-controls="carriculam"
                    aria-selected="false"
                  >
                    Syllabus
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#review"
                    type="button"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="overview"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-overview">
                      <h3 className="heading-title">Course Description</h3>
                      <p>{course.course_main_desc}</p>

                      <h5 className="title">What You’ll Learn?</h5>
                      <ul className="mb--60">
                        <div className="row">
                          {course.intended_learners?.map(
                            (l, i) =>
                              l.intended_learner_type == " students learn" && (
                                <li className="col-md-6" key={i}>
                                  {l.intended_learner}
                                </li>
                              )
                          )}
                        </div>
                      </ul>

                      <h5 className="title">Requirements</h5>
                      <ul className="mb--60">
                        {course.intended_learners?.map(
                          (l, i) =>
                            l.intended_learner_type == "requirements" && (
                              <li key={i}>{l.intended_learner}</li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="carriculam"
                  role="tabpanel"
                  aria-labelledby="carriculam-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-curriculam">
                      <h3 className="heading-title">Course Syllabus</h3>

                      <div className="faq-accordion">
                        <div className="accordion">
                          {course.course_content != null &&
                            course.course_content.map((content, index) => (
                              <Accordian
                                key={index}
                                id={index}
                                no_quiz={content.no_of_qize}
                                title={`${content.section_name}`}
                                lectures={content.no_of_lectures}
                                lists={content.section_curriculum_item}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <div className="course-tab-content">
                    <div className="course-review">
                      <h3 className="heading-title">Student Feedback</h3>

                      <div className="row align-items-center">
                        <div className="col-sm-3">
                          <div className="rating-box">
                            <div className="rating-number">
                              {course.rating != null &&
                                course.rating.toFixed(1)}
                            </div>
                            {course && (
                              <Rating
                                size={20}
                                readonly={true}
                                iconsCount={5}
                                initialValue={Number.parseInt(course.rating)}
                              />
                            )}
                            <span>
                              ({course && Number.parseInt(course.rating_count)}{" "}
                              {Number.parseInt(course.rating_count) == 1
                                ? "Review"
                                : "Reviews"}
                              )
                            </span>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="review-wrapper ">
                            {course.ratingDetails != null && (
                              <SingleProgressbar
                                value={course.ratingDetails.fiveRatingCount}
                                rating_value={"5"}
                              />
                            )}
                            {course.ratingDetails != null && (
                              <SingleProgressbar
                                value={course.ratingDetails.fourRatingCount}
                                rating_value={"4"}
                              />
                            )}
                            {course.ratingDetails != null && (
                              <SingleProgressbar
                                value={course.ratingDetails.threeRatingCount}
                                rating_value={"3"}
                              />
                            )}
                            {course.ratingDetails != null && (
                              <SingleProgressbar
                                value={course.ratingDetails.twoRatingCount}
                                rating_value={"2"}
                              />
                            )}
                            {course.ratingDetails != null && (
                              <SingleProgressbar
                                value={course.ratingDetails.oneRatingCount}
                                rating_value={"1"}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-1 mt-1">
                        <h3>Reviews</h3>
                        {featured_reviews != null &&
                          (featured_reviews.length > 0
                            ? featured_reviews.map((reviews, index) => (
                                <CardContainer key={index} className="p-1">
                                  <div className="d-flex align-items-center">
                                    <Avatar
                                      alt={`${reviews.fullName}`}
                                      src="/static/images/avatar/1.jpg"
                                    />
                                    <h6 className="m-2 p-0">
                                      {reviews.fullName}
                                    </h6>
                                  </div>
                                  <Rating
                                    size={20}
                                    readonly={true}
                                    iconsCount={5}
                                    initialValue={Number.parseInt(
                                      reviews.rating
                                    )}
                                  />
                                  <span
                                    style={{ fontSize: "12px" }}
                                    className="mt-2"
                                  >
                                    {timeAgo(reviews.date)}
                                  </span>
                                </CardContainer>
                              ))
                            : "No Reviews Found")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <CourseDetailsSidebar course={course} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea;
