import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { get_cart_courses } from '../redux/features/cart-slice';
import { get_wishlist_products } from '../redux/features/wishlist-slice';
import ScrollToTop from '../ui/scroll-to-top';

export default function Wrapper({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_wishlist_products());
        dispatch(get_cart_courses());
    }, [dispatch]);

    return (
        <>
            {children}
            <ScrollToTop />
            <ToastContainer />
        </>
    )
}
