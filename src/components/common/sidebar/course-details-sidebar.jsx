import React, { useState } from "react";
import useModal from "../../../hooks/use-modal";
import { Books } from "../../../svg";
import VideoModal from "../popup-modal/video-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  wishlistItems,
  add_to_wishlist,
} from "../../../redux/features/wishlist-slice";
import { cart_course } from "../../../redux/features/cart-slice";
import { EnrollByStudent, IMG_HOST } from "../../../api";
import CalculateDiscountedPrice from "../../../functions/pricing/CalculateDiscountedPrice";
import GetCurrencyByCountry from "../../../functions/pricing/GetCurrencyByCountry";
import getSymbolFromCurrency from "currency-symbol-map";
import CalculateListPrice from "../../../functions/pricing/CalculateListPrice";
import CalculateDiscountPrice from "../../../functions/pricing/CalculateDiscountPrice";
import Cookies from "js-cookie";
import HandleFreeCourses from "../../../functions/pricing/HandleFreeCourses";
import CalculateOffPrices from "../../../functions/pricing/CalculateOffPrices";
import FormatNumbers from "../../../functions/FormatNumbers";

const COUNTRY = Cookies.get("aethenos_user_origin");

const mainfs = {
  fontSize: "40px",
};

export const FormatVideoTimeLength = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours} hr${hours > 1 ? "s" : ""} `;
    timeString += `${minutes} min${minutes > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    timeString += `${minutes} min${minutes > 1 ? "s" : ""} `;
    timeString += `${remainingSeconds} sec${remainingSeconds > 1 ? "s" : ""}`;
  } else {
    timeString += `${remainingSeconds} sec${remainingSeconds > 1 ? "s" : ""}`;
  }

  return timeString.trim();
};

