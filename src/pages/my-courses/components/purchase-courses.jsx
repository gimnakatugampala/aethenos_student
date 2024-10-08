import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../../redux/features/cart-slice';
import { add_to_wishlist, wishlistItems } from '../../../redux/features/wishlist-slice';
import Colors from '../../../contexts/Colors';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { IMG_HOST } from '../../../api';
import { Progress } from 'semantic-ui-react'
import ProgressBar from 'react-bootstrap/ProgressBar';




const CourseTypeFive = ({ data, classes }) => {
    const {cartCourses} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const wishlists = useSelector(wishlistItems);
    const isWishlistSelected = wishlists.find(w => Number(w.id) === Number(data.id));

useEffect(() => {

    console.log(data)

}, [data])


    return (
        <div className={`edu-course course-style-4 course-style-8 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/my-courses/${data && data.item_code}`} legacyBehavior>
                        <img width={200} className='cover-img rounded' src={`${IMG_HOST}${data && data.img}`} alt={data && data.title} />
                    </Link>
                </div>

                <div className="content">
                    <p className="title m-0">
                        <a href={`/my-courses/${data && data.item_code}`} >{data && data.title}</a>
                    </p>

                    <p style={{fontSize:'13px'}} className='m-0'>{data && data.instructor}</p>

                    {data && (
                        data.progressValue == 0 && (
                            <a href={`/my-courses/${data && data.item_code}`} className='edu-btn btn-small my-3'>Start Course</a>
                        )
                    )}

                    {data && (
                         data.progressValue == 100 && (
                            <a href={`/my-courses/${data && data.item_code}`} className='edu-btn btn-small my-3'>Retake Course</a>
                        )
                    )}

                    {data && (
                        data.progressValue < 100 && data.progressValue > 0  && (
                            <a href={`/my-courses/${data && data.item_code}`} className='edu-btn btn-small my-3'>Continue Course</a>
                        )
                    )}

                    {data && (

                        Number.parseInt(data.progressValue) == 100 ? (

                        <ProgressBar variant="success" now={data && Number.parseInt(data.progressValue)} label={`${data && Number.parseInt(data.progressValue)}%`} />
                        ) : (
                        <ProgressBar variant="danger" now={data && Number.parseInt(data.progressValue)} label={`${data && Number.parseInt(data.progressValue)}%`} />
                        )

                        
                    )}    

                </div>
            </div>
        </div>
    );
}

export default CourseTypeFive;