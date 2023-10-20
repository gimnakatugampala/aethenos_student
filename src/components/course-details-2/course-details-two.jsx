import React from 'react';
import CourseDetailsSidebar from '../common/sidebar/course-details-sidebar';
import SingleComment from '../course-details/single-comment';
import SingleProgressbar from '../course-details/single-progressbar';
import SingleAccordion from './single-accordion';
import { useState } from 'react';
import { course_data } from '../../data';
import SortingArea from '../course-filter/sorting-area';
import CourseTypeSix from '../course/course-type-six';

const CourseDetailsTwo = ({ course }) => {
    const coursePerView = 3;
    const [next, setNext] = useState(coursePerView);
    const [courses,setCourses] = useState(course_data);
    // handleLoadData
    const handleLoadData = () => {
        setNext(value => value + 3)
    }
  const { course_desc, course_desc_2, learn_list, course_desc_3, curriculum_desc, course_lessons, instructor_img, instructor_title, instructor_desc, social_links, reviews, instructor, rating, rating_count } = course || {};
    return (
        <section className="edu-section-gap course-details-area">
            <div className="container">
                <div className="row row--30">
                    <div className="col-lg-8">
                        <div className="course-details-content course-details-2">
                            <div className="course-overview">
                                {/* <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">About This Course</h3> */}
                                {/* <p data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">{course_desc}</p> */}
                                {/* <p data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">{course_desc_2}</p> */}
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
                                </div>
                                <div>
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

                                </div>

                                <div className='mb-5'>

                             
                                <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">Students also bought</h3>

                                <div className="edu-course-area course-area-1 ">

            <div className="container">
                {/* <SortingArea course_items={course_data} num={courses?.slice(0,next)?.length} setCourses={setCourses} courses={courses} /> */}

                <div className="row g-5">
                    {courses?.slice(0, next)?.map((course) => (
                        <div key={course.id} className="col-md-6 col-lg-4">
                            <CourseTypeSix data={course} classes="course-box-shadow" />
                        </div>
                    ))}
                </div>

                {/* {next < courses.length && 
                    <div onClick={handleLoadData} className="load-more-btn" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1200">
                        <a className="edu-btn" style={{ cursor: 'pointer' }}>Load More <i className="icon-56"></i></a>
                    </div>
                } */}
            </div>
        </div>
        </div>
                            <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">Description</h3>
                                <ul className="mb--90" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                    <p>Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the HIGHEST RATED courses in the history of Udemy! 

At 65+ hours, this Web Development course is without a doubt the most comprehensive web development course available online. <br /> Even if you have zero programming experience, this course will take you from beginner</p>
                                </ul>
                           

                        

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
                <div>

                             
<h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">More Courses by <a href="course-style-5">Dr. Angela Yu</a></h3>

  <div className="edu-course-area course-area-1 ">

    <div className="container">
      <SortingArea course_items={course_data} num={courses?.slice(0,next)?.length} setCourses={setCourses} courses={courses} />

         <div className="row g-5">
            {courses?.slice(0, next)?.map((course) => (
                <div key={course.id} className="col-md-6 col-lg-4">
                     <CourseTypeSix data={course} classes="course-box-shadow" />
                </div>
                ))}
        </div>

     {next < courses.length && 
 <div onClick={handleLoadData} className="load-more-btn" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1200">
      <a className="edu-btn" style={{ cursor: 'pointer' }}>Load More <i className="icon-56"></i></a>
       </div>
         }
      </div>
</div>
</div>
            </div>
        </section>
    )
}

export default CourseDetailsTwo;