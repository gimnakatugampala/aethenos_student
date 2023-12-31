import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Footer, Header, Wrapper } from "../../layout";

import SEO from "../../components/seo";
import { GetCourseCategoryTitle } from '../../api';

import CourseTypeOne from '../../components/course/course-type-one';
import { course_data } from '../../data';
import { useState } from 'react';


const GetCourseByCategory = () => {

    const router = useRouter();
    const { id } = router.query;
    const [courses, setcourses] = useState(course_data)

    useEffect(() => {
        
        console.log(courses)
        GetCourseCategoryTitle()
    }, [])
    
    

  return (
    <Wrapper>
        <SEO pageTitle={"Marketing"} />
        <Header/>


        <section className="edu-section-gap course-details-area">
            <div className="container">
                    <div className="row">
                    <h2>Development Courses</h2>

                    <h4>Courses to get you started</h4>

                    <div className="col-lg-5">
                        <div className="course-details-content">

                            <ul className="nav nav-tabs" id="myTab" role="tablist">

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="most-popular-tab" data-bs-toggle="tab" data-bs-target="#most-popular"
                                    type="button" role="tab" aria-controls="most-popular" aria-selected="true">Most Popular</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="new-tab" data-bs-toggle="tab" data-bs-target="#new"
                                    type="button" role="tab" aria-controls="new" aria-selected="false">New</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="trending-tab" data-bs-toggle="tab" data-bs-target="#trending"
                                    type="button" role="tab" aria-controls="trending" aria-selected="false">Trending</button>
                                </li>
                           
                            
                            </ul>
                          
                        </div>
                    </div>

                    <div className="col-lg-12 p-3">

                    <div className="tab-content" id="myTabContent">


                        <div className="tab-pane fade show active" id="most-popular" role="tabpanel" aria-labelledby="most-popular-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit provident cupiditate quis porro, tempora nulla dicta, distinctio cumque, aspernatur magnam quam eligendi! Autem voluptatem soluta commodi iusto impedit quis odio.
                                    
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade show active" id="new" role="tabpanel" aria-labelledby="new-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit provident cupiditate quis porro, tempora nulla dicta, distinctio cumque, aspernatur magnam quam eligendi! Autem voluptatem soluta commodi iusto impedit quis odio.
                                    
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade show active" id="trending" role="tabpanel" aria-labelledby="trending-tab">
                            <div className="course-tab-content">
                                <div className="course-overview">
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit provident cupiditate quis porro, tempora nulla dicta, distinctio cumque, aspernatur magnam quam eligendi! Autem voluptatem soluta commodi iusto impedit quis odio.
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>

    
                </div>
            </div>
        </section>

        <Footer />
    </Wrapper>
  )
}

export default GetCourseByCategory