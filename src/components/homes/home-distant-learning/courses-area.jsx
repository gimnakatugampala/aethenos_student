import Link from 'next/link';
import { course_data } from "../../../data";
import CourseTypeOne from '../../course/course-type-one';

const CoursesArea = () => {
  return (
        <div className="edu-course-area course-area-2 gap-tb-text bg-lighten03">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="100" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Popular Courses</span>
                    <h2 className="title">Pick A Course To Get Started</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    {course_data.slice(0,3).map((course) => {
                        return (
                            <div className="col-md-6 col-lg-4" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800" key={course.id}>
                                <CourseTypeOne data={course} image_location_path='02' />
                            </div>
                        )
                    })}
                </div>
                <div className="course-view-all" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1200">
                    <Link href="/course-style-1">
                        <a className="edu-btn">Browse more courses <i className="icon-4"></i></a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CoursesArea;