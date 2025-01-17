import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";

const CourseTypeEight = ({ data, classes }) => {
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
      className={`edu-course course-style-4 course-style-9 ${
        classes ? classes : ""
      }`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data.id}`} legacyBehavior>
            <a>
              <img src={`${data.img}`} alt="Course Thumb" />
            </a>
          </Link>
          <div className="time-top">
            <span className="duration">
              <i className="icon-61"></i>
              {data.duration}
            </span>
          </div>
        </div>

        <div className="content">
          <div className="course-price">{data?.course_price}</div>

          <h6 className="title">
            <a href={`/course-details/${data.id}`}>{data.title}</a>
          </h6>

          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count">
              ({data.rating} /{data.rating_count} Rating)
            </span>
          </div>

          <p>{data.short_desc}</p>

          <ul className="course-meta">
            <li>
              <i className="icon-25"></i>
              {data.student} {data.student == 1 ? "Student" : "Students"}
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
            <Link href={`/course-details/${data.id}`} legacyBehavior>
              <a>{data.title}</a>
            </Link>
          </h5>

          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count">({data.rating})</span>
          </div>

          <ul className="course-meta">
            <li>{data.lesson} Lectures</li>
            <li>{data.duration}</li>
            <li>{data.level}</li>
          </ul>

          <div className="course-feature">
            <h6 className="title">What You’ll Learn?</h6>
            <ul>
              {data.features.slice(0, 3).map((feature, featurekey) => (
                <li key={featurekey}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="button-group">
            <a
              onClick={() => handleAddToCart(data)}
              style={{ cursor: "pointer" }}
              className="edu-btn btn-medium"
            >
              {cartCourses.some((course) => course.id === data.id)
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
        </div>
      </div>
    </div>
  );
};

export default CourseTypeEight;
