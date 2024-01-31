
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CourseRangeList from './course-range-list';
import CardContainer from '../../../contexts/CardContainer';
import { useEffect } from 'react';
import { GetCourseHomeBusiness } from '../../../api';
import { useState } from 'react';
import CoursesPotraitSkeleton from '../../../functions/Skeletons/CoursesPotraitSkeleton'

const CourseRange = () => {

    const [business_courses, setbusiness_courses] = useState([])


    const [loading_business_courses, setloading_business_courses] = useState(true)

    useEffect(() => {
        GetCourseHomeBusiness(setbusiness_courses,setloading_business_courses)
    },business_courses)
    

    return (
        <div className="edu-brand-area brand-area-1 p-5 bg-lighten01">
            <div className="container-fluid">
                <div className="row">

                <div className='mb-4'>
                <h3 className="title m-0">A broad selection of courses</h3>
                <p className="m-0">Choose from over 210,000 online video courses with new additions published every month</p>
                </div>

                <div className="col-md-12">
                <div className="course-details-content">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">

                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="business-tab" data-bs-toggle="tab" data-bs-target="#business"
                            type="button" role="tab" aria-controls="business" aria-selected="true">Business</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="design-tab" data-bs-toggle="tab" data-bs-target="#design"
                            type="button" role="tab" aria-controls="design" aria-selected="false">Design</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="photography-video-tab" data-bs-toggle="tab" data-bs-target="#photography-video"
                            type="button" role="tab" aria-controls="photography-video" aria-selected="false">Photography & Video</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="development-tab" data-bs-toggle="tab" data-bs-target="#development"
                            type="button" role="tab" aria-controls="development" aria-selected="false">Development</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="marketing-tab" data-bs-toggle="tab" data-bs-target="#marketing"
                            type="button" role="tab" aria-controls="marketing" aria-selected="false">Marketing</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="it-software-tab" data-bs-toggle="tab" data-bs-target="#it-software"
                            type="button" role="tab" aria-controls="it-software" aria-selected="false">IT & Software</button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="personal-development-tab" data-bs-toggle="tab" data-bs-target="#personal-development"
                            type="button" role="tab" aria-controls="personal-development" aria-selected="false">Personal Development</button>
                        </li>
                    
                    
                    </ul>
                    
                </div>

           
                </div>

                <div className="col-lg-12 p-3">
                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="business" role="tabpanel" aria-labelledby="business-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">

                                    {/* <CourseRangeList /> */}

                                {loading_business_courses ? (
                                    <div className='row'>
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    <CoursesPotraitSkeleton />
                                    </div>
                                ) : (
                                    business_courses != null && business_courses.length > 0   ? <CourseRangeList  course={business_courses} />  : <h4>No Business Courses Available</h4> 
                                )}


                                {/* {next < business_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                                 
                                    
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade" id="design" role="tabpanel" aria-labelledby="design-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_new_courses ? (
                                  <div className='row'>
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  <CoursesPotraitSkeleton />
                                  </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {new_courses.length > 0 || new_courses != null ? new_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No New Courses Available</h4>}
                                </div>
                              )}


                                {next < new_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )}
                                     */}
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="photography-video" role="tabpanel" aria-labelledby="photography-video-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

                                {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="development" role="tabpanel" aria-labelledby="development-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

                                {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="marketing" role="tabpanel" aria-labelledby="marketing-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

                                {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="it-software" role="tabpanel" aria-labelledby="it-software-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />

                              {/* {loading_trending_courses ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

                                {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="personal-development" role="tabpanel" aria-labelledby="personal-development-tab">
                            <div className="course-tab-content">
                            <div className="course-overview">

                            <CourseRangeList />
                                  
                              {/* {loading_trending_courses ? (
                                   <div className='row'>
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   <CoursesPotraitSkeleton />
                                   </div>
                              ) : (
                                <div className="row g-3 mb-5">
                                {trending_courses.length > 0 || trending_courses != null ? trending_courses.slice(0, next)?.map((course) => {
                                    return (
                                    <div key={course.id} className="col-md-6 col-xl-3">
                                        <CourseTypeOne data={course} classes="course-box-shadow" />
                                    </div>
                                    );
                                }) : <h4 >No Trending Courses Available</h4>}
                                </div>
                              )}

                                {next < trending_courses.length && (
                                    <div
                                        onClick={handleLoadData}
                                        className="load-more-btn"
                                        data-sal-delay="100"
                                        data-sal="slide-up"
                                        data-sal-duration="1200"
                                    >
                                        <a className="edu-btn mb-5" style={{ cursor: "pointer" }}>
                                        Load More <i className="icon-56"></i>
                                        </a>
                                    </div>
                                    )} */}
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default CourseRange;