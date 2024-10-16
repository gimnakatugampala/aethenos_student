import React, { useState } from "react";
import { useSelector } from "react-redux";
import { course_data } from "../../../data";
import CourseSidebar from "../../common/sidebar/course-sidebar-2";
import SortingArea from "../../course-filter/sorting-area";
import CourseItems from "./course-items";
import { useEffect } from "react";

const course_items = course_data.filter(
  (arr, index, self) =>
    index === self.findIndex((i) => i.img === arr.img && i.State === arr.State)
);

const CourseFourArea = ({ allcourses }) => {
  console.log(allcourses);

  const [courses, setCourses] = useState(allcourses);
  const [showing, setShowing] = useState(0);
  const { categories, instructors, levels, languages, price } = useSelector(
    (state) => state.filter
  );

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
    .filter((item) => Number(item.course_price) <= price);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="edu-course-area course-area-1">
      <div className="">
        <div className="row g-5">
        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3">
            {courses != null && <CourseSidebar course_items={courses} />}
          </div>

          <div className="col-8 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-9">
            {/* sorting area start */}
            <SortingArea
              course_items={courses}
              course_list={true}
              num={showing}
              setCourses={setCourses}
              courses={courses}
              items={items}
            />
            <CourseItems
              itemsPerPage={6}
              items={courses}
              course_style="8"
              setShowing={setShowing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFourArea;
