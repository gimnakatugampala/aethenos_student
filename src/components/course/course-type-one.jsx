import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../redux/features/cart-slice';
import { add_to_wishlist, wishlistItems } from '../../redux/features/wishlist-slice';
import StarsRating from 'stars-rating'
import { IMG_HOST } from '../../api';
import CalculateListPrice from '../../functions/pricing/CalculateListPrice';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map'
import CalculateDiscountPrice from '../../functions/pricing/CalculateDiscountPrice';

const CourseTypeOne = ({ data, classes, image_location_path='01' }) => {
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
                    img: `${course_item.img}`,
                    title: course_item.title,
                    price: course_item.course_price,
                    other_data:course_item
                }
            }))
        } else {
            dispatch(
                add_to_wishlist({
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

    useEffect(() => {
        // CalculateListPrice(data)
        // CalculateDiscountedPrice(data)
        // GetCurrencyByCountry(data)
        // CalculateDiscountPrice(data)
        // console.log(data)
    },[data])
    

    return (
        <div className={`edu-course course-style-1 ${ classes ? classes : '' } hover-button-bg-white h-100`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.course_code}`} legacyBehavior>
                        {data.img == "" || data.img == null || data.img.includes("https://") ? 
                        <img style={{width:'100%',objectFit:'cover'}} src={`/images/course/aethenos_course_img.jpg`} alt={data.title} /> :  
                        <img style={{width:'100%',objectFit:'cover'}} src={`${IMG_HOST}${data.img}`} alt={data.title} />}
                       
                    </Link>
                    {CalculateDiscountPrice(data) != "" && (
                    <div className="time-top">
                        <span className="duration" style={{background:'#e01D20'}}>{CalculateDiscountPrice(data)} OFF</span>
                    </div>
                    )}
                </div>
                <div className="content">
                    <span className="course-level">{data.level}</span>
                    <p className="title m-0 p-0">
                        <b>
                            <a href={`/course-details/${data.course_code}`}>{data.title.length > 60 ? data.title.substring(0, 60) + '...' : data.title}</a>
                        </b>
                    </p>
                    <p style={{fontSize:'12px'}} className='m-0 p-0'>{data.instructor}</p>
                    <div className="course-rating">
                        <div className="rating">
                            <StarsRating
                                count={5}
                                size={24}
                                value={3.5}
                                color1={'gray'}
                                color2={'#F39C12'} />
                        </div>
                        <span className="rating-count ml-4"><b>{Number.parseFloat(data.rating).toFixed(1)}</b></span>
                    </div>
                    <div className='d-flex'>
                    <div className="course-price discounted-price m-1"><b>{getSymbolFromCurrency(GetCurrencyByCountry(data))}{CalculateDiscountedPrice(data)}</b></div>
                    <div className="course-price text-decoration-line-through m-2">{getSymbolFromCurrency(GetCurrencyByCountry(data))}{CalculateListPrice(data)}</div>
                    
                    </div>
                    <ul className="d-flex course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                </div>
            </div>

            <div className="course-hover-content-wrapper">
                <button onClick={() => handleWishlist(data)} className={`wishlist-btn ${isWishlistSelected ? 'active' : ''}`}><i className="icon-22"></i></button>
            </div>
            
            <div className="course-hover-content">
                <div className="content">
                    <button onClick={() => handleWishlist(data)} className={`wishlist-btn ${isWishlistSelected ? 'active' : ''}`}>
                        <i className="icon-22"></i>
                    </button>
                    <span className="course-level">{data.level}</span>
                        <h6 className="title">
                            <b>
                                <a href={`/course-details/${data.course_code}`}>{data.title.length > 60 ? data.title.substring(0, 60) + '...' : data.title}</a>
                            </b>
                        </h6>
                    <div className="course-rating">
                        <div className="rating">
                                <StarsRating
                                count={5}
                                size={24}
                                value={3.5}
                                color1={'gray'}
                                color2={'#F39C12'} />
                        </div>
                        <span className="rating-count ml-4"><b>{Number.parseFloat(data.rating).toFixed(1)}</b></span>
                    </div>

                    <div className='d-flex'>
                    <div className="course-price discounted-price m-1"><b>{getSymbolFromCurrency(GetCurrencyByCountry(data))}{CalculateDiscountedPrice(data)}</b></div>
                    <div className="course-price text-decoration-line-through m-2">{getSymbolFromCurrency(GetCurrencyByCountry(data))}{CalculateListPrice(data)}</div>
                    </div>

                    <p>{data.curriculum_desc.length > 60 ? data.curriculum_desc.substring(0, 60) + '...' : data.curriculum_desc}</p>
                    <ul className="d-flex course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                    <a onClick={() => handleAddToCart(data)} className="edu-btn btn-secondary btn-small" style={{ cursor: 'pointer' }}> 
                        {cartCourses.some(item => item.id === data.id) ? 'Added to cart' : 'Add to cart'} 
                        <i className="icon-4"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CourseTypeOne;