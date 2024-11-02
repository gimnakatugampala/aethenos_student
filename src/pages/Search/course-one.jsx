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
import StarsRating from "stars-rating";
import FormatNumbers from "../../functions/FormatNumbers";
import CalculateOffPrices from "../../functions/pricing/CalculateOffPrices";
import { FormatVideoTimeLength } from "../../functions/FormatVideoTimeLength";

const mainfs = {
  fontSize: "20px",
};

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
      style={{  height: "460px !important" }}
    >
      <div
        className="inner"
        key={course.id}
        style={{ textAlign: "left" }}
      >
        <div className="thumbnail" style={{ display: "grid" }}>
          <Link href={`/course-details/${course.course_code}`}>
            <img
              src={`${IMG_HOST}/${course.img}`}
              alt="Course Meta"
              style={{ Width: "180px", height: "160px", objectFit: "cover" }}
            />
          </Link>

          {course != null && CalculateOffPrices(course) != "" && (
            <div className="time-top">
              <span style={{ background: "#e01D20" }} className="duration">
                {CalculateOffPrices(course)}
              </span>
            </div>
          )}
        </div>
        <div className="content px-4">
          <span className="course-level px-2">{course.level}</span>
          <h6 className="title">
            <a style={{ color: "inherit" }} href={`/course-details/${course.course_code}`}>
              {course.title}
            </a>
          </h6>

          <div className="course-rating">
            <div className="rating">
              <StarsRating
                edit={false}
                count={5}
                size={24}
                value={course.rating}
                color1={"gray"}
                color2={"#F39C12"}
              />
            </div>
            <span className="rating-count ml-4">
              <b>{Number.parseFloat(course.rating).toFixed(1)}</b>
            </span>
          </div>

          {course.externalCourseDetails && (
            <>
          <p className="m-0 p-0">Verified External Ratings:</p>
          <div className="course-rating">
            <StarsRating
              edit={false}
              count={5}
              size={24}
              value={course.externalCourseDetails.externalRating}
              color1={"gray"}
              color2={"#F39C12"}
            />
            <span className="rating-count">
              <b>({Number.parseFloat(course.externalCourseDetails.externalRating).toFixed(1)})</b>
            </span>
          </div>
          </>
          )}


          {course != null && course.isPaid ? (
            <div className="d-flex">
              <div className="course-price discounted-price m-1">
                <b>
                  {getSymbolFromCurrency(GetCurrencyByCountry(course))}
                  {FormatNumbers(CalculateDiscountedPrice(course))}
                </b>
              </div>
              {CalculateListPrice(data) != CalculateDiscountedPrice(data) && (
              <div className="course-price text-decoration-line-through m-2">
                {getSymbolFromCurrency(GetCurrencyByCountry(course))}
                {FormatNumbers(CalculateListPrice(course))}
              </div>
                )}
            </div>
          ) : (
            <span style={mainfs} className="course-price  price fw-bolder">
              Free
            </span>
          )}

          <ul className="course-meta">
            <li>
              <i className="icon-24"></i>
              {course.lesson} Lectures
            </li>
            <li>
              <i className="icon-37"></i>
              {/* {course.student} Students */}
              {FormatVideoTimeLength(course.duration)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseTypeOne;
