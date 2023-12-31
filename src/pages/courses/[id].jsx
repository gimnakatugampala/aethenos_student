import React from 'react'
import { useRouter } from 'next/router';
import { Footer, Header, Wrapper } from "../../layout";

import SEO from "../../components/seo";


const GetCourseByCategory = () => {

    const router = useRouter();
    const { id } = router.query;

  return (
    <Wrapper>
        <SEO pageTitle={"Marketing"} />
        <Header/>

        <section className="edu-section-gap course-details-area">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4">
                        <div className="course-details-content">

                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview"
                                    type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="carriculam-tab" data-bs-toggle="tab" data-bs-target="#carriculam"
                                    type="button" role="tab" aria-controls="carriculam" aria-selected="false">Carriculam</button>
                                </li>
                           
                            
                            </ul>

                          
                        </div>
                    </div>

                    <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                    <div className="course-tab-content">
                                        <div className="course-overview">
                                            <h3 className="heading-title">Course Description</h3>
                                            <p>d</p>
                                            <p className="mb--60">f</p>
                                            <h5 className="title">What You’ll Learn?</h5>
                                           
                                        </div>
                                    </div>
                                </div>

                           

                                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                    <div className="course-tab-content">

                                        <div className="course-review">
                                            <h3 className="heading-title">Course Rating</h3>
                                            <p>4 average rating based on 4 rating</p>
                                            <div className="row g-0 align-items-center">
                                                <div className="col-sm-4">
                                                    <div className="rating-box">
                                                        <div className="rating-number">5</div>
                                                        <div className="rating">
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                            <i className="icon-23"></i>
                                                        </div>
                                                        <span>(4 Review)</span>
                                                    </div>
                                                </div>
                                           
                                            </div>

                                          
                                            <div className="comment-form-area">
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