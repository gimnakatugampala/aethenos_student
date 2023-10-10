import React from 'react';
import { useState } from 'react';
import { course_data } from '../../../data';
import CourseTypeSix from '../../course/course-type-six';

const courses = course_data.filter(course => course.university_courses);

const CoursesArea = () => {
    const [category, setCategory] = useState('undergraduate');
    const category_items = courses.filter(course => course.filter_category.includes(category));
    const [coursesItems, setCoursesItems] = useState(category_items);
    const handleCategoryItems = (c) => {
        setCategory(c)
        const filtering_category_courses = courses.filter(course => course.filter_category.includes(c));
        setCoursesItems(filtering_category_courses)
    }

    return (
        <div className="edu-course-area course-area-3 section-gap-large bg-lighten04">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Popular Courses</span>
                    <h2 className="title">Academic Programs</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="isotope-wrapper">
                    <div className="isotop-button">
                        <button onClick={() => handleCategoryItems('undergraduate')} className={category === 'undergraduate' ? 'is-checked' : ''}>
                            <span className="filter-text">Undergraduate Program</span>
                        </button>
                        <button onClick={() => handleCategoryItems('graduate')} className={category === 'graduate' ? 'is-checked' : ''}>
                            <span className="filter-text">Graduate Program</span>
                        </button>
                        <button onClick={() => handleCategoryItems('online')} className={category === 'online' ? 'is-checked' : ''}>
                            <span className="filter-text">Online Program</span>
                        </button>
                    </div>

                    <div className="row g-5" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                        {coursesItems.map((course, _) => {
                            return (
                                <div className="col-md-6 col-lg-4" key={course.id}>
                                    <CourseTypeSix data={course} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            
            <ul className="shape-group">
                <li className="shape-1">
                    <img className="d-block-shape-light" src="/assets/images/others/map-shape-3.png" alt="Shape" />
                    <img className="d-none-shape-dark" src="/assets/images/others/3-Home-1.png" alt="Shape" />
                </li>
                <li className="shape-2">
                    <img className="d-block-shape-light" src="/assets/images/others/map-shape-3.png" alt="Shape" />
                    <img className="d-none-shape-dark" src="/assets/images/others/dark-map-shape-3.png" alt="Shape" />
                </li>
            </ul>
        </div>
    )
}

export default CoursesArea;