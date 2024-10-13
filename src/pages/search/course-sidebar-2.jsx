import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "../../api/index";
import {
  add_category,
  add_force_page,
  add_instructor,
  add_rating,
  add_item_offset,
  add_language,
  add_topic,
  add_subCategory,
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
  const [showTopic, setShowTopic] = useState(true);
  const [showInstructor, setShowInstructor] = useState(true);
  const [showSubCategory, setshowSubCategory] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showLanguage, setShowLanguage] = useState(true);

  const {
    categories,
    instructors,
    levels,
    languages,
    ratings,
    topics,
    subcategories,
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    getCourseData(setCourses);
  }, []);

  useEffect(() => {
    if (AllCourses.length > 0) {
      AllCourses.sort((a, b) => a.rating - b.rating);

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

  const all_ratings = [...new Set(AllCourses.map((course) => course.rating))];

  const all_levels = [...new Set(AllCourses.map((course) => course.level))];

  const all_languages = [
    ...new Set(AllCourses.map((course) => course.language)),
  ];

  const all_topics = [...new Set(AllCourses.map((course) => course.topic))];

  const all_SubCategorys = [
    ...new Set(AllCourses.map((course) => course.sub_category)),
  ];

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

  const handleInstructor = (instructor) => {
    dispatch(add_instructor({ instructor }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleRating = (rating) => {
    dispatch(add_rating({ rating }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleLevel = (level) => {
    dispatch(add_level({ level, maxPrice }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleLanguage = (language) => {
    dispatch(add_language({ language, maxPrice }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleTopic = (topic) => {
    dispatch(add_topic({ topic, maxPrice }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleSubCategory = (sub_category) => {
    dispatch(add_subCategory({ sub_category, maxPrice }));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    dispatch(add_select_price(value));
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  const handleReset = (va) => {
    dispatch(reset_filter(maxPrice));
    dispatch(add_price(maxPrice));
    handlePriceChange(maxPrice);
  };

  const allPossibleRatings = [0, 1, 2, 3, 4, 5];

  const generateStars = (rating = 0) => {
    const starArray = [];

    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <span
          key={i}
          style={{ color: "#f8b81f" }}
          className={`mx-1 icon-star ${
            i <= rating ? "icon-star-full" : "icon-star-empty"
          }`}
        ></span>
      );
    }

    return starArray;
  };

  const setShowInstructerFilter = Array.isArray(course_items)
    ? course_items.filter((item) => item.instructor)?.length ?? 0
    : 0;

  return (
    <div className="course-sidebar-3 mx-xs-0 mx-sm-4">
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
            {all_categories.map((category, i) => {
              const categoryCount = Array.isArray(course_items)
                ? course_items.filter((item) => item.category === category)
                    ?.length ?? 0
                : 0;

              if (categoryCount > 0) {
                return (
                  <div key={i} className="edu-form-check">
                    <input
                      onClick={() => handleCategory(category)}
                      checked={categories.includes(category)}
                      type="checkbox"
                      id={`cat-check${i + 1}`}
                      readOnly
                    />
                    <label htmlFor={`cat-check${i + 1}`}>
                      {category}
                      <span>({categoryCount})</span>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>

      <div
        className="edu-course-widget widget-instructor"
        style={{ display: setShowInstructerFilter ? "block" : "none" }}
      >
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
            {all_instructors.map((instructor, i) => {
              const instructorCount = Array.isArray(course_items)
                ? course_items.filter((item) => item.instructor === instructor)
                    ?.length ?? 0
                : 0;

              if (instructorCount > 0) {
                return (
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
                      <span>({instructorCount})</span>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>

      <div className="edu-course-widget course-rating widget-Rating">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showRating ? "active" : ""
            }`}
            onClick={() => setShowRating(!showRating)}
          >
            Rating
          </h5>

          <div
            className="content"
            style={{ display: showRating ? "block" : "none" }}
          >
            {/* Sort all_ratings before mapping */}
            {allPossibleRatings.map((rating, i) => (
              <div key={i} className="edu-form-check">
                <input
                  onClick={() => handleRating(rating)}
                  checked={ratings.includes(rating)}
                  type="checkbox"
                  id={`cat-check-3${i + 1}`}
                  readOnly
                />
                <label htmlFor={`cat-check-3${i + 1}`}>
                  {generateStars(rating)} {/* Display stars for each rating */}
                  <span>
                    (
                    {Array.isArray(course_items)
                      ? course_items.filter((item) => item.rating === rating)
                          ?.length ?? 0
                      : 0}
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
            {all_levels.map((level, i) => {
              const levelCount = Array.isArray(course_items)
                ? course_items.filter((item) => item.level === level)?.length ??
                  0
                : 0;

              if (levelCount > 0) {
                return (
                  <div key={i} className="edu-form-check">
                    <input
                      onClick={() => handleLevel(level)}
                      checked={levels.includes(level)}
                      type="checkbox"
                      id={`cat-check-4${i + 1}`}
                      readOnly
                    />
                    <label htmlFor={`cat-check-4${i + 1}`}>
                      {level}
                      <span>({levelCount})</span>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
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
            {all_languages.map((language, i) => {
              const languageCount = Array.isArray(course_items)
                ? course_items.filter((item) => item.language === language)
                    ?.length ?? 0
                : 0;

              if (languageCount > 0) {
                return (
                  <div key={i} className="edu-form-check">
                    <input
                      onClick={() => handleLanguage(language)}
                      checked={languages.includes(language)}
                      type="checkbox"
                      id={`cat-check-5${i + 1}`}
                      readOnly
                    />
                    <label htmlFor={`cat-check-5${i + 1}`}>
                      {language}
                      <span>({languageCount})</span>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>

      <div className="edu-course-widget widget-language">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showTopic ? "active" : ""
            }`}
            onClick={() => setShowTopic(!showTopic)}
          >
            Topic
          </h5>

          <div
            className="content"
            style={{ display: showTopic ? "block" : "none" }}
          >
            {all_topics.map((topic, i) => {
              const topicCount = Array.isArray(course_items)
                ? course_items.filter((item) => item.topic === topic)?.length ??
                  0
                : 0;

              if (topicCount > 0) {
                return (
                  <div key={i} className="edu-form-check">
                    <input
                      onClick={() => handleTopic(topic)}
                      checked={topics.includes(topic)}
                      type="checkbox"
                      id={`cat-check-6${i + 1}`}
                      readOnly
                    />
                    <label htmlFor={`cat-check-6${i + 1}`}>
                      {topic}
                      <span>({topicCount})</span>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>

      <div className="edu-course-widget widget-language">
        <div className="inner">
          <h5
            className={`widget-title widget-toggle ${
              showSubCategory ? "active" : ""
            }`}
            onClick={() => setshowSubCategory(!showSubCategory)}
          >
            Sub Category
          </h5>

          <div
            className="content"
            style={{ display: showSubCategory ? "block" : "none" }}
          >
            {all_SubCategorys.map((sub_category, i) => {
              const subCategoryCount = Array.isArray(course_items)
                ? course_items.filter(
                    (item) => item.sub_category === sub_category
                  )?.length ?? 0
                : 0;

              if (subCategoryCount > 0) {
                return (
                  <div key={i} className="edu-form-check">
                    <input
                      onClick={() => handleSubCategory(sub_category)}
                      checked={subcategories.includes(sub_category)}
                      type="checkbox"
                      id={`cat-check-7${i + 1}`}
                      readOnly
                    />
                    <label htmlFor={`cat-check-7${i + 1}`}>
                      {sub_category}
                      <span>({subCategoryCount})</span>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>

      {/* <div className="edu-course-widget">
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
      </div> */}

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
