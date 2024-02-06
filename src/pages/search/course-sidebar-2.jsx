import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "../../api/index";
import {
  add_category,
  add_force_page,
  add_instructor,
  add_item_offset,
  add_language,
  add_level,
  add_price,
  add_select_price,
  reset_filter,
} from "../../redux/features/filter-slice";

const CourseSidebarTwo = ({ course_items }) => {
  const [AllCourses, setCourses] = useState([]);
  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [showCategory, setShowCategory] = useState(true);
  const [showLevel, setShowLevel] = useState(true);
  const [showInstructor, setShowInstructor] = useState(true);
  const [showLanguage, setShowLanguage] = useState(true);

  const { categories, instructors, levels, languages, selectPrice } =
    useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    getCourseData(setCourses);
  }, []);

  useEffect(() => {
    if (AllCourses.length > 0) {
      const prices = AllCourses.reduce((acc, course) => {
        if (
          course.course_prices &&
          Array.isArray(course.course_prices.prices)
        ) {
          const coursePrices = course.course_prices.prices.map(
            (price) => price.listPrice
          );
          return [...acc, ...coursePrices];
        }
        return acc;
      }, []);

      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      console.log(maxPrice + " Maxprice");
      // setPrice(maxPrice);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);

      dispatch(add_price(maxPrice));
      handlePriceChange(maxPrice);
    }
  }, [AllCourses, dispatch]);

  const all_categories = [
    ...new Set(AllCourses.map((course) => course.category)),
  ];
  const all_instructors = [
    ...new Set(AllCourses.map((course) => course.instructor)),
  ];
  const all_levels = [...new Set(AllCourses.map((course) => course.level))];

  const all_languages = [
    ...new Set(AllCourses.map((course) => course.language)),
  ];

  // handleCategory
  const handleCategory = (cate) => {
    const index = categories.findIndex((item) => item === cate);
    if (index >= 0) {
      dispatch(add_category({ changeType: "remove", item: cate }));
    } else {
      dispatch(add_category({ changeType: "added", item: cate }));
    }
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  // handleInstructor
  const handleInstructor = (instructor) => {
    dispatch(add_instructor({ instructor }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  // handleLevel
  const handleLevel = (level) => {
    dispatch(add_level({ level, maxPrice }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  // handleLanguage
  const handleLanguage = (language) => {
    dispatch(add_language({ language, maxPrice }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  // handlePriceChange
  const handlePriceChange = (value) => {
    setPrice(value);
    dispatch(add_select_price(value));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleReset = (va) => {
    console.log("ASD");
    dispatch(reset_filter(maxPrice));
    setPrice(maxPrice);
  };

  return (
    <div className="course-sidebar-2 mx-4">
      <div className="edu-course-widget widget-category">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showCategory ? "active" : ""
            }`}
            onClick={() => setShowCategory(!showCategory)}
          >
            Categories
          </h5>

          <div
            className="content"
            style={{ display: showCategory ? "block" : "none" }}
          >
            {all_categories.map((c, i) => (
              <div key={i} className="edu-form-check">
                <input
                  onClick={() => handleCategory(c)}
                  type="checkbox"
                  checked={categories.includes(c)}
                  id={`cat-check${i + 1}`}
                  readOnly
                />
                <label htmlFor={`cat-check${i + 1}`}>
                  {c}
                  <span>
                    (
                    {course_items.filter((item) => item.category === c)?.length}
                    )
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="edu-course-widget widget-instructor">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showInstructor ? "active" : ""
            }`}
            onClick={() => setShowInstructor(!showInstructor)}
          >
            Instructor
          </h5>

          <div
            className="content"
            style={{ display: showInstructor ? "block" : "none" }}
          >
            {all_instructors.map((instructor, i) => (
              <div key={i} className="edu-form-check">
                <input
                  onClick={() => handleInstructor(instructor)}
                  checked={instructors.includes(instructor)}
                  type="checkbox"
                  id={`cat-check-2${i + 1}`}
                  readOnly
                />
                <label htmlFor={`cat-check-2${i + 1}`}>
                  {instructor}
                  <span>
                    (
                    {
                      course_items.filter(
                        (item) => item.instructor === instructor
                      )?.length
                    }
                    )
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="edu-course-widget widget-level">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showLevel ? "active" : ""
            } `}
            onClick={() => setShowLevel(!showLevel)}
          >
            Level
          </h5>

          <div
            className="content"
            style={{ display: showLevel ? "block" : "none" }}
          >
            {all_levels.map((level, i) => (
              <div key={i} className="edu-form-check">
                <input
                  onClick={() => handleLevel(level)}
                  checked={levels.includes(level)}
                  type="checkbox"
                  id={`cat-check-3${i + 1}`}
                  readOnly
                />
                <label htmlFor={`cat-check-3${i + 1}`}>
                  {level}
                  <span>
                    (
                    {
                      course_items.filter((item) => item.level === level)
                        ?.length
                    }
                    )
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="edu-course-widget widget-language">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showLanguage ? "active" : ""
            }`}
            onClick={() => setShowLanguage(!showLanguage)}
          >
            Language
          </h5>

          <div
            className="content"
            style={{ display: showLanguage ? "block" : "none" }}
          >
            {all_languages.map((language, i) => (
              <div key={i} className="edu-form-check">
                <input
                  onClick={() => handleLanguage(language)}
                  checked={languages.includes(language)}
                  type="checkbox"
                  id={`cat-check-4${i + 1}`}
                  readOnly
                />
                <label htmlFor={`cat-check-4${i + 1}`}>
                  {language}
                  <span>
                    (
                    {
                      course_items.filter((item) => item.language === language)
                        ?.length
                    }
                    )
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="edu-course-widget">
        <h5 className="widget-title">Price Filter</h5>
        <Slider
          value={price}
          min={minPrice}
          max={maxPrice}
          tooltip={false}
          orientation="horizontal"
          onChange={handlePriceChange}
        />
        <div className="filter-price">
          Price: <span>${minPrice}</span> <span>-</span> <span>${price}</span>
        </div>
      </div>

      <div className="edu-course-widget">
        <h5 className="widget-title mb-4">Reset Filter</h5>
        <button onClick={handleReset} className="edu-btn btn-small mb--30">
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default CourseSidebarTwo;
