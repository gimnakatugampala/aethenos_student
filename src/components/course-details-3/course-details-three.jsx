import Link from 'next/link';
import React from 'react';
import useModal from '../../hooks/use-modal';
import VideoModal from '../common/popup-modal/video-modal';
import DetailsSidebar from './details-sidebar';

const CourseDetailsThree = () => {
    const { isVideoOpen, setIsVideoOpen } = useModal();
    return (
        <>
            <section className="edu-section-gap course-details-area">
                <div className="container">
                    <div className="row row--30">
                        <div className="col-lg-8">
                            <div className="course-details-content course-details-3">
                                <div className="entry-content">
                                    <h2 className="title">Global Education Fall Meeting for Everyone</h2>
                                    <ul className="course-meta">
                                        <li><i className="icon-58"></i>by Edward Norton</li>
                                        <li><i className="icon-59"></i>English</li>
                                        <li className="course-rating">
                                            <div className="rating">
                                                <i className="icon-23"></i>
                                                <i className="icon-23"></i>
                                                <i className="icon-23"></i>
                                                <i className="icon-23"></i>
                                                <i className="icon-23"></i>
                                            </div>
                                            <span className="rating-count">(720 Rating)</span>
                                        </li>
                                    </ul>

                                    <div className="thumbnail">
                                        <img src="/assets/images/course/course-main/course-45.jpg" alt="Course" />
                                        <a onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }}
                                        className="video-play-btn video-popup-activation">
                                            <i className="icon-18"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="course-enroll-box">
                                    <div className="single-item">
                                        <h6 className="title">Current Status</h6>
                                        <span className="enroll-status">Not Enrolled</span>
                                    </div>
                                    <div className="single-item course-price">
                                        <h6 className="title">Price</h6>
                                        <span className="price">$70.00</span>
                                    </div>
                                    <div className="single-item">
                                        <h6 className="title">Get Started</h6>
                                        <a href="#" className="edu-btn btn-medium enroll-btn">Take This Course</a>
                                        <div className="login-btn">
                                            <span>or</span>
                                            <Link href="/sign-in">
                                                <a>Login</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="nav-tab-wrap">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Course</button>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="carriculam-tab" data-bs-toggle="tab" data-bs-target="#carriculam" type="button" role="tab" aria-controls="carriculam" aria-selected="false">Materials</button>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                            <div className="course-tab-content">
                                                <div className="course-overview">
                                                    <h3 className="heading-title">Course Description</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis aliquip commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsam.</p>

                                                    <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.</p>

                                                    <ul className="mb--50">
                                                        <li>No prior knowledge of Wordpress is required as everything will be covered in this course.</li>
                                                        <li>Basic HTML and CSS knowledge helps, but {"isn't"} a must-have</li>
                                                        <li>You {"don't"} need any coding experience at all. That is the beauty of Wordpress.</li>
                                                        <li>Basic JavaScript knowledge is required</li>
                                                    </ul>

                                                    <h5 className="title">Key Features</h5>
                                                    <ul>
                                                        <li>No prior knowledge of Wordpress is required as everything will be covered in this course.</li>
                                                        <li>Basic HTML and CSS knowledge helps, but {"isn't"} a must-have</li>
                                                        <li>Basic JavaScript knowledge is required</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="carriculam" role="tabpanel" aria-labelledby="carriculam-tab">
                                            <div className="course-tab-content">
                                                <div className="course-curriculam">
                                                    <div className="heading-title">
                                                        <h3 className="title">Course Content</h3>
                                                        <div className="expand-btn">
                                                            <button className="edu-btn btn-medium">Expand All <i className="icon-31"></i></button>
                                                        </div>
                                                    </div>

                                                    <div className="accordion edu-accordion" id="accordionExample">
                                                        <h4 className="heading-title">Introduction</h4>
                                                        <div className="accordion-item">
                                                            <h3 className="accordion-header" id="headingOne">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Lesson 1.1
                                                                <span className="expand">Expand</span>
                                                                </button>
                                                            </h3>

                                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <div className="course-lesson">
                                                                        <div className="reading-status">
                                                                            <h5 className="title"><i className="icon-65"></i> Lesson Content</h5>
                                                                            <span className="complete-text">
                                                                                <span>0% COMPLETE</span>
                                                                                <span>0/1 Steps</span>
                                                                            </span>
                                                                        </div>

                                                                        <ul>
                                                                            <li>Topic 1 – Grounding</li>
                                                                            <li>Topic 2 – Igniting</li>
                                                                            <li>Topic 3 – Awareness</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="accordion-item no-collapsed">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button">Lesson 1.2
                                                                </button>
                                                            </h2>
                                                        </div>

                                                        <div className="accordion-item no-collapsed">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button">Lesson 1.3
                                                                </button>
                                                            </h2>
                                                        </div>

                                                        <h4 className="heading-title">Section 2</h4>
                                                        <div className="accordion-item no-collapsed">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button">Lesson 2.1
                                                                </button>
                                                            </h2>
                                                        </div>

                                                        <div className="accordion-item no-collapsed">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button">Lesson 2.2
                                                                </button>
                                                            </h2>
                                                        </div>

                                                        <h4 className="heading-title">Section 3</h4>
                                                        <div className="accordion-item">
                                                            <h3 className="accordion-header" id="headingThree">
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                                    Lesson 3.1
                                                                    <span className="topics">3 Topics</span>
                                                                    <span className="expand">Expand</span>
                                                                </button>
                                                            </h3>
                                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <div className="course-lesson">
                                                                        <ul>
                                                                            <li>Topic 1 – Grounding</li>
                                                                            <li>Topic 2 – Igniting</li>
                                                                            <li>Topic 3 – Awareness</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="accordion-item no-collapsed">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button">Lesson 3.2
                                                                </button>
                                                            </h2>
                                                        </div>

                                                        <div className="accordion-item no-collapsed">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button">Lesson 3.3
                                                                </button>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {/* sidebar start */}
                            <DetailsSidebar />
                            {/* sidebar end */}
                        </div>
                    </div>
                </div>
            </section>

            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'PICj5tr9hcc'} />
            {/* video modal end */}
        </>
    )
}

export default CourseDetailsThree;