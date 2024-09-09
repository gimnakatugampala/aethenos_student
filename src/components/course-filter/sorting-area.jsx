import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { add_force_page, add_item_offset } from '../../redux/features/filter-slice';

const SortingArea = ({ course_items, num, setCourses, courses, course_list, items }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const selectedOption = e.target.value;

        if (selectedOption === 'Filters') {   
            setCourses(course_items);
        } else if (selectedOption === 'Low To High') {
 
            const lowToHigh = courses.slice().sort((a, b) => {
                const priceA = parseFloat(a.course_prices?.globalListPrice || 0);
                const priceB = parseFloat(b.course_prices?.globalListPrice || 0);
                return priceA - priceB;
            });
            setCourses(lowToHigh);
        } else if (selectedOption === 'High To Low') {

            const highToLow = courses.slice().sort((a, b) => {
                const priceA = parseFloat(a.course_prices?.globalListPrice || 0);
                const priceB = parseFloat(b.course_prices?.globalListPrice || 0);
                return priceB - priceA;
            });
            setCourses(highToLow);
        }

        dispatch(add_item_offset(0));
        dispatch(add_force_page(0));
    };

    return (
        <div className="edu-sorting-area">
            <div className="sorting-left">
                {items ? (
                    <h6 className="showing-text">Showing <span>{num}</span> of <span>{items.length}</span> courses</h6>
                ) : (
                    <h6 className="showing-text">Showing <span>{num}</span> courses</h6>
                )}
            </div>
            <div className="sorting-right">
                <div className="edu-sorting">
                    <div className="icon"><i className="icon-55"></i></div>
                    <select onChange={handleChange} className="edu-select">
                        <option>Filters</option>
                        <option>Low To High</option>
                        <option>High To Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SortingArea;
