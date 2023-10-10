import React from 'react';
import Link from 'next/link';

const CourseTypeTwo = ({ data, classes }) => {
    return (
        <div className={`edu-course course-style-6 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`}>
                        <a>
                            <img src={`/assets/images/course/course-05/${data.img}`} alt="Course Thumb" />
                        </a>
                    </Link>
                    <div className="course-price price-round">${Math.trunc(data.course_price)}</div>
                </div>
                <div className="content">
                    <span className="course-level">{data.level}</span>
                    <h5 className="title">
                        <Link href={`/course-details/${data.id}`}>
                            <a>{data.title}</a>
                        </Link>
                    </h5>
                    <ul className="course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default CourseTypeTwo;