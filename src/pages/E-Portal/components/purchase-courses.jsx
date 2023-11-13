import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../../redux/features/cart-slice';
import { add_to_wishlist, wishlistItems } from '../../../redux/features/wishlist-slice';
import Colors from '../../../contexts/Colors';
import Button from 'react-bootstrap/Button';


const CourseTypeFive = ({ data, classes }) => {
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
        <div className={`edu-course course-style-4 course-style-8 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <a href={`/course-content/${data?.data.id}`} ><img width={200} height={200} className='cover-img' src={`https://www.courselounge.com/wp-content/uploads/best-udemy-courses-online.png`} alt="Course Thumb" /></a>
                    {/* <div className="time-top">
                        <span className="duration">
                            <i className="icon-61"></i>
                            {data.duration}
                        </span>
                    </div> */}
                </div>

                <div className="content">
                    {/* <div className="course-price">
                        ${course_price}
                    </div> */}

                    <h5 className="title mb-5">
                        <a href={`/e-portal/course-content`} >{data?.data.title}</a>
                    </h5>

                    {/* <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">
                            ({data.rating} /{data.rating_count}{" "} Rating)
                        </span>
                    </div> */}

                    {/* <p>{data.short_desc}</p> */}

                    <div className="progress" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <div className="progress-bar"  role="progressbar"  style={{width:`${'20'}%`,  background: Colors.PrimaryColor }} aria-valuenow={'100'} 
                        aria-valuemin="0" aria-valuemax="100"></div>
                 </div>

                    <ul className="course-meta">
                        <li>  <i className="icon-24"></i>
                         
                         {data?.data.lesson} Lessons Completed
                          
                        </li>
                    
                        <li>
                        <i className="icon-24"></i>
                            {data?.data.student} Lessons 
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className="hover-content-aside">
                <div className="content">
                    <span className="course-level">
                        {data.level}
                    </span>

                    <h5 className="title">
                        <Link href={`/course-details/${data.id}`}>
                            {data.title}
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
                        <span className="rating-count">
                            ({data.rating})
                        </span>
                    </div>

                    <ul className="course-meta">
                        <li>{data.lesson} Lessons</li>
                        <li>{data.duration}</li>
                        <li>{data.level}</li>
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
                        <a onClick={() => handleAddToCart(data)} style={{ cursor: "pointer" }} className="edu-btn btn-medium">
                            {
                                cartCourses.some(
                                    (course) =>
                                    course.id === data.id
                                )
                                ? "Added to cart"
                                : "Add to cart"
                            }
                        </a>
                        <button onClick={() => handleWishlist(data)} style={{ cursor: "pointer" }} className={`btn-outline-dark wishlist-btn ${isWishlistSelected ? 'active' : ''}`}><i className="icon-22"></i></button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default CourseTypeFive;