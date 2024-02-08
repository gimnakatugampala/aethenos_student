import React from "react";
import { useDispatch } from "react-redux";
import {
  add_force_page,
  add_item_offset,
} from "../../redux/features/filter-slice";

const SortingArea = ({
  course_items,
  num,
  setCourses,
  courses,
  course_list,
  items,
}) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value === "Filters") {
      setCourses(course_items);
    } else if (e.target.value === "Low To High") {
      const lowToHigh = courses
        .slice()
        .sort(
          (a, b) => parseFloat(a.course_price) - parseFloat(b.course_price)
        );
      setCourses(lowToHigh);
    } else if (e.target.value === "High To Low") {
      const highToHigh = courses
        .slice()
        .sort(
          (a, b) => parseFloat(b.course_price) - parseFloat(a.course_price)
        );
      setCourses(highToHigh);
    }
    dispatch(add_item_offset(0));
    dispatch(add_force_page(0));
  };

  return (
    <div className="edu-sorting-area">
      <div className="sorting-right">
        {items ? (
          <h5 className="showing-text">
            Showing <span>{num}</span> of <span>{course_items.length}</span>{" "}
            courses
          </h5>
        ) : (
          <h6 className="showing-text">
            Showing <span>{num}</span> courses
          </h6>
        )}
      </div>
    </div>
  );
};

export default SortingArea;
