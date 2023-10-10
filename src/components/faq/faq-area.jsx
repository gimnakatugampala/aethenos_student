import React from 'react';
import SingleFaq from './single-faq';

function NavTab({ active = false, id, title }) {
    return (
        <li className="nav-item" role="presentation">
            <button className={`nav-link ${active ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target={`#${id}`}
            type="button" role="tab" aria-selected={active ? 'true' : 'false'}>{title}</button>
        </li>
    )
}

const FaqArea = () => {
    return (
        <section className="edu-section-gap faq-page-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="faq-page-nav">
                            <h3 className="title">Questions By This Category</h3>
                            <p>Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore.</p>

                            <ul className="nav nav-tabs" role="tablist">
                                <NavTab active={true} id="gn-ques" title="General Questions" />
                                <NavTab id="rg-ques" title="Regular Questions" />
                                <NavTab id="ad-ques" title="Advanced Questions" />
                                <NavTab id="com-policy" title="Company Policies" />
                                <NavTab id="pay-option" title="Payment Options" />
                                <NavTab id="terms-condition" title="Terms & Conditions" />
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tab-content faq-page-tab-content" id="faq-accordion">
                            <div className="tab-pane fade show active" id="gn-ques" role="tabpanel">
                                <div className="faq-accordion">
                                    <div className="accordion">
                                        <SingleFaq show={true} id="1" title="How can I contact a school directly?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="2" title="How do I find a school where I want to study?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="3" title=" Where should I study abroad?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="4" title="Where can I find information on private companies?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="5" title="How do I find a study abroad program?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="6" title="Am I eligible for admission?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="7" title="What kind of support does EduBlink provide?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="rg-ques" role="tabpanel">
                                <div className="faq-accordion">
                                    <div className="accordion">
                                        <SingleFaq show={true} id="8" title="How long is my personal free trial?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="9" title="How do I find a school where I want to study?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="10" title="Where should I study abroad?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="11" title="Where can I find information on private companies?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="12" title="How do I find a study abroad program?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="13" title="Am I eligible for admission?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="ad-ques" role="tabpanel">
                                <div className="faq-accordion">
                                    <div className="accordion">
                                        <SingleFaq show={true} id="14" title="Where can I find information on private companies?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="15" title="How do I find a study abroad program?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="16" title="Am I eligible for admission?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="17" title="What kind of support does EduBlink provide?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="com-policy" role="tabpanel">
                                <div className="faq-accordion">
                                    <div className="accordion">
                                        <SingleFaq show={true} id="18" title="How do I find a study abroad program?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="19" title="Where can I find information on private companies?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="20" title="What kind of support does EduBlink provide?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="21" title="Am I eligible for admission?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pay-option" role="tabpanel">
                                <div className="faq-accordion">
                                    <div className="accordion">
                                        <SingleFaq show={true} id="22" title="How do I find a school where I want to study?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="23" title=" Where should I study abroad?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="24" title="Where can I find information on private companies?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="25" title="How do I find a study abroad program?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="terms-condition" role="tabpanel">
                                <div className="faq-accordion">
                                    <div className="accordion">
                                        <SingleFaq show={true} id="26" title=" Where should I study abroad?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="27" title="How do I find a school where I want to study?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />

                                        <SingleFaq id="28" title="How do I find a study abroad program?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                        
                                        <SingleFaq id="29" title="Where can I find information on private companies?" desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco qui laboris nis aliquip commodo consequat." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqArea;