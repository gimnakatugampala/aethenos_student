import React from 'react';
import Link from 'next/link';

const CourseTypeSeven = ({ data, classes }) => {
    return (
        <div className={`edu-course course-style-4 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`}>
                        <a>
                            <img src={`/assets/images/course/course-03/${data.img}`} alt="Course Meta" />
                        </a>
                    </Link>
                    <div className="time-top">
                        <span className="duration"><i className="icon-61"></i>{data.duration}</span>
                    </div>
                </div>

                <div className="content">
                    <div className="course-price">${data.course_price}</div>
                    <h6 className="title">
                        <Link href={`/course-details/${data.id}`}>
                            <a>{data.title}</a>
                        </Link>
                    </h6>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({data.rating} /{data.rating_count} Rating)</span>
                    </div>
                    <ul className="course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default CourseTypeSeven;