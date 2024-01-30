import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CourseSidebar from "./side-bar";
import CourseItems from "./course-item";
import { searchCourses } from "../../api/index";
import SortingArea from "./sortingAreaSearch";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const SearchResults = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showing, setShowing] = useState(0);
  const [displayHeading, setDisplayHeading] = useState(false);
  const { categories, instructors, levels, languages } = useSelector(
    (state) => state.filter
  );

  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await searchCourses(keyword, setCourses);
        setLoading(false);
        setDisplayHeading(true); 
      } catch (error) {       
        setLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword, setCourses]);

  let items = courses
    ?.filter((item1) =>
      categories?.length !== 0
        ? categories?.some((item2) => item1.category == item2)
        : item1
    )
    .filter((item1) =>
      instructors?.length !== 0
        ? instructors?.some((item2) => item1.instructor == item2)
        : item1
    )
    .filter((item1) =>
      levels?.length !== 0
        ? levels?.some((item2) => item1.level == item2)
        : item1
    )
    .filter((item1) =>
      languages?.length !== 0
        ? languages?.some((item2) => item1.language == item2)
        : item1
    )
    .filter((item1) =>
      keyword
        ? item1.title?.toLowerCase().includes(keyword.toString().toLowerCase())
        : item1
    );

  const handleSortChange = (sortedCourses) => {
    setCourses(sortedCourses);
    setShowing(0);
  };

  const override = css`
    display: none;
    margin: 0px 0px -850px auto;
    justify-content: center;
    padding: 100px;
    border-color: red;
  `;

  return (
    <div className="edu-course-area section-gap-equal gap-bottom-text mb-5">
      <div
        className="container gap-bottom-text"
        style={{ maxWidth: "80%", paddingBottom: "75px" }}
      >
        {loading ? (
          <div className="loading-spinner col-12 mx-auto gap-bottom-text">
            <RingLoader
              color={"#e01D20"}
              loading={loading}
              css={override}
              size={200}
            />
          </div>
        ) : (
          <div className="row g-3" >
            <h1
              className="heading-title mx-1"
              data-sal-delay="2150"
              // data-sal="slide-up"
              data-sal-duration="400"
            >
              <div className="mb-5">
                {courses.length === 0
                  ? `No results for "${keyword}"`
                  : `Search Results for: ${keyword}`}
              </div>
            </h1>

            <div className="col-md-3">
              <CourseSidebar course_items={courses} />
            </div>

            <div
              className={`col-lg-9 col-pl--5 ${
                loading ? "fade-in" : "fade-in visible"
              }`}
            >
              <SortingArea
                course_items={courses}
                num={showing}
                setCourses={handleSortChange}
                courses={courses}
                items={items}
              />

              <CourseItems
                itemsPerPage={8}
                items={courses}
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
