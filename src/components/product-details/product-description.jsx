import React from 'react';
import ProductCommentForm from '../forms/product-comment-form';

const ProductDescription = ({item}) => {
    return (
        <div className="edu-product-description gap-bottom-equal">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="product-description-nav nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc" type="button" role="tab" aria-controls="desc" aria-selected="true">Description</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="false">Reviews (1)</button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="product-description-content tab-pane fade show active" id="desc" role="tabpanel" aria-labelledby="desc-tab">
                                <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.enim ad minim veniam quis nostrud exercita mco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur consequuntur magni dolores.</p>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
                            </div>

                            <div className="product-description-content tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                <div className="comment-area">
                                    <h5 className="heading-title">1 Review for The King of Drugs</h5>
                                    <div className="comment-list-wrapper">
                                        <div className="comment">
                                            <div className="thumbnail">
                                                <img src="/assets/images/blog/comment-03.jpg" alt="Comment Images" />
                                            </div>

                                            <div className="comment-content">
                                                <h6 className="title">Edward Norton - <span className="date">Oct 10, 2021</span></h6>
                                                <div className="rating">
                                                    <i className="icon-23"></i>
                                                    <i className="icon-23"></i>
                                                    <i className="icon-23"></i>
                                                    <i className="icon-23"></i>
                                                    <i className="icon-23"></i>
                                                </div>
                                                <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim est laborum. Sed perspiciatis unde omnis natus error sit voluptatem accusa dolore mque laudant totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi arch tecto beatae vitae dicta.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="comment-form-area">
                                    <h5 className="heading-title">Be First to Add a Review</h5>
                                    <ProductCommentForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription;