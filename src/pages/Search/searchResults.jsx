import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CourseSidebarTwo from "./course-sidebar-2";
import CourseItems from "./course-item";
import { searchCourses } from "../../api/index";
import SortingArea from "./sortingAreaSearch";
import { css } from "@emotion/react";
import { Triangle } from "react-loader-spinner";
import CalculateListPrice from "../../functions/pricing/CalculateListPrice";

const SearchResults = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showing, setShowing] = useState(0);
  const [prevKeyword, setPrevKeyword] = useState("");
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

  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (keyword !== prevKeyword) {
          setLoading(true);
          await searchCourses(keyword, setCourses);
          setLoading(false);
          setDisplayHeading(true);
          setPrevKeyword(keyword);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [
    keyword,
    prevKeyword,
    categories,
    instructors,
    ratings,
    levels,
    languages,
    topics,
    subcategories,
    selectPrice,
  ]);

  const filteredItems = courses.filter((item) => {
    const categoryMatch =
      categories.length === 0 || categories.includes(item.category);

    const instructorMatch =
      instructors.length === 0 || instructors.includes(item.instructor);

    const ratingMatch = ratings.length === 0 || ratings.includes(item.rating);

    const levelMatch = levels.length === 0 || levels.includes(item.level);
    const languageMatch =
      languages.length === 0 || languages.includes(item.language);

    const topicMatch = topics.length === 0 || topics.includes(item.topic);

    const subCategoryMatch =
      subcategories.length === 0 || subcategories.includes(item.sub_category);

    const priceMatch = CalculateListPrice(item) <= selectPrice;

    return (
      categoryMatch &&
      instructorMatch &&
      levelMatch &&
      languageMatch &&
      topicMatch &&
      subCategoryMatch &&
      ratingMatch &&
      priceMatch
    );
  });

  const handleSortChange = (sortedCourses) => {
    setCourses(sortedCourses);
    setShowing(0);
  };

  return (
    <div className="edu-course-area section-gap-equal gap-bottom-text ">
      <div
        className="gap-bottom-text mx-5"       
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Triangle
              visible={true}
              height="150"
              width="150"
              color="#e01D20"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="row g-1">
            <h3
              className="heading-title mx-1"
              data-sal-delay="2150"
              // data-sal="slide-up"
              data-sal-duration="400"
            >
              <div className="mb-2">
                {courses.length == 0
                  ? `No results for "${keyword}"`
                  : `${courses.length} results for "${keyword}"`}
              </div>
            </h3>

            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 ">
              <CourseSidebarTwo course_items={courses} />
            </div>

            <div
              className={`8 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-9 col-pl--5 ${
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
                itemsPerPage={8}
                items={filteredItems}
                searchTerm={keyword}
                course_style="2"
                setShowing={setShowing}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
