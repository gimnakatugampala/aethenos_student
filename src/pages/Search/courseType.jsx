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
          <Link href={`/course-details/${data!= null && data.title}`}>
            <img
              src={`http://185.209.223.202:8080/aethenos-assert/${
                data != undefined && data.img
              }`}
              alt="Course Thumb"
              style={{ width: "350px", height: "200px" }}
            />
          </Link>
          <div className="time-top">
            <span className="duration" style={{ background: "#e01D20" }}>
              {data !=null && data.course_prices.discount &&
              data.course_prices.discount.length > 0
                ? `${data.course_prices.discount[0].discountAmount}% OFF`
                : "No Discount"}
            </span>
          </div>
        </div>

        <div className="content">
          <div className="course-price float-end">
            $
            {data !=null  && data.course_prices && data.course_prices.length > 0
              ? data.course_prices[0].globalListPrice
              : "0"}
          </div>
          <br />
          <h4 className="title">
            <Link href={`/course-details/${data != undefined && data.title}`}>
              {data != undefined && data.title}
            </Link>
          </h4>

          <h6 className="">
            {data != undefined && data.short_desc && data.short_desc.length > 50
              ? `${data != undefined && data.short_desc.slice(0, 50)}...`
              : data != undefined && data.short_desc}
          </h6>

          <p>{data != undefined && data.instructor}</p>

          <span className="course-level">
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
            <li>{data != undefined && data.lessons} Lessons</li>
            <li>{data != undefined && data.student} Students</li>
            <li>{data != undefined && data.category}</li>
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
