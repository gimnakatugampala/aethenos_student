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

const CourseTypeFive = ({ data, classes }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);
  const isWishlistSelected = wishlists.find(
    (w) => Number(w.id) === Number(data.id)
  );

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

  return (
    <div
      className={`edu-course course-style-4 course-style-8 p-3  ${
        classes ? classes : ""
      }`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data != null && data.course_code}`}>
            <img
              src={`${IMG_HOST}/${data != undefined && data.img}`}
              alt="Course Thumb"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </Link>
          {data != null && CalculateDiscountPrice(data) != "" && (
            <div className="time-top">
              <span style={{ background: "#e01D20" }} className="duration">
                {CalculateDiscountPrice(data)} OFF
              </span>
            </div>
          )}
        </div>

        <div className="content">
          <div className="d-flex justify-content-end text-end">
            {data != null && (
              <div>
                <div
                  style={{ fontSize: "20px" }}
                  className="course-price m-0 p-0 "
                >
                  <b>
                    {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                    {CalculateDiscountedPrice(data)}
                  </b>
                </div>

                <div
                  style={{ fontSize: "13px" }}
                  className="course-price m-0 p-0 text-decoration-line-through"
                >
                  {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                  {CalculateListPrice(data)}
                </div>
              </div>
            )}
          </div>

          <p className="title">
            <b>
              <Link
                href={`/course-details/${
                  data != undefined && data.course_code
                }`}
              >
                {data != undefined && data.title}
              </Link>
            </b>
          </p>

          <p className="m-0" style={{ fontSize: "14px" }}>
            {data && data.course_main_desc && data.course_main_desc.length > 70
              ? data.course_main_desc.substring(0, 70) + "..."
              : data && data.course_main_desc}
          </p>

          <span className="m-0 p-0" style={{ fontSize: "12px" }}>
            {data != undefined && data.instructor}
          </span>

          <span className="course-level mx-4">
            {data != undefined && data.level}
          </span>

          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count ">
              ({data != undefined && data.rating})
            </span>
          </div>
          <ul className="course-meta">
            <li>{data != undefined && data.language} </li>
            <li>{data != undefined && data.lesson} Lessons</li>
            <li>{data != undefined && data.student} Students</li>
            <li>{data != undefined && data.category}</li>
          </ul>

          <a
            onClick={() => handleAddToCart(data)}
            style={{ cursor: "pointer" }}
            className="edu-btn btn-small button-group float-end mt-2 mx-2"
          >
            {cartCourses.some((course) => course.id == data.id)
              ? "Added to cart"
              : "Add to cart"}
          </a>
          <button
            onClick={() => handleWishlist(data)}
            style={{ cursor: "pointer" }}
            className={`btn-outline-dark float-end wishlist-btn ${
              isWishlistSelected ? "active" : ""
            }`}
          >
            <i className="icon-22"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTypeFive;
