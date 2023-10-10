import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../redux/features/cart-slice';
import { add_to_wishlist, wishlistItems } from '../../redux/features/wishlist-slice';

const CourseTypeFour = ({ data, classes }) => {
    const {cartCourses} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const wishlists = useSelector(wishlistItems);
    const isWishlistSelected = wishlists.find(w => Number(w.id) === Number(data.id));

    const handleWishlist = (course_item) => {
        if (wishlists.find(i => i.id === course_item.id)) {
            dispatch(
                add_to_wishlist({
                    change_type: 'remove_wishlist', item: {
                    id: course_item.id,
                    img: `/assets/images/course/course-06/${course_item.img}`,
                    title: course_item.title,
                    price: course_item.course_price
                }
            }))
        } else {
            dispatch(
                add_to_wishlist({
                    change_type: 'add_wishlist', item: {
                    id: course_item.id,
                    img: `/assets/images/course/course-06/${course_item.img}`,
                    title: course_item.title,
                    price: course_item.course_price
                }
            }))
        }
    }

    // handle add to cart
    const handleAddToCart = (course) => {
        dispatch(cart_course({
            id:course.id,
            img:`/assets/images/course/course-06/${course.img}`,
            price:course.course_price,
            title:course.title
        }))
    }

    return (
        <div className={`edu-course course-style-5 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`}>
                        <a>
                            <img src={`/assets/images/course/course-04/${data.img}`} alt="Course Meta" />
                        </a>
                    </Link>
                </div>
                <div className="content">
                    <div className="course-price price-round">${Math.trunc(data.course_price)}</div>
                    <span className="course-level">{data.level}</span>
                    <h5 className="title">
                        <Link href={`/course-details/${data.id}`}>
                            <a>{data.title}</a>
                        </Link>
                    </h5>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({data.rating})</span>
                    </div>
                    <p>{data.short_desc}</p>
                    <ul className="course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                </div>
            </div>
            
            <div className="hover-content-aside">
                <div className="content">
                    <span className="course-level">{ data.category }</span>
                    <h5 className="title">
                        <n-link to="/course/course-details">{ data.title }</n-link>
                    </h5>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({ data.rating })</span>
                    </div>
                    <ul className="course-meta">
                        <li>{ data.lesson } { data.lesson + data.lesson > 1 ? 'Lessons' : 'Lesson' }</li>
                        <li>{ data.duration }</li>
                        <li>{ data.level }</li>
                    </ul>
                    <div className="course-feature">
                        <h6 className="title">What You’ll Learn?</h6>
                        <ul>
                            { 
                                data.features.slice(0, 3).map( (feature, featurekey) => <li key={ featurekey }>{ feature }</li> )
                            }
                        </ul>
                    </div>
                    <div className="button-group">
                        <a className="edu-btn btn-medium" onClick={()=> handleAddToCart(data)}
                        style={{cursor:'pointer'}}>
                            {cartCourses.some(item => item.id === data.id) ? 'Added to cart' : 'Add to cart'}
                            <i className="icon-4"></i>
                        </a>

                        <button onClick={() => handleWishlist(data)} className={`wishlist-btn btn-outline-dark ${isWishlistSelected ? 'active' : ''}`}>
                            <i className="icon-22"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseTypeFour;