import React from 'react';
import useModal from '../../../hooks/use-modal';
import { Books } from '../../../svg';
import VideoModal from '../popup-modal/video-modal';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistItems , add_to_wishlist } from '../../../redux/features/wishlist-slice';
import { cart_course } from '../../../redux/features/cart-slice';
import { IMG_HOST } from '../../../api';
import CalculateDiscountedPrice from '../../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map'
import CalculateListPrice from '../../../functions/pricing/CalculateListPrice';
import CalculateDiscountPrice from '../../../functions/pricing/CalculateDiscountPrice';



const mainfs = {
    fontSize: '40px',
  };

const CourseDetailsSidebar = ({ course,details_2=false }) => {


    
    const {cartCourses} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const wishlists = useSelector(wishlistItems);
    const isWishlistSelected = wishlists.find(w => Number(w.id) == Number(course.id));
    

    const { img, certificate, videoId, course_price, instructor, duration, student, language } = course || {};
    const { isVideoOpen, setIsVideoOpen } = useModal();

    const handleWishlist = (course_item) => {
        if (wishlists.find(i => i.id === course_item.id)) {
            dispatch(
                add_to_wishlist({
                    change_type: 'remove_wishlist', item: {
                    id: course_item.id,
                    img: `${course_item.img}`,
                    title: course_item.title,
                    price: course_item.course_price
                }
            }))
        } else {
            dispatch(
                add_to_wishlist({
                    change_type: 'add_wishlist', item: {
                    id: course_item.id,
                    img: `${course_item.img}`,
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
            img:`${course.img}`,
            price:course.course_price,
            title:course.title
        }))
        console.log(course)
    }

    return (
        <>
            <div className={`course-sidebar-3 ${details_2?'':'sidebar-top-position'}`}>
                <div className="edu-course-widget widget-course-summery">
                    <div className="inner">
                        <div className="thumbnail">
                            <img src={`${IMG_HOST}${img}`} alt="Course Thumb" />
                            <a onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }} className="play-btn video-popup-activation">
                                <i className="icon-18"></i>
                            </a>
                        </div>
                        <div className="content">
                            {/* <h4 className="widget-title">Course Includes:</h4> */}

                            <div>
                                <span style={mainfs} className="value price fw-bolder">{getSymbolFromCurrency(GetCurrencyByCountry(course))}{CalculateDiscountedPrice(course)}</span>
                                <span className='text-decoration-line-through m-lg-2'> {getSymbolFromCurrency(GetCurrencyByCountry(course))}{CalculateListPrice(course)}</span>
                               {CalculateDiscountPrice(course) != "" && (<span className='m-lg-1 fw-semibold'>{CalculateDiscountPrice(course)} OFF</span>)} 
                            </div>
                         

                            <ul className="course-item">
                                {/* <li>
                                    <span className="label"><i className="icon-60"></i>Price:</span>
                                    <span className="value price">${course_price}</span>
                                </li> */}

                                <li>
                                    <span className="label"><i className="icon-62"></i>Articles</span>
                                    <span className="value">{course.articles_count}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-61"></i>No. Of Videos</span>
                                    <span className="value">{course.no_of_videos}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-61"></i>Downloadable Resources</span>
                                    <span className="value">{course.downloadable_resources_count}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-63"></i>Enrolled</span>
                                    <span className="value">{course.student} students</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-59"></i>Language</span>
                                    <span className="value">{course.language}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-64"></i>Certificate of completion</span>
                                    <span className="value text-uppercase">{course.certificate}</span>
                                </li>
                            </ul>

                            <div className="read-more-btn">
                                {/* <a href="/my-courses" className="edu-btn">Start Now <i className="icon-4"></i></a> */}
                                <a onClick={() => handleAddToCart(course)} className="edu-btn" style={{ cursor: 'pointer' }}> 
                                        {cartCourses.some(item => item.id == course.id) ? 'Added to cart' : 'Add to cart'} 
                                        <i className="icon-4"></i>
                                    </a>
                            </div>

                            <div className="share-area">
                                <h4 className="title">Share On:</h4>
                                <ul className="social-share">
                                    <li><a href="#"><i className="icon-facebook"></i></a></li>
                                    <li><a href="#"><i className="icon-twitter"></i></a></li>
                                    <li><a href="#"><i className="icon-linkedin2"></i></a></li>
                                    <li><a href="#"><i className="icon-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={videoId} />
            {/* video modal end */}
        </>
    )
}

export default CourseDetailsSidebar;