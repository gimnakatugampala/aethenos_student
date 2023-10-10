import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../redux/features/cart-slice';
import { remove_wishlist_product } from '../../redux/features/wishlist-slice';

const SingleWishlist = ({ item }) => {
    const dispatch = useDispatch();
    const {cartCourses} = useSelector(state => state.cart);
    // handle add to cart
    const handleAddToCart = (course) => {
        dispatch(cart_course(course))
    }

    return (
        <tr>
            <td className="product-remove">
                <a style={{ cursor: 'pointer' }} onClick={() => dispatch(remove_wishlist_product(item))}
                className="remove-wishlist">
                    <i className="icon-73"></i>
                </a>
            </td>
            <td className="product-thumbnail">
                <Link href={`/course-details/${item.id}`}>
                <a>
                    <img src={item.img} alt="Books" />
                </a>
                </Link>
            </td>
            <td className="product-title">
                <Link href={`/course-details/${item.id}`}>
                    <a>{item.title}</a>
                </Link>
            </td>
            <td className="product-price" data-title="Price">
                <span className="currency-symbol">$</span>{item.price}
            </td>
            <td className="product-status" data-title="Stock"> In Stock</td>
            <td className="product-add-cart" onClick={() => handleAddToCart(item)}>
                <a style={{ cursor: 'pointer' }} className="edu-btn btn-medium">
                    {cartCourses.some(course => course.id === item.id) ? 'Added to cart' : 'Add to cart'}
                </a>
            </td>
        </tr>
    )
}

export default SingleWishlist;