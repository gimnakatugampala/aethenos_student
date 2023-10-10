import React from 'react';
import { Books } from '../../svg';

const DetailsSidebar = () => {
    return (
        <div className="course-sidebar-3">
            <div className="edu-course-widget widget-course-summery">
                <div className="inner">
                    <div className="content">
                        <h4 className="widget-title">Course Includes:</h4>
                        <ul className="course-item">
                            <li>
                                <span className="label"><i className="icon-60"></i>Price:</span>
                                <span className="value price">$70.00</span>
                            </li>
                            <li>
                                <span className="label"><i className="icon-62"></i>Instrutor:</span>
                                <span className="value">Edward Norton</span>
                            </li>
                            <li>
                                <span className="label"><i className="icon-61"></i>Duration:</span>
                                <span className="value">3 weeks</span>
                            </li>
                            <li>
                                <span className="label"><Books />Lessons:</span>
                                <span className="value">8</span>
                            </li>
                            <li>
                                <span className="label"><i className="icon-63"></i>Enrolled:</span>
                                <span className="value">65 students</span>
                            </li>
                            <li>
                                <span className="label"><i className="icon-59"></i>Language:</span>
                                <span className="value">English</span>
                            </li>
                            <li>
                                <span className="label"><i className="icon-64"></i>Certificate:</span>
                                <span className="value">Yes</span>
                            </li>
                        </ul>

                        <div className="read-more-btn">
                            <a href="#" className="edu-btn">Start Now <i className="icon-4"></i></a>
                        </div>

                        <div className="share-area">
                            <h4 className="title">Share On:</h4>
                            <ul className="social-share">
                                <li><a href="#"><i className="icon-facebook"></i></a></li>
                                <li><a href="#"><i className="icon-twitter"></i></a></li>
                                <li><a href="#"><i className="icon-linkedin2"></i></a></li>
                                <li><a href="#"><i className="icon-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsSidebar;