import React from 'react';
import Link from 'next/link';

const CourseTypeSeven = ({ data, classes }) => {
    return (
        <div className={`edu-course course-style-5 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`} legacyBehavior>

                        <img src={`/assets/images/course/course-04/${data.img}`} alt="Course Meta" />

                    </Link>
                 
                </div>
               
                <div className="content">
                    <h6 className="title">
                        <Link href={`/course-details/${data.id}`} legacyBehavior>

                            {data.title}

                        </Link>
                    </h6>
                    <p className="text">{data.short_desc}</p>
                </div>
            </div>
        </div>
    );
}
export default CourseTypeSeven;