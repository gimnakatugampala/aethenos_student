import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";
import { IMG_HOST, EnrollByStudent } from "../../api";
import getSymbolFromCurrency from "currency-symbol-map";
import CalculateDiscountPrice from "../../functions/pricing/CalculateDiscountedPrice";
import GetCurrencyByCountry from "../../functions/pricing/GetCurrencyByCountry";
import CalculateDiscountedPrice from "../../functions/pricing/CalculateDiscountedPrice";
import CalculateListPrice from "../../functions/pricing/CalculateListPrice";
import StarsRating from "stars-rating";
import Cookies from "js-cookie";
import HandleFreeCourses from "../../functions/pricing/HandleFreeCourses";
import FormatNumbers from "../../functions/FormatNumbers";
import CalculateOffPrices from "../../functions/pricing/CalculateOffPrices";
import { Height } from "@mui/icons-material";

const COUNTRY = Cookies.get("aethenos_user_origin");

const CourseTypeFive = ({ data, classes }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);
  const isWishlistSelected = wishlists.find(
    (w) => Number(w.id) === Number(data.id)
  );

  const [windowWidth, setWindowWidth] = useState(0);  // Default value for SSR

  useEffect(() => {
    if (typeof window !== "undefined") {  // Check if window is available
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

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

  // const generateStars = (rating) => {
  //   const starArray = [];
  //   for (let i = 1; i <= 5; i++) {
  //     starArray.push(
  //       <span
  //         key={i}
  //         style={{ color: "#f8b81f" }}
  //         className={`mx-1 icon-star ${
  //           i <= rating ? " icon-star-full" : " icon-star-empty"
  //         }`}
  //       ></span>
  //     );
  //   }
  //   return starArray;
  // };

  const handleEnroll = (data) => {
    // console.log(data)

    // var rawData = {
    //   "paymentMethod": "3",
    //   "discount": 0,
    //   "totalPrice": 0,
    //   "currency": "USD",
    //   "country": JSON.parse(COUNTRY).country_name,
    //   "courseType":2,
    //   "courses": [{
    //       "courseCode": `${data.course_code}`,
    //       "itemPrice": 0,
    //       "currency": "USD"
    //     }]
    // }

    // EnrollByStudent(rawData)

    HandleFreeCourses(data);

    // console.log(rawData)
  };

  const positionStyle = {
    width: windowWidth >= 576 ? "300px" : "450px",
    objectFit: "contain",
  };

  return (
    <div
      className={`edu-course course-style-4 course-style-8 p-3  ${
        classes ? classes : ""
      }`}
    >
      <div className="inner">
        <div className="thumbnail col-sm-6 col-xxl-4">
          <Link href={`/course-details/${data != null && data.course_code}`}>
            <img
              src={`${IMG_HOST}/${data != undefined && data.img}`}
              alt="Course Thumb"
              style={{ maxHeight: "250px" }}
            />
          </Link>
          {data != null && CalculateOffPrices(data) != "" && (
            <div className="time-top">
              <span style={{ background: "#e01D20" }} className="duration">
                {CalculateOffPrices(data)}
              </span>
            </div>
          )}
        </div>

        <div className="content col-sm-6 col-xxl-8">
          <div className="d-flex justify-content-end text-end p-3">
            {data && (
                data.isPaid ? (
                    <div>
                        <div
                            // style={{ fontSize: "20px" }}
                            className="course-price m-0 p-0"
                        >
                            <b>
                                {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                                {FormatNumbers(CalculateDiscountedPrice(data))}
                            </b>
                        </div>

                        <div
                            // style={{ fontSize: "13px" }}
                            className="course-price m-0 p-0 text-decoration-line-through"
                        >
                            {getSymbolFromCurrency(GetCurrencyByCountry(data))}
                            {FormatNumbers(CalculateListPrice(data))}
                        </div>
                    </div>
                ) : (

                  
                    <span className="course-price discounted-price m-lg-3">Free</span>
                )
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

          <div className="course-rating">
            <div className="rating">
              {data != null && (
                <StarsRating
                  edit={false}
                  count={5}
                  size={24}
                  value={data.rating}
                  color1={"gray"}
                  color2={"#F39C12"}
                />
              )}
            </div>
            <span className="rating-count ml-4">
              <b>{data != null && Number.parseFloat(data.rating).toFixed(1)}</b>
            </span>
          </div>

          <span className="course-level">
            {data != undefined && data.level}
          </span>

          <div className="col-12 col-xs-6">
            <ul className="course-meta">
              <li>{data != undefined && data.language} </li>
              <li>{data != undefined && data.lesson} Lessons</li>
              <li>{data != undefined && data.student} Students</li>
              <li>{data != undefined && data.category}</li>
            </ul>
          </div>

          <div style={{ marginBottom: "50px", marginInlineEnd: "-12px" }}>
            {data != null && data.isPaid ? (
              <a
                onClick={() => handleAddToCart(data)}
                style={{ cursor: "pointer" }}
                className="edu-btn btn-small button-group float-end mt-2 mx-2"
              >
                {cartCourses.some((course) => course.id == data.id)
                  ? "Added to cart"
                  : "Add to cart"}
              </a>
            ) : (
              <a
                onClick={() => handleEnroll(data)}
                className="edu-btn btn-small button-group float-end mt-2 mx-2"
                style={{ cursor: "pointer" }}
              >
                Enroll Now
                <i className="icon-4"></i>
              </a>
            )}

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
    </div>
  );
};

export default CourseTypeFive;
