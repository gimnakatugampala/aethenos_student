import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_count_page,
  add_force_page,
  add_item_offset,
} from "../../redux/features/filter-slice";
import Pagination from "../../ui/pagination";
import CourseTypeFive from "./courseType";
import CourseArea1 from "./more-corses";
import { Chip, Stack } from "@mui/material";
// import CourseOne from "./course-one";

const CourseItems = ({ itemsPerPage, items, course_style, setShowing }) => {
  const { page_count, item_offset, forcePage } = useSelector(
    (state) => state.filter
  );
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(page_count);
  const [itemOffset, setItemOffset] = useState(item_offset);
  const dispatch = useDispatch();
  // side effect
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    if (currentItems && setShowing) {
      setShowing(currentItems.length);
    }
  }, [currentItems, setShowing]);

  useEffect(() => {
    dispatch(add_count_page(pageCount));
    dispatch(add_item_offset(itemOffset));
  }, [dispatch, itemOffset, pageCount]);

  useEffect(() => {
    setPageCount(page_count);
    setItemOffset(item_offset);
  }, [item_offset, page_count]);

  // handlePageClick
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    dispatch(add_force_page(event.selected));
  };

  return (
    <>
      {currentItems &&
        currentItems.map((course, i) => {
          return <CourseTypeFive key={i} data={course} />;
        })}

      <CourseArea1 />

      <Pagination
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        focusPage={forcePage}
      />

      <div>
        <h3
          className="heading-title"
          data-sal-delay="150"
          data-sal="slide-up"
          data-sal-duration="400"
        >
          Related Searches
        </h3>
        <Stack direction="row" spacing={2}>
          <Chip
            label="Web Development"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.5rem" }}
          />
          <Chip
            label="Database Manegment"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.5rem" }}
          />
          <Chip
            label="Complete Web Development"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.5rem" }}
          />
          <Chip
            label="Manual QA"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.5rem" }}
          />
          <Chip
            label="Web Developer"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.5rem" }}
          />
        </Stack>
      </div>
    </>
  );
};

export default CourseItems;
