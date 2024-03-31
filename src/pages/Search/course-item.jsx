import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_count_page,
  add_force_page,
  add_item_offset,
} from "../../redux/features/filter-slice";
import Pagination from "../../ui/pagination";
import CourseTypeFive from "./course-type-five-details";
import CourseArea1 from "./more-corses";
import { Chip, Stack } from "@mui/material";

// import CourseOne from "./course-one";

const CourseItems = ({
  items,
  itemsPerPage,
  searchTerm,
  course_style,
  setShowing,
}) => {
  const { page_count, item_offset, forcePage } = useSelector(
    (state) => state.filter
  );

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(page_count);
  const [itemOffset, setItemOffset] = useState(item_offset);
  const dispatch = useDispatch();

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
    setItemOffset(item_offset);
  }, [item_offset]);

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

      <CourseArea1 searchKey={searchTerm} />

      <Pagination
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        focusPage={forcePage}
      />

      {/* <div>
        <h3
          className="heading-title mt-5"
          data-sal-delay="150"
          // data-sal="slide-up"
          data-sal-duration="400"
        >
          Related Searches
        </h3>
        <Stack direction="row" spacing={2} style={{ display: "flex", flexWrap: "wrap", margin: "10px 0"}}>
          <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Web Development"
            variant="outlined"
            color="primary"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
          <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Database Management"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
          <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Complete Web Development"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
          <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Manual QA"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
          <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="IT & Software"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
            <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Finance & Accounting"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
            <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Marketing"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
             <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Music"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
             <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Photography & Video"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
              <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Personal Development"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
              <Chip
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              height: "2.4rem",
              borderRadius: "9999px",
              margin: "10px",
            }}
            label="Health & Fitness"
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1.0rem", fontFamily: "Poppins, sans-serif" }}
          />
        </Stack>
      </div> */}
    </>
  );
};

export default CourseItems;
