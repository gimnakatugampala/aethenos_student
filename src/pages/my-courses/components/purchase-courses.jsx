import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../../redux/features/cart-slice';
import { add_to_wishlist, wishlistItems } from '../../../redux/features/wishlist-slice';
import Colors from '../../../contexts/Colors';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { GetMyCourses } from '../../../api';


const CourseTypeFive = ({ data, classes }) => {
    const {cartCourses} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const wishlists = useSelector(wishlistItems);
    const isWishlistSelected = wishlists.find(w => Number(w.id) === Number(data.id));

 useEffect(() => {
    GetMyCourses()
 }, [])
 

    return (
        <div className={`edu-course course-style-4 course-style-8 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-content/${data && data.id}`} legacyBehavior>

                        <img width={250} height={200} className='cover-img rounded' src={`https://www.courselounge.com/wp-content/uploads/best-udemy-courses-online.png`} alt="Course Thumb" />
                    </Link>
                </div>

                <div className="content">

                    <h5 className="title m-0">
                        <a href={`/my-courses/123`} >{data && data.title}</a>
                    </h5>

                    <p style={{fontSize:'13px'}} className='m-0'>Gimna Katugampala</p>

                    <a href={`/my-courses/123`} className='edu-btn btn-small my-3'>Start Course</a>


        
                    {/* <ul className="course-meta">
                        <li>  <i className="icon-24"></i>
                         {data && data.lesson} Lessons Completed
                        </li>
                        <li>

                        <i className="icon-24"></i>
                            {data && data.student} Lessons 
                        </li>
                    </ul> */}

                    <div className="progress">
                        <div className="progress-bar"  role="progressbar"  style={{width:`${'20'}%`,  background: Colors.PrimaryColor }} aria-valuenow={'100'} 
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
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