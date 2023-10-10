import React from 'react';
import CourseDetailsSidebar from '../common/sidebar/course-details-sidebar';
import SingleComment from '../course-details/single-comment';
import SingleProgressbar from '../course-details/single-progressbar';
import SingleAccordion from './single-accordion';

const CourseDetailsTwo = ({ course }) => {
  const { course_desc, course_desc_2, learn_list, course_desc_3, curriculum_desc, course_lessons, instructor_img, instructor_title, instructor_desc, social_links, reviews, instructor, rating, rating_count } = course || {};
    return (
        <section className="edu-section-gap course-details-area">
            <div className="container">
                <div className="row row--30">
                    <div className="col-lg-8">
                        <div className="course-details-content course-details-2">
                            <div className="course-overview">
                                <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">About This Course</h3>
                                <p data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">{course_desc}</p>
                                <p data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">{course_desc_2}</p>
                                <div className="border-box">
                                    <h5 className="title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">What You’ll Learn?</h5>
                                    <div className="row g-5">
                                        <div className="col-lg-6" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                            <ul>
                                                <li>Learn to use Python professionally, learning both Python 2 & Python 3!</li>
                                                <li>Build 6 beautiful real-world projects for your portfolio (not boring toy apps)</li>
                                            </ul>
                                        </div>

                                        <div className="col-lg-6" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                            <ul>
                                                <li>Understand the Theory behind Vue.js and use it in Real Projects</li>
                                                <li>Create responsive, accessible, and beautiful layouts</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">Requirements</h3>
                                <ul className="mb--90" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                    <li>No prior knowledge of Wordpress is required as everything will be covered in this course.</li>
                                    <li>Basic HTML and CSS knowledge helps, but {"isn't"} a must-have</li>
                                    <li>You {"don't"} need any coding experience at all. That is the beauty of Wordpress.</li>
                                    <li>Basic JavaScript knowledge is required</li>
                                </ul>

                                <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">Target Audience</h3>
                                <ul className="mb--90" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                    <li>Newcomer as well as experienced frontend developers interested in learning a modern JavaScript framework</li>
                                    <li>If you want to learn to master Wordpress without getting bogged down with technical jargon, this course is for you.</li>
                                    <li>This course is for you if you want to build a website, whether for personal or business reasons.</li>
                                    <li>This course is perfect for you if you are taking over an existing Wordpress website, or want to build one from</li>
                                </ul>
                            </div>

                            <div className="course-curriculam mb--90">
                                <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">Topics for This Course</h3>
                                <p data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua.</p>
                                <div className="accordion edu-accordion" id="accordionExample" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">

                                    <SingleAccordion show={true} id="1" title="Course Introduction" desc={[
                                        { title: 'Introduction', icon: 'icon-68' },
                                        { title: 'Course Overview', icon: 'icon-68' },
                                        { title: 'Course Overview', badge_list: true, question: 0, minutes: 10 },
                                        { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                        { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                        { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                                    ]} />
                                    <SingleAccordion id="2" title="JavaScript Language Basics" desc={[
                                        { title: 'Introduction', icon: 'icon-68' },
                                        { title: 'Course Overview', icon: 'icon-68' },
                                        { title: 'Course Overview', badge_list: true, question: 2, minutes: 12 },
                                        { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                        { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                        { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                                    ]} />
                                    <SingleAccordion id="3" title="Components & Databinding" desc={[
                                        { title: 'Introduction', icon: 'icon-68' },
                                        { title: 'Course Overview', icon: 'icon-68' },
                                        { title: 'Course Overview', badge_list: true, question: 4, minutes: 15 },
                                        { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                        { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                        { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                                    ]} />
                                    <SingleAccordion id="4" title="Product Management Leadership" desc={[
                                        { title: 'Introduction', icon: 'icon-68' },
                                        { title: 'Course Overview', icon: 'icon-68' },
                                        { title: 'Course Overview', badge_list: true, question: 6, minutes: 18 },
                                        { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                        { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                        { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                                    ]} />
                                </div>
                            </div>

                            <div className="course-instructor-wrap mb--90" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <h3 className="heading-title">Your Instructors</h3>
                                <div className="course-instructor">
                                    <div className="thumbnail">
                                        <img src={`/assets/images/team/team-02/${instructor_img}`} alt="team images" />
                                    </div>

                                    <div className="author-content">
                                        <h6 className="title">{instructor}</h6>
                                        <span className="subtitle">{instructor_title}</span>
                                        <p>{instructor_desc}</p>
                                        <ul className="social-share">
                                            {social_links?.map((social, i) => (
                                                <li key={i}>
                                                    <a href={social.link} target={social.target ? social.target : ''}>
                                                        <i className={social.icon}></i>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="course-review" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <h3 className="heading-title">Student Feedback</h3>
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

                                    <div className="col-lg-8">
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
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <CourseDetailsSidebar course={course} details_2={true} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetailsTwo;