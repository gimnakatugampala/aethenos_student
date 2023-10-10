import React from 'react';

const ProductCommentForm = () => {
    return (
        <form className="comment-form">
            <div className="review-rating">
                <h6 className="title">Your Rating</h6>
                <div className="rating">
                    <i className="icon-star-empty"></i>
                    <i className="icon-star-empty"></i>
                    <i className="icon-star-empty"></i>
                    <i className="icon-star-empty"></i>
                    <i className="icon-star-empty"></i>
                </div>
            </div>
            
            <div className="row g-5">
                <div className="form-group col-12">
                    <label>Your Review</label>
                    <textarea name="comm-message" id="comm-message" cols="30" rows="5"></textarea>
                </div>

                <div className="form-group col-lg-6">
                    <label>Your Name</label>
                    <input type="text" name="comm-name" id="comm-name" />
                </div>

                <div className="form-group col-lg-6">
                    <label>Your Email</label>
                    <input type="email" name="comm-email" id="comm-email" />
                </div>

                <div className="form-group col-12">
                    <div className="edu-form-check">
                        <input type="checkbox" id="save-info" />
                        <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                    </div>
                </div>

                <div className="form-group col-12">
                    <button type="submit" className="edu-btn submit-btn">Submit Your Review <i className="icon-4"></i></button>
                </div>
            </div>
        </form>
    )
}

export default ProductCommentForm;