const CourseDetailsSidebar = ({ course, details_2 = false }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const wishlists = useSelector(wishlistItems);
  const isWishlistSelected = wishlists.find(
    (w) => Number(w.id) == Number(course.id)
  );

  function getTotalQuizCount(courseContent) {
    return courseContent.reduce((total, section) => {
      return total + (section.no_of_qize || 0);
    }, 0);
  }

  function getTotalAssignmentCount(courseContent) {
    return courseContent.reduce((total, section) => {
      return total + (section.on_of_assignment || 0);
    }, 0);
  }

  function getTotalCodingExerciseCount(courseContent) {
    return courseContent.reduce((total, section) => {
      return total + (section.on_of_codingExercise || 0);
    }, 0);
  }

  function getTotalPracticeTestCount(courseContent) {
    return courseContent.reduce((total, section) => {
      return total + (section.on_of_practiceTest || 0);
    }, 0);
  }

  const {
    img,
    certificate,
    videoId,
    course_price,
    instructor,
    duration,
    student,
    language,
  } = course || {};
  const { isVideoOpen, setIsVideoOpen } = useModal();

  const handleWishlist = (course_item) => {
    if (wishlists.find((i) => i.id === course_item.id)) {
      dispatch(
        add_to_wishlist({
          change_type: "remove_wishlist",
          item: {
            id: course_item.id,
            img: `${course_item.img}`,
            title: course_item.title,
            price: course_item.course_price,
            other_data: course_item,
          },
        })
      );
    } else {
      dispatch(
        add_to_wishlist({
          change_type: "add_wishlist",
          item: {
            id: course_item.id,
            img: `${course_item.img}`,
            title: course_item.title,
            price: course_item.course_price,
            other_data: course_item,
          },
        })
      );
    }
  };

  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(
      cart_course({
        id: course.id,
        img: `${course.img}`,
        price: course.course_price,
        title: course.title,
        other_data: course,
      })
    );
    console.log(course);
  };

  const handleEnroll = (course) => {
    // var rawData = {
    //   paymentMethod: "3",
    //   discount: 0,
    //   totalPrice: 0,
    //   currency: "USD",
    //   country: JSON.parse(COUNTRY).country_name,
    //   courseType: 2,
    //   courses: [
    //     {
    //       courseCode: `${course.course_code}`,
    //       itemPrice: 0,
    //       currency: "USD",
    //     },
    //   ],
    // };

    HandleFreeCourses(course);

    // console.log(course)
    // console.log(rawData)

    // EnrollByStudent(rawData);
  };

  return (
    <>
      <div
        className={`course-sidebar-3 ${
          details_2 ? "" : "sidebar-top-position"
        }`}
      >
        <div className="edu-course-widget widget-course-summery">
          <div className="inner">
            <div className="thumbnail">
              <img src={`${IMG_HOST}${img}`} alt="Course Thumb" />
              <a
                onClick={() => setIsVideoOpen(true)}
                style={{ cursor: "pointer" }}
                className="play-btn video-popup-activation"
              >
                <i className="icon-18"></i>
              </a>
            </div>
            <div className="content">
              {/* <h4 className="widget-title">Course Includes:</h4> */}
              {course.isPaid ? (
                <div>
                  <span style={mainfs} className="value price fw-bolder">
                    {getSymbolFromCurrency(GetCurrencyByCountry(course))}
                    {FormatNumbers(CalculateDiscountedPrice(course))}
                  </span>
                  {CalculateListPrice(course) != CalculateDiscountedPrice(course) && (
                    <span className="text-decoration-line-through m-lg-1">
                      {" "}
                      {getSymbolFromCurrency(GetCurrencyByCountry(course))}
                      {FormatNumbers(CalculateListPrice(course))}
                    </span>
                  )}
                  {CalculateOffPrices(course) != "" && (
                    <span className="fw-semibold small">
                      {CalculateOffPrices(course)}
                    </span>
                  )}
                </div>
              ) : (
                <span style={mainfs} className="value price fw-bolder">
                  Free
                </span>
              )}

              <ul className="course-item">
                {/* <li>
                                    <span className="label"><i className="icon-60"></i>Price:</span>
                                    <span className="value price">${course_price}</span>
                                </li> */}

                {course.articles_count > 0 && (
                  <li>
                    <span className="label">
                      <i className="icon-62"></i>Text-Based Lectures
                    </span>
                    <span className="value">{course.articles_count}</span>
                  </li>
                )}

                {course.duration > 0 && (
                  <li>
                    <span className="label">
                      <i className="bi bi-play-btn"></i>Total Video length
                    </span>
                    <span className="value">
                      {FormatVideoTimeLength(course.duration)}
                    </span>
                  </li>
                )}

                {course.downloadable_resources_count > 0 && (
                  <li>
                    <span className="label">
                      <i className="bi bi-download"></i>Downloadable Resources
                    </span>
                    <span className="value">
                      {course.downloadable_resources_count}
                    </span>
                  </li>
                )}
                {getTotalQuizCount(course.course_content) > 0 && (
                  <li>
                    <span className="label">
                      <i className="icon-81"></i>Quizzes
                    </span>
                    <span className="value">
                      {getTotalQuizCount(course.course_content)}
                    </span>
                  </li>
                )}

                {getTotalPracticeTestCount(course.course_content) > 0 && (
                  <li>
                    <span className="label">
                      <i className="fa-regular fa-file-lines"></i>Practice Tests
                    </span>
                    <span className="value">
                      {getTotalQuizCount(course.course_content)}
                    </span>
                  </li>
                )}

                {getTotalAssignmentCount(course.course_content) > 0 && (
                  <li>
                    <span className="label">
                      <i class="bi bi-clipboard2-check"></i>Assignments
                    </span>
                    <span className="value">
                      {getTotalAssignmentCount(course.course_content)}
                    </span>
                  </li>
                )}

                {getTotalCodingExerciseCount(course.course_content) > 0 && (
                  <li>
                    <span className="label">
                      <i className="bi bi-code-slash"></i>Coding exercises
                    </span>
                    <span className="value">
                      {getTotalCodingExerciseCount(course.course_content)}
                    </span>
                  </li>
                )}

                {course.student > 0 && (
                  <li>
                    <span className="label">
                      <i className="icon-63"></i>Enrolled
                    </span>
                    <span className="value">{course.student} students</span>
                  </li>
                )}

                {course.language > 0 && (
                  <li>
                    <span className="label">
                      <i className="icon-59"></i>Language
                    </span>
                    <span className="value">{course.language}</span>
                  </li>
                )}

                <li>
                  <span className="label">
                    <i className="icon-64"></i>Certificate of completion
                  </span>
                  <span className="value text-uppercase">
                    {course.isPaid ? course.certificate : "No"}
                  </span>
                </li>
              </ul>

              {course.isPaid ? (
                <div className="read-more-btn  mb-0">
                  <a
                    onClick={() => handleAddToCart(course)}
                    className="edu-btn"
                    style={{ cursor: "pointer" }}
                  >
                    {cartCourses.some((item) => item.id == course.id)
                      ? "Remove from Cart"
                      : "Add to cart"}
                    <i className="icon-4"></i>
                  </a>
                </div>
              ) : (
                <div className="read-more-btn mb-0">
                  <a
                    onClick={() => handleEnroll(course)}
                    className="edu-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Enroll Now
                    <i className="icon-4"></i>
                  </a>
                </div>
              )}

              {course && course.isPaid && (

              <div className="text-center">
              <span style={{fontSize:'12px'}} className="m-0 p-0 text-danger"><b>30-Day Money-Back Guarantee</b></span>
              </div>
              )}
              

              {/* <div className="share-area">
                <h4 className="title">Share On:</h4>
                <ul className="social-share">
                  <li>
                    <a href="#">
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-linkedin2"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
               */}
            </div>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={videoId}
      />
      {/* video modal end */}
    </>
  );
};

export default CourseDetailsSidebar;
