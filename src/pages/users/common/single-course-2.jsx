import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../../redux/features/cart-slice';
import { add_to_wishlist, wishlistItems } from '../../../redux/features/wishlist-slice';

const SingleCourseTwo = ({ course }) => {
    const { id, img, title, level, rating, rating_count, course_price, lesson, student, duration, short_desc } = course || {};
    const {cartCourses} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const wishlists = useSelector(wishlistItems);
    const isWishlistSelected = wishlists.find(w => Number(w.id) === Number(id));

    const handleWishlist = (course_item) => {
        if (wishlists.find(i => i.id === course_item.id)) {
            dispatch(add_to_wishlist({
                    change_type: 'remove_wishlist', item: {
                    id: course_item.id,
                    img: `${course_item.img}`,
                    title: course_item.title,
                    price: course_item.course_price,
                    other_data:course_item
                }
            }))
        } else {
            dispatch(add_to_wishlist({
                    change_type: 'add_wishlist', item: {
                    id: course_item.id,
                    img: `${course_item.img}`,
                    title: course_item.title,
                    price: course_item.course_price,
                    other_data:course_item
                }
            }))
        }
    }

    // handle add to cart
    const handleAddToCart = (course) => {
        dispatch(cart_course({
            id:course.id,
            img:`${course.img}`,
            price:course.course_price,
            title:course.title,
            other_data:course
        }))
    }

    return (
        <div className="col-md-6 col-xl-3" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <div className="edu-course course-style-1 hover-button-bg-white">
                <div className="inner">
                    <div className="thumbnail">
                        <a href={`/course-details/${id}`} ><img src={`/assets/images/course/${img}`} alt="Course Meta" /></a>
                        <div className="time-top">
                            <span className="duration"><i className="icon-61"></i>{duration}</span>
                        </div>
                    </div>

                    <div className="content">
                        <span className="course-level">{level}</span>
                        <h6 className="title">
                            <a href="#">{title}</a>
                        </h6>

                        <div className="course-rating">
                            <div className="rating">
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                            </div>
                            <span className="rating-count">({rating} /{rating_count} Rating)</span>
                        </div>

                        <div className="course-price">${course_price}</div>

                        <ul className="course-meta">
                            <li><i className="icon-24"></i>{lesson} Lectures</li>
                            <li><i className="icon-25"></i>{student} Students</li>
                        </ul>
                    </div>
                </div>

                <div className="course-hover-content-wrapper">
                    <button onClick={() => handleWishlist(course)} className={`wishlist-btn ${isWishlistSelected ? 'active' : ''}`}><i className="icon-22"></i></button>
                </div>

                <div className="course-hover-content">
                    <div className="content">
                        <button onClick={() => handleWishlist(course)} className={`wishlist-btn ${isWishlistSelected ? 'active' : ''}`}>
                            <i className="icon-22"></i>
                        </button>

                        <span className="course-level">{level}</span>

                        <h6 className="title">
                            <a href={`/course-details/${id}`} >{title}</a>
                        </h6>

                        <div className="course-rating">
                            <div className="rating">
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                                <i className="icon-23"></i>
                            </div>
                            <span className="rating-count">({rating} /{rating_count} Rating)</span>
                        </div>

                        <div className="course-price">${course_price}</div>

                        <p>{short_desc}</p>

                        <ul className="course-meta">
                            <li><i className="icon-24"></i>{lesson} Lectures</li>
                            <li><i className="icon-25"></i>{student} Students</li>
                        </ul>

                        <a onClick={() => handleAddToCart(course)} className="edu-btn btn-secondary btn-small"
                        style={{ cursor: 'pointer' }}> 
                            {cartCourses.some(item => item.id === id) ? 'Remove from Cart' : 'Add to cart'} 
                            <i className="icon-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCourseTwo;