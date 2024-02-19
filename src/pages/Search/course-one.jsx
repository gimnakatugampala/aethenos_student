import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";
import { IMG_HOST } from "../../api";
import getSymbolFromCurrency from "currency-symbol-map";
import CalculateDiscountPrice from "../../functions/pricing/CalculateDiscountedPrice";
import GetCurrencyByCountry from "../../functions/pricing/GetCurrencyByCountry";
import CalculateDiscountedPrice from "../../functions/pricing/CalculateDiscountedPrice";
import CalculateListPrice from "../../functions/pricing/CalculateListPrice";

const CourseTypeOne = ({ course }) => {
  if (!course || !course.id) return null;

  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);

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
  };

  const generateStars = (rating) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <span
          key={i}
          style={{ color: "#f8b81f" }}
          className={`mx-1 icon-star ${
            i <= rating ? " icon-star-full" : " icon-star-empty"
          }`}
        ></span>
      );
    }
    return starArray;
  };

  return (
    <div
      className={`edu-course course-style-1 course-box-shadow hover-button-bg-white h-100`}
    >
      <div
        className="inner"
        key={course.id}
        style={{ textAlign: "left", height: "" }}
      >
        <div className="thumbnail" style={{ display: "grid" }}>
          <Link href={`/course-details-/${course.id}`}>
            <img
              src={`${IMG_HOST}/${course.img}`}
              alt="Course Meta"
              style={{ Width: "180px", height: "160px" }}
            />
          </Link>

          <div className="time-top">
            <span className="duration">
              <i className="icon-61"></i>
              {course.duration}
            </span>
          </div>
        </div>
        <div className="content px-4">
          <span className="course-level px-2">{course.level}</span>
          <h6 className="title">
            <a style={{ color: "inherit" }} href="/courses">
              {course.title}
            </a>
          </h6>
          <div className="course-rating">
            <div className="rating ">{generateStars(course.rating)}</div>
          </div>
          <span className="rating-count">
            ({course.rating} / {course.rating_count} Rating)
          </span>
          <div className="d-flex">
            <div className="course-price discounted-price m-1">
              <b>
                {getSymbolFromCurrency(GetCurrencyByCountry(course))}
                {CalculateDiscountedPrice(course)}
              </b>
            </div>
            <div className="course-price text-decoration-line-through m-2">
              {getSymbolFromCurrency(GetCurrencyByCountry(course))}
              {CalculateListPrice(course)}
            </div>
          </div>
          <ul className="course-meta">
            <li>
              <i className="icon-24"></i>
              {course.lesson} Lessons
            </li>
            <li>
              <i className="icon-25"></i>
              {course.student} Students
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseTypeOne;
