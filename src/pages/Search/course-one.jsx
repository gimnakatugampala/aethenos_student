import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";
import { IMG_HOST } from "../../api";
import getSymbolFromCurrency from 'currency-symbol-map';
import CalculateDiscountPrice from '../../functions/pricing/CalculateDiscountedPrice'
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
          },
        })
      );
    }
  };

  // handle add to cart
  const handleAddToCart = () => {
    dispatch(
      cart_course({
        id: course.id,
        img: `${course.img}`,
        price: course.course_price,
        title: course.title,
      })
    );
  };

  return (
    <div className={`edu-course`}>
      <div
        className="inner"
        key={course.id}
        style={{ textAlign: "left", width: "auto", height: "450px"}}
      >
        <div className="thumbnail">
          <Link href={`/course-details-/${course.id}`}>
            <img
              src={`${IMG_HOST}/${course.img}`}
              alt="Course Meta"
              style={{ width: "100%", height: "150px" }}
            />
          </Link>
          <div className="time-top">
            <span className="duration">
              <i className="icon-61"></i>
              {course.duration}
            </span>
          </div>
        </div>
        <div className="content">
          <span className="course-level">{course.level}</span>
          <h6 className="title">
            <a style={{ color: "inherit" }} href="/courses">
              {course.title}
            </a>
          </h6>
          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
          </div>
          <span className="rating-count">
            ({course.rating} / {course.rating_count} Rating)
          </span>
          <div className='d-flex'>
          <div className="course-price discounted-price m-1"><b>{getSymbolFromCurrency(GetCurrencyByCountry(course))}{CalculateDiscountedPrice(course)}</b></div>
          <div className="course-price text-decoration-line-through m-2">{getSymbolFromCurrency(GetCurrencyByCountry(course))}{CalculateListPrice(course)}</div>
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
