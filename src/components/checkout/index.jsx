import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../../layout';
import BreadcrumbThree from '../breadcrumb/breadcrumb-3';
import CheckoutArea from './checkout-area';
import { GetCoursesOfSignedInUser } from '../../api';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import LargeLoading from '../../functions/Loading/LargeLoading';


const index = () => {

    const {cartCourses} = useSelector(state => state.cart);
    const [currentUserCourses, setcurrentUserCourses] = useState([])
    const [isLoading, setisLoading] = useState(true)


    useEffect(() => {
        // Fetch courses of the signed-in user
        GetCoursesOfSignedInUser(setcurrentUserCourses,setisLoading);
    }, []);

    useEffect(() => {
        // Check for duplicate course IDs between cartCourses and currentUserCourses
        const purchasedCourseIds = currentUserCourses.map(course => course.id);
    
        // Find matching courses
        const matchingCourses = cartCourses.filter(course => purchasedCourseIds.includes(course.id));
    
        if (matchingCourses.length > 0) {
            // Extract the titles of matching courses and format them as an HTML list
            const matchingCourseList = matchingCourses
                .map(course => `<li style="margin-bottom: 8px;">📌 ${course.title}</li>`)
                .join('');
    
            Swal.fire({
                title: '<h3 style="color: #d9534f;">Already Purchased Courses</h3>',
                html: `
                    <p style="font-size: 1.1em; color: #333;">The following courses in your cart have already been purchased:</p>
                    <ul style="list-style-type: none; padding: 0; color: #333; font-size: 1em;">
                        ${matchingCourseList}
                    </ul>
                    <p style="font-size: 1.1em; color: #333; margin-top: 10px;">Please go to your cart and remove them.</p>
                `,
                icon: 'warning',
                iconColor: '#d9534f',
                confirmButtonText: '<span style="padding: 5px 10px;">🛒 Go to Cart</span>',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal-popup',
                    confirmButton: 'swal-confirm-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to the cart page
                    window.location.href = '/cart';
                }
            });
        }
    }, [currentUserCourses]); // Re-run if cartCourses or currentUserCourses change

    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                {/* <BreadcrumbThree title="Checkout Page" subtitle="Checkout" /> */}
                {isLoading ? (
                    <LargeLoading />
                ) : (
                    <CheckoutArea/>
                )}
             <Footer />
            </div>
        </div>
    )
}

export default index;