import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cart_course, decrease_quantity, remove_cart_course } from '../../redux/features/cart-slice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const handleChange = (e) => {}
    return (
        <tr>
            <td className="product-remove" onClick={() => dispatch(remove_cart_course(item))}>
                <a style={{ cursor: 'pointer' }} className="remove-wishlist"><i className="icon-73"></i></a>
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

            <td className="product-quantity" data-title="Qty">
                <div className="pro-qty">
                    <span className="dec qtybtn" onClick={() => dispatch(decrease_quantity(item))}>-</span>
                    <input type="text" onChange={handleChange} value={item.quantity} />
                    <span className="inc qtybtn" onClick={() => dispatch(cart_course(item))}>+</span>
                </div>
            </td>
            
            <td className="product-subtotal" data-title="Subtotal">
                <span className="currency-symbol">$</span>{(item.quantity * item.price).toFixed(2)}
            </td>
        </tr>
    )
}

export default CartItem;