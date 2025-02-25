import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CourseSidebarTwo from "../../../../src/pages/search/course-sidebar-2";
import CourseItems from "../../../../src/pages/search/course-item";
import { searchCourses } from "../../../api/index";
import SortingArea from "../../../../src/pages/search/sortingAreaSearch";
import { css } from "@emotion/react";
import { Triangle } from "react-loader-spinner";
import CalculateListPrice from "../../../functions/pricing/CalculateListPrice";
 
const SearchResults = ({ allcourses }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState(0);
  const [displayHeading, setDisplayHeading] = useState(false);
  const {
    categories,
    instructors,
    levels,
    languages,
    ratings,
    selectPrice,
    topics,
    subcategories,
  } = useSelector((state) => state.filter);

  useEffect(() => {
    setCourses(allcourses);
    console.log(allcourses.course_name);
  });

  const filteredItems = Array.isArray(courses) ? courses.filter((item) => {
    const categoryMatch = categories.length === 0 || categories.includes(item.category);
    const instructorMatch = instructors.length === 0 || instructors.includes(item.instructor);
    const ratingMatch = ratings.length === 0 || ratings.includes(item.rating);
    const levelMatch = levels.length === 0 || levels.includes(item.level);
    const languageMatch = languages.length === 0 || languages.includes(item.language);
    const topicMatch = topics.length === 0 || topics.includes(item.topic);
    const subCategoryMatch = subcategories.length === 0 || subcategories.includes(item.sub_category);
    const priceMatch = CalculateListPrice(item) <= selectPrice;
  
    return (
      categoryMatch &&
      instructorMatch &&
      ratingMatch &&
      levelMatch &&
      languageMatch &&
      topicMatch &&
      subCategoryMatch &&
      priceMatch
    );
  }) : [];
  

  const handleSortChange = (sortedCourses) => {
    setCourses(sortedCourses);
    setShowing(0);
  };

  return (
    <div className="edu-course-area course-area-1">
      <div>
        <div className="row g-5">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 ">
            <CourseSidebarTwo course_items={courses} />
          </div>

          <div
              className={`8 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-9 col-pl--5 px-0 ${
                loading ? "fade-in" : "fade-in visible"
              }`}
            >
            <SortingArea
              course_items={courses}
              num={showing}
              setCourses={handleSortChange}
              courses={courses}
              items={filteredItems}
            />

            <CourseItems
              itemsPerPage={5}
              items={filteredItems}
              searchTerm={null}
              course_style="2"
              setShowing={setShowing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
