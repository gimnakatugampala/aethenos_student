import React from 'react';
import CourseDetailsSidebar from '../common/sidebar/course-details-sidebar';
import CommentFormCourse from '../forms/comment-form-course';
import SingleComment from './single-comment';
import SingleProgressbar from './single-progressbar';
import { IMG_HOST } from '../../api';
import Accordian from './accordian';



const CourseDetailsArea = ({ course }) => {
  const { course_desc, course_desc_2, learn_list, course_desc_3, curriculum_desc, course_lessons, instructor_img, instructor_title, instructor_desc, social_links, reviews, instructor, rating, rating_count } = course || {};
    return (
        <section className="edu-section-gap course-details-3">
            <div className="container">
                <div className="row row--30">
                    <div className="col-lg-8 pt-0">

                        <div className="course-details-content pt-0">

                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview"
                                    type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="carriculam-tab" data-bs-toggle="tab" data-bs-target="#carriculam"
                                    type="button" role="tab" aria-controls="carriculam" aria-selected="false">Curriculam</button>
                                </li>
                            
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button"
                                    role="tab" aria-controls="review" aria-selected="false">Reviews</button>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                    <div className="course-tab-content">
                                        <div className="course-overview">
                                    
                                      

                                            <h3 className="heading-title">Course Description</h3>
                                            <p>{course.course_main_desc}</p>
                                         
                                            <h5 className="title">What You’ll Learn?</h5>
                                            <ul className="mb--60">
                                                <div className='row'>
                                                {course.intended_learners?.map((l, i) => (
                                                    l.intended_learner_type == " students learn" && <li className='col-md-6' key={i}>{l.intended_learner}</li>
                                                ))}
                                                </div>
                                            </ul>
                                      
                                            <h5 className="title">Requirements</h5>
                                            <ul className="mb--60">
                                            {course.intended_learners?.map((l, i) => (
                                                l.intended_learner_type == "requirements" &&  <li key={i}>{l.intended_learner}</li>
                                            ))}
                                                   
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="carriculam" role="tabpanel" aria-labelledby="carriculam-tab">
                                    <div className="course-tab-content">
                                        <div className="course-curriculam">
                                            <h3 className="heading-title">Course Curriculum</h3>

                                    <div className="faq-accordion">
                                        <div className="accordion">

                                            {course.course_content.map((content,index) => (
                                             <Accordian key={index} id={index} no_quiz={content.no_of_qize} title={`${content.section_name}`} lectures={content.no_of_lectures} lists={content.section_curriculum_item} />
                                            ))}

                                        {/* <Accordian show={true} id="1" title="Introduction" lectures="8" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." /> */}


                                   
                                    </div>
                                </div>


                                            {/* {course.course_lessons.map((lesson, i) => (
                                                <div key={i} className="course-lesson">
                                                    <h5 className="title">{lesson?.title}</h5>
                                                    <p>{lesson?.text}</p>
                                                    <ul>
                                                        {lesson?.lessons?.map((list, i) => (
                                                            <li key={i}>
                                                                {list.title && 
                                                                    <div className="text">
                                                                        <i className="icon-65"></i>
                                                                        {list.title}
                                                                    </div>
                                                                }

                                                                {!list?.badge_list && 
                                                                    <div className="icon">
                                                                        <i className={list?.icon}></i>
                                                                    </div>
                                                                }

                                                                {list?.badge_list && 
                                                                    <div className="badge-list">
                                                                        <span className="badge badge-primary">{list?.question} Question</span>
                                                                        <span className="badge badge-secondary">{list?.minutes} Minutes</span>
                                                                    </div>
                                                                }
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))} */}



        

                                        </div>
                                    </div>
                                </div>


                                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                    <div className="course-tab-content">

                                        <div className="course-review">
                                            <h3 className="heading-title">Course Rating</h3>
                                            <p>{rating} average rating based on {rating_count} rating</p>
                                            <div className="row g-0 align-items-center">
                                                <div className="col-sm-4">
                                                    <div className="rating-box">
                                                        <div className="rating-number">{rating}</div>
                                                        <div className="rating">
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                        </div>
                                                        <span>({rating_count} Review)</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="review-wrapper">
                                                        <SingleProgressbar value={'100'} rating_value={rating_count} />
                                                        <SingleProgressbar value={'0'} rating_value={'0'} />
                                                        <SingleProgressbar value={'0'} rating_value={'0'} />
                                                        <SingleProgressbar value={'0'} rating_value={'0'} />
                                                        <SingleProgressbar value={'0'} rating_value={'0'} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="comment-area">
                                                <h3 className="heading-title">Reviews</h3>
                                                <div className="comment-list-wrapper">
                                                    {reviews?.map((review, i) => (
                                                        <SingleComment key={i} review={review} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* <div className="comment-form-area">
                                                <h3 className="heading-title">Write a Review</h3>
                                                <div className="rating-icon">
                                                    <h6 className="title">Rating Here</h6>
                                                    <div className="rating">
                                                        <i className="icon-23"></i>
                                                        <i className="icon-23"></i>
                                                        <i className="icon-23"></i>
                                                        <i className="icon-23"></i>
                                                        <i className="icon-23"></i>
                                                    </div>
                                                </div>
                                                <CommentFormCourse/>
                                            </div> */}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <CourseDetailsSidebar course={course} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetailsArea;