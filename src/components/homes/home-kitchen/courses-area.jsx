import Link from 'next/link';
import React from 'react';
import { course_data } from '../../../data';
import CourseTypeFour from '../../course/course-type-four';

const courses = course_data.filter(course => course.kitchen_course);

const CoursesArea = () => {
    return (
        <div className="edu-course-area course-area-5 gap-tb-text">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Popular Courses</span>
                    <h2 className="title">Pick A Course To Get Started</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="row g-5">
                    {courses.slice(0,3).map((course, key) => {
                        return (
                            <div 
                                key={course.id} 
                                data-sal-delay="150" 
                                data-sal="slide-up" 
                                data-sal-duration="800"
                                className={ `col-12 col-xl-4 col-lg-6 col-md-6 
                                    ${ ( key+1 ) % 3 === 0 && key !== 0 ? 'course-style-3-third-item' : '' } 
                                    ${ ( key+1 ) % 2 === 0 && key !== 0 ? 'course-style-3-even' : 'course-style-3-odd' }` 
                                }
                            >
                                <CourseTypeFour data={course} />   
                            </div>
                        )
                    })}
                </div>
                <div className="course-view-all" data-sal-delay="150" data-sal="slide-up" data-sal-duration="1200">
                    <h5 className="view-text">Get the Most Dedicated Kitchen Course from EduBlink. 
                    <Link href="/course-style-1">
                        <a className="btn-transparent">All Courses <i className="icon-4"></i></a>
                    </Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default CoursesArea;