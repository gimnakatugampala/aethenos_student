import React from 'react';
import SidebarOne from '../common/sidebar/blog-sidebar-1';

const PurchaseArea = () => {
    return (
        <section className="privacy-policy-area purchase-guide-area dfdfd">
            <div className="container">
                <div className="row row--30">
                    <div className="col-lg-8">
                        <div className="privacy-policy purchase-guide">
                            <div className="text-block">
                                <h3 className="title">Purchase Currency</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis aliquip commodo consequat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat. </p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Account Registering</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <ul>
                                            <li>Name (required)</li>
                                            <li>Age (required)</li>
                                            <li>Date of birth (required)</li>
                                            <li>Passport/ ID no. (required)</li>
                                            <li>Current career (required)</li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-6">
                                        <ul>
                                            <li>Mobile phone numbers (required)</li>
                                            <li>Email address (required)</li>
                                            <li>Hobbies & interests (optional)</li>
                                            <li>Social profiles (optional)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="text-block">
                                <h4 className="title">How to Purchase a Course?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis aliquip commodo consequat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Accepted Credit Cards</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul>
                                    <li>Visa</li>
                                    <li>Mastercards</li>
                                    <li>American Express</li>
                                    <li>Discover</li>
                                </ul>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Why to Buy Our Course?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul>
                                    <li>Updated content on a regular basis</li>
                                    <li>Secure & hassle-free payment</li>
                                    <li>1-click checkout</li>
                                    <li>Easy access & smart user dashboard</li>
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

export default PurchaseArea;