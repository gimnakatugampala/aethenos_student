import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";

const CourseTypeOne = ({ data, classes, image_location_path = "06" }) => {
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
            img: `/assets/images/course/course-06/${course_item.img}`,
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
            img: `/assets/images/course/course-06/${course_item.img}`,
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
        img: `/assets/images/course/course-06/${course.img}`,
        price: course.course_price,
        title: course.title,
      })
    );
  };

  return (
    <div className={`edu-course`}>
      {data != null && data.map((course) => (
        <div
          className="inner"
          key={course.id}
          style={{ textAlign: "left", width: "280px" }}
        >
          <div className="thumbnail">
            <Link href={`/course-details-/${course.id}`}>
              <img
                src={`/assets/images/course/course-${image_location_path}/${course.img}`}
                alt="Course Meta"
                // style={{ width: "300px", height: "150px" }}
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
              <a style={{ color: "inherit" }} href="/courses">{course.title}</a>
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
            <div className="course-price">${course.course_price}</div>
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
      ))}
    </div>
  );
};

export default CourseTypeOne;
