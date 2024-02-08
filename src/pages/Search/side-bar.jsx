import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { course_data } from "../../data";
import { 
  add_category,
  add_force_page,
  add_instructor,
  add_item_offset,
  add_language,
  add_level,
  add_price,
  reset_filter,
} from "../../redux/features/filter-slice";

const courses = course_data != null && course_data.filter(
  (arr, index, self) =>
    index === self.findIndex((i) => i.img === arr.img && i.State === arr.State)
);
const max_prices = courses.map((item) => Number(item.course_price));
const maxPrice = Math.max(...max_prices);
const minPrice = Math.min(...max_prices);

const all_categories = [...new Set(courses.map((course) => course.category))];
const all_instructors = [
  ...new Set(courses.map((course) => course.instructor)),
];
const all_levels = [...new Set(courses.map((course) => course.level))];
const all_languages = [...new Set(courses.map((course) => course.language))];

const CourseSidebar = ({ course_items }) => {
  const [price, setPrice] = useState(maxPrice);
  const { categories, instructors, levels, languages, forcePage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  // handleCategory
  const handleCategory = (cate) => {
    const index = categories.findIndex((item) => item === cate);
    if (index >= 0) {
      dispatch(add_category({ changeType: "remove", item: cate, maxPrice }));
    } else {
      dispatch(add_category({ changeType: "added", item: cate, maxPrice }));
    }
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  // handleInstructor
  const handleInstructor = (instructor) => {
    dispatch(add_instructor({ instructor, maxPrice }));
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

  // handlePrice
  useEffect(() => {
    dispatch(add_price(price));
  }, [dispatch, price]);

  // handlePriceChange
  const handlePriceChange = (value) => {
    setPrice(value);
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  return (
    <div className="edu-course-sidebar">

     
          <div className="edu-course-widget ">
            <div>
              <span className="">
              <h5 className="widget-title mb-4">Sort By</h5>
              </span>
              <div className="ud-select-container ud-select-container-large">
                <select>
                  <option value="relevance" defaultValue>
                    Most Relevant
                  </option>
                  <option value="most-reviewed">Most Reviewed</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="ud-select-icon-container ud-select-icon-right"></div>
              </div>
              <label
                htmlFor="u119-form-group--243"
                className="ud-form-label ud-heading-sm"
              ></label>
            </div>
          </div>
       
    

      <div className="edu-course-widget widget-category">
        <div className="inner">
          <h5 className="widget-title">Filter by Categories</h5>

          <div className="content">
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
                    {course_items != null && course_items.filter((item) => item.category === c)?.length}
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
          <h5 className="widget-title">Level</h5>

          <div className="content">
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
                    {course_items != null &&
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
          <h5 className="widget-title">Language</h5>

          <div className="content">
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
                    {course_items != null &&
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
    </div>
  );
};

export default CourseSidebar;
