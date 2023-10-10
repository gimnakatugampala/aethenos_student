import React from 'react';
import SidebarOne from '../common/sidebar/blog-sidebar-1';

const ConditionArea = () => {
  return (
        <section className="privacy-policy-area terms-condition-area">
            <div className="container">
                <div className="row row--30">
                    <div className="col-lg-8">
                        <div className="privacy-policy terms-condition">
                            <div className="text-block">
                                <h3 className="title">Definitions of Basic Terms, Rights and Restriction:</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. </p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Basic Terms</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis aliquip commodo consequat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat. </p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Rights & Restrictions</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul>
                                    <li>Members must be at least 18 years of age.</li>
                                    <li>Members are granted a time-limited, non-exclusive, revocable, nontransferable, and non-sublicenseable right to access that portion of the online course corresponding to the purchase.</li>
                                    <li>The portion of the online course corresponding to the purchase will be available to the Member as long as the course is maintained by the Company, which will be a minimum of one year after Member’s purchase.</li>
                                    <li>The videos in the course are provided as a video stream and are not downloadable.</li>
                                    <li>By agreeing to grant such access, the Company does not obligate itself to maintain the course, or to maintain it in its present form. </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <SidebarOne />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ConditionArea;