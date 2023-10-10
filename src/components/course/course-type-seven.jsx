import React from 'react';
import Link from 'next/link';

const CourseTypeSeven = ({ data, classes }) => {
    return (
        <div className={`edu-course course-style-5 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`}>
                        <a>
                            <img src={`/assets/images/course/course-04/${data.img}`} alt="Course Meta" />
                        </a>
                    </Link>
                    <div className="course-price">${data.course_price}</div>
                    <div className="read-more-btn">
                        <Link href={`/course-details/${data.id}`}>
                            <a className="btn-icon-round"><i className="icon-4"></i></a>
                        </Link>
                    </div>
                </div>
                <div className="instructor">
                    <img src={`/assets/images/course/instructor/${data.instructor_img}`} alt="images" />
                    <h6 className="instructor-name">{data.instructor}</h6>
                </div>
                <div className="content">
                    <h6 className="title">
                        <Link href={`/course-details/${data.id}`}>
                            <a>
                                {data.title}
                            </a>
                        </Link>
                    </h6>
                    <p className="text">{data.short_desc}</p>
                </div>
            </div>
        </div>
    )
}
export default CourseTypeSeven;