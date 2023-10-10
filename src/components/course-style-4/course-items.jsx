import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    add_count_page,
    add_force_page,
    add_item_offset
} from "../../redux/features/filter-slice";
import Pagination from "../../ui/pagination";
import CourseTypeFive from '../course/course-type-five';

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
            {currentItems && currentItems.map((course, i) => {
                return (
                    <CourseTypeFive key={i} data={course} />
                )
            })}

            <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                focusPage={forcePage}
            />
        </>
    )
}

export default CourseItems;
