import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { course_data } from '../../../data';
import CourseSidebar from './side-bar-eportal';
import SortingArea from './sorting-eportal';
import CourseItems from './course-item';
import { GetMyCourses } from '../../../api';
import LargeLoading from '../../../functions/Loading/LargeLoading';

// course_items
const course_items = course_data != null && course_data.filter((arr, index, self) =>
    index === self.findIndex( ( i ) => ( i.img === arr.img && i.State === arr.State ) ) );

const CourseFourArea = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setloading] = useState(true)
    const [showing,setShowing] = useState(0);
    const { categories, instructors, levels, languages } = useSelector( (state) => state.filter );


    useEffect(() => {
        GetMyCourses(setCourses,setloading)
     }, [courses,loading])
     
     let items = courses?.filter( (item1) =>
        categories?.length !== 0
        ? categories?.some( (item2) => item1.category == item2 )
        : item1
    ).filter( (item1) =>
        instructors?.length !== 0
        ? instructors?.some( (item2) => item1.instructor == item2 )
        : item1
    ).filter( (item1) =>
        levels?.length !== 0
        ? levels?.some( (item2) => item1.level == item2 )
        : item1
    ).filter((item1) =>
        languages?.length !== 0
        ? languages?.some( (item2) => item1.language == item2 )
        : item1
    )

    return (
        <div className="edu-course-area course-area-1 section-gap-equal">
            <div className="container">

                <h3>My Courses</h3>
                
                    
                        {/* sorting area start */}
                        {/* <SortingArea course_items={course_items} course_list={true} num={showing} setCourses={setCourses} courses={courses} items={items}  /> */}
                        {/* sorting area end */}

                        {loading ? <LargeLoading /> : (

                            courses !=null && courses.length > 0 ? 
                            <div className="row g-5 mx-auto">
                                <div className="col-lg-11 col-pl--35">
                                <CourseItems itemsPerPage={5} items={items} course_style="6" setShowing={setShowing} />
                                </div>
                            </div>
                            : <h6>No Courses Found</h6>
                        )}



                
                
            </div>
        </div>
    )
}

export default CourseFourArea;