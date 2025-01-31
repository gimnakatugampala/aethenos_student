import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";
import { IMG_HOST } from "../../api";
import CalculateDiscountPrice from "../../functions/pricing/CalculateDiscountPrice";
import getSymbolFromCurrency from "currency-symbol-map";
import CalculateDiscountedPrice from "../../functions/pricing/CalculateDiscountedPrice";
import GetCurrencyByCountry from "../../functions/pricing/GetCurrencyByCountry";
import CalculateListPrice from "../../functions/pricing/CalculateListPrice";
import StarsRating from "stars-rating";
import CalculateOffPrices from "../../functions/pricing/CalculateOffPrices";
import FormatHTMLRemove from "../../functions/FormatHTMLRemove";
import FormatNumbers from "../../../src/functions/FormatNumbers"; 
import { FormatVideoTimeLength } from "../../functions/FormatVideoTimeLength";
import { FormatVideoTimeLengthShow } from "../../functions/FormatVideoTimeLengthShow";


const CourseTypeFive = ({ data, classes }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);
  const isWishlistSelected = wishlists.find(
    (w) => Number(w.id) === Number(data.id)
  );

  function getTotalLecturesCount(course) {
    return course.course_content.reduce((total, section) => {
      return total + (section.no_of_lectures || 0);
    }, 0);
  }

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

  return (
    <div
      className={`edu-course course-style-4 course-style-8 ${
        classes ? classes : ""
      }`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data.course_code}`} legacyBehavior>
            {data.img == "" ||
            data.img == null ||
            data.img.includes("https://") ? (
              <img
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
                src={`/images/course/aethenos_course_img.jpg`}
                alt={data.title}
              />
            ) : (
              <img
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
                src={`${IMG_HOST}${data.img}`}
                alt={data.title}
              />
            )}
          </Link>
          {CalculateOffPrices(data) != "" && (
            <div className="time-top">
              <span style={{ background: "#e01D20" }} className="duration">
                {CalculateOffPrices(data)}
              </span>
            </div>
          )}
        </div>

        <div className="content">

          
          {data.isPaid ? (
            <div className="d-flex justify-content-end text-end">
              <div>
                <div
                  style={{ fontSize: "20px" }}
                  className="course-price m-0 p-0 "
                >
                  <b>
                    {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                    {FormatNumbers(CalculateDiscountedPrice(data))}
                  </b>
                </div>
                {CalculateListPrice(data) != CalculateDiscountedPrice(data) && (
                  <div
                    style={{ fontSize: "13px" }}
                    className="course-price m-0 p-0 text-decoration-line-through"
                  >
                    {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                    {FormatNumbers(CalculateListPrice(data))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <span className="course-price discounted-price">Free</span>
          )}

          <p className="title m-0 p-0">
            <b>
              <Link href={`/course-details/${data.course_code}`} legacyBehavior>
                {data.title}
              </Link>
            </b>
          </p>

          <p className="m-0" style={{ fontSize: "14px" }}>
            {data && data.course_main_desc && data.course_main_desc.length > 120
              ? FormatHTMLRemove(data.course_main_desc).substring(0, 120) + "..."
              : data && FormatHTMLRemove(data.course_main_desc)}
          </p>

          <span className="m-0 p-0" style={{ fontSize: "12px" }}>
            {data.instructor}
          </span>

          <div className="course-rating">
            <div className="rating">
              <StarsRating
                edit={false}
                count={5}
                size={24}
                value={data.rating}
                color1={"gray"}
                color2={"#F39C12"}
              />
            </div>
            <span className="rating-count">
              <b>({Number.parseFloat(data.rating).toFixed(1)})</b>
            </span>
          </div>

          <ul className="course-meta">
          <li>
              <i className="icon-37"></i>
              {/* {data.student} {data.student == 1 ? "Student" : "Students"} */}
              <span>{FormatVideoTimeLengthShow(data.duration)}</span>
            </li>
            <li>
              <i className="icon-24"></i>
              {getTotalLecturesCount(data)} Lectures
            </li>
          </ul>
        </div>
      </div>
      <div className="hover-content-aside">
        <div className="content">
          <span className="course-level">{data.level}</span>

          <h5 className="title">
            <Link href={`/course-details/${data.course_code}`} legacyBehavior>
              {data.title}
            </Link>
          </h5>

          <div className="course-rating">
            <div className="rating">
              <StarsRating
                edit={false}
                count={5}
                size={24}
                value={data.rating}
                color1={"gray"}
                color2={"#F39C12"}
              />
            </div>
            <span className="rating-count">
              ({Number.parseFloat(data.rating).toFixed(1)})
            </span>
          </div>

          <ul className="course-meta">
            <li>  {getTotalLecturesCount(data)} Lectures</li>
            <li>{data.duration}</li>
            <li>{data.level}</li>
          </ul>

          <div className="course-feature">
            <h6 className="title">What You’ll Learn?</h6>
            <ul>
              {data.intended_learners
                .slice(0, 3)
                .map(
                  (feature, featurekey) =>
                    feature.intended_learner_type == " students learn" && (
                      <li key={featurekey}>{feature.intended_learner}</li>
                    )
                )}
            </ul>
          </div>

          {data.isPaid ? (
            <div className="button-group">
              <a
                onClick={() => handleAddToCart(data)}
                style={{ cursor: "pointer" }}
                className="edu-btn btn-medium"
              >
                {cartCourses.some((course) => course.id == data.id)
                  ? "Remove from Cart"
                  : "Add to cart"}
              </a>
              <button
                onClick={() => handleWishlist(data)}
                style={{ cursor: "pointer" }}
                className={`btn-outline-dark wishlist-btn ${
                  isWishlistSelected ? "active" : ""
                }`}
              >
                <i className="icon-22"></i>
              </button>
            </div>
          ) : (
            <div className="button-group">
              <a style={{ cursor: "pointer" }} className="edu-btn btn-medium">
                Enroll Now
              </a>
              <button
                onClick={() => handleWishlist(data)}
                style={{ cursor: "pointer" }}
                className={`btn-outline-dark wishlist-btn ${
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

export default CourseTypeFive;
