import React, { useState } from "react";
import { useSelector } from "react-redux";
import { course_data } from "../../data";
import { useRouter } from "next/router";
import CourseSidebar from "./side-bar";
import CourseItems from "./course-item";

// course_items
const course_items = course_data.filter(
  (arr, index, self) =>
    index === self.findIndex((i) => i.img === arr.img && i.State === arr.State)
);

const searchResults = () => {
  const [courses, setCourses] = useState(course_items);
  const [showing, setShowing] = useState(0);
  const { categories, instructors, levels, languages } = useSelector(
    (state) => state.filter
  );

  const router = useRouter();
  const { keyword } = router.query;

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
    );

  return (
    <div className="edu-course-area  section-gap-equal">
      <div className="container" style={{ maxWidth: "80%" }}>
        <div className="row g-3">
          <h1
            className="heading-title mx-1"
            data-sal-delay="150"
            data-sal="slide-up"
            data-sal-duration="400"
          >
            <div className="mb-5">Search Results for : {keyword}</div>
          </h1>
          <div className="col-md-3">
            {/* course sidebar start */}
            <CourseSidebar course_items={course_items} />
            {/* course sidebar end */}
          </div>

          <div className="col-lg-9 col-pl--5">
            <CourseItems
              itemsPerPage={8}
              items={items}
              course_style="2"
              setShowing={setShowing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default searchResults;
