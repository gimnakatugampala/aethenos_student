import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";
import { EnrollByStudent, IMG_HOST } from "../../api";
import getSymbolFromCurrency from "currency-symbol-map";
import GetCurrencyByCountry from "../../functions/pricing/GetCurrencyByCountry";
import CalculateDiscountedPrice from "../../functions/pricing/CalculateDiscountedPrice";
import CalculateDiscountPrice from "../../functions/pricing/CalculateDiscountPrice";
import StarsRating from "stars-rating";
import Cookies from "js-cookie";
import { css } from "@emotion/react";
import {
  cart_course,
  decrease_quantity,
  remove_cart_course,
} from "../../redux/features/cart-slice";

const COUNTRY = Cookies.get("aethenos_user_origin");

const CourseTypeFour = ({ data, classes, index }) => {
  const isSecondOrFourthCard = (index + 1) % 2 === 0;

  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);
  const isWishlistSelected = wishlists.find(
    (w) => Number(w.id) === Number(data.id)
  );

  const mainfs = {
    fontSize: "20px",
  };

  const [mouseX, setMouseX] = useState(null);

  const handleRemoveFromCart = (item) => {
    dispatch(remove_cart_course(item));
  };

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

  const handleEnroll = (data) => {
    // console.log(data)

    var rawData = {
      paymentMethod: "3",
      discount: 0,
      totalPrice: 0,
      currency: "USD",
      country: JSON.parse(COUNTRY).country_name,
      courseType: 2,
      courses: [
        {
          courseCode: `${data.course_code}`,
          itemPrice: 0,
          currency: "USD",
        },
      ],
    };

    EnrollByStudent(rawData);

    // console.log(rawData)
  };

  return (
    <div
      className={`edu-course course-style-5 ${classes ? classes : ""} h-100`}
      style={{ cursor: "default" }}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data.course_code}`} legacyBehavior>
            <img
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              src={`${IMG_HOST}${data.img}`}
              alt={data.title}
              className="img-fluid"
            />
          </Link>
        </div>

        <div className="content">
          {data.course_prices.discount > 0 && (
            <div className="course-price price-round">
              {CalculateDiscountPrice(data)}
            </div>
          )}

          <div className=" fw-bolder mt-4 mb-2" style={mainfs}>
            <span className=""> {data.level}</span>

            {data.isPaid ? (
              <span className="float-end">
                {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                {CalculateDiscountedPrice(data)}
              </span>
            ) : (
              <span className="course-price discounted-price float-end fw-bolder">
                Free
              </span>
            )}
          </div>

          <h5 className="title">
            <Link href={`/course-details/${data.course_code}`} legacyBehavior>
              {data.title}
            </Link>
          </h5>

          <p>
            {data.curriculum_desc.length > 60
              ? data.curriculum_desc.substring(0, 60) + "..."
              : data.curriculum_desc}
          </p>

          <div className="course-rating">
            <StarsRating
              edit={false}
              count={5}
              size={24}
              value={data.rating}
              color1={"gray"}
              color2={"#F39C12"}
            />
            <span className="rating-count">
              <b>({Number.parseFloat(data.rating).toFixed(1)})</b>
            </span>
          </div>

          <ul className="d-flex course-meta">
            <li>
              <i className="icon-24"></i>
              {data.lesson} Lessons
            </li>
            <li>
              <i className="icon-25"></i>
              {data.student} {data.student == 1 ? 'Student' : 'Students'}
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`hover-content-aside ${
          isSecondOrFourthCard ? "content-right" : ""
        }`}
        style={{ cursor: "default" }}
      >
        <div className="content">
          <span className="course-level">{data.category}</span>
          <h5 className="title">
            <n-link to="/course/course-details">
              {data.title.length > 20
                ? data.title.slice(0, 35) + "..."
                : data.title}
            </n-link>
          </h5>
          <div className="course-rating">
            <StarsRating
              edit={false}
              count={5}
              size={24}
              value={data.rating}
              color1={"gray"}
              color2={"#F39C12"}
            />
            <span className="rating-count">
              <b>({Number.parseFloat(data.rating).toFixed(1)})</b>
            </span>
          </div>
          {/* <ul className="course-meta">
            <li>
              {data.lesson}{" "}
              {data.lesson + data.lesson > 1 ? "Lessons" : "Lesson"}
            </li>
            <li>{CalculateDiscountPrice(data)}</li>
            <li>{data.level}</li>
          </ul> */}
          <div className="course-feature">
            <h6 className="title">What You’ll Learn?</h6>
            <ul>
              {data.intended_learners
                .slice(0, 3)
                .map(
                  (feature, featurekey) =>
                    feature.intended_learner_type == " students learn" && (
                      <li key={featurekey}>
                        {feature.intended_learner > 25
                          ? feature.intended_learner.substring(0, 25) + "..."
                          : feature.intended_learner}
                      </li>
                    )
                )}
            </ul>
          </div>

          {data.isPaid ? (
            <div className="button-group">
              <a
                className="edu-btn btn-medium"
                onClick={() =>
                  cartCourses.some((item) => item.id === data.id)
                    ? handleRemoveFromCart(data)
                    : handleAddToCart(data)
                }
                style={{ cursor: "pointer" }}
              >
                {cartCourses.some((item) => item.id === data.id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
                <i className="icon-4"></i>
              </a>
              <button
                onClick={() => handleWishlist(data)}
                className={`wishlist-btn btn-outline-dark ${
                  isWishlistSelected ? "active" : ""
                }`}
              >
                <i className="icon-22"></i>
              </button>
            </div>
          ) : (
            <div className="button-group">
              <a
                onClick={() => handleEnroll(data)}
                className="edu-btn btn-medium"
                style={{ cursor: "pointer" }}
              >
                Enroll Now
                <i className="icon-4"></i>
              </a>

              <button
                onClick={() => handleWishlist(data)}
                className={`wishlist-btn btn-outline-dark ${
                  isWishlistSelected ? "active" : ""
                }`}
              >
                <i className="icon-22"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTypeFour;
