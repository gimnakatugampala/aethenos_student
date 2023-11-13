import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";

const CourseTypeFive = ({ data, classes }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);
  // const isWishlistSelected = wishlists.find(
  //   (w) => Number(w.id) === Number(data.id)
  // );

  // const handleWishlist = (course_item) => {
  //   if (wishlists.find((i) => i.id === course_item.id)) {
  //     dispatch(
  //       add_to_wishlist({
  //         change_type: "remove_wishlist",
  //         item: {
  //           id: course_item.id,
  //           img: `/assets/images/course/course-06/${course_item.img}`,
  //           title: course_item.title,
  //           price: course_item.course_price,
  //         },
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       add_to_wishlist({
  //         change_type: "add_wishlist",
  //         item: {
  //           id: course_item.id,
  //           img: `/assets/images/course/course-06/${course_item.img}`,
  //           title: course_item.title,
  //           price: course_item.course_price,
  //         },
  //       })
  //     );
  //   }
  // };

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
    <div
      className={`edu-course course-style-4 course-style-8 ${
        classes ? classes : ""
      }`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data?.data.id}`}>
            <img
              src={`/assets/images/course/course-02/${data?.data.img}`}
              alt="Course Thumb"
            />
          </Link>
          <div className="time-top">
            <span className="duration">
              <i className="icon-61"></i>
              {data?.data.duration}
            </span>
          </div>
        </div>

        <div className="content">
          <div className="course-price float-end">${data?.course_price}</div>
          <br />
          <h4 className="title">
            <Link href={`/course-details/${data?.data.id}`}>{data?.data.title}</Link>
          </h4>

          <h6>{data?.data.short_desc}</h6>

          <span className="course-level">{data?.data.level}</span>

          {/* <div
            className="progress"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${"20"}%`, background: "#1ab69d" }}
              aria-valuenow={"100"}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div> */}

          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count ">({data?.data.rating})</span>
          </div>
          <ul className="course-meta">
            <li>{data?.data.lesson} Lessons</li>
            <li>{data?.data.duration}</li>
            <li>{data?.data.level}</li>
            <li>{data?.data.category}</li>
          </ul>

          <a
            onClick={() => handleAddToCart(data)}
            style={{ cursor: "pointer" }}
            className="edu-btn btn-medium button-group float-end"
          >
            {cartCourses.some((course) => course.id === data.id)
              ? "Added to cart"
              : "Add to cart"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseTypeFive;
