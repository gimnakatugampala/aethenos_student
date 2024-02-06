import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import useCartInfo from '../../../hooks/use-cart-info';
import { remove_cart_course } from '../../../redux/features/cart-slice';
import { IMG_HOST } from '../../../api';
import { useEffect } from 'react';
import CalculateDiscountedPrice from '../../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map'

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartCourses);
    const dispatch = useDispatch();
    const {total} = useCartInfo();

    // useEffect(() => {
    //   console.log(cartItems)
    // })
    
    
    return (
        <div className="edublink-header-mini-cart">
            {cartItems.length === 0 && 
                <div className="wrapper empty-cart-wrapper">
                    <h5 className="empty-cart">Your cart is empty</h5>
                </div>
            }
            {cartItems.length >= 1 && 
                <div className="wrapper">
                    <ul className={`items ${cartItems.length > 4 ? 'cart-height' : ''}`}>
                        {cartItems.map((item, index) => (
                            <li key={index} className="each-item">
                                <div className="thumb">
                                    <Link href={`/course-details/${item.other_data.course_code}`} legacyBehavior>

                                        <img src={`${IMG_HOST}${item.img}`} alt="course-thumb" />

                                    </Link>
                                </div>
                                <div className="content">
                                    <h5 className="title">
                                        <Link href={`/course-details/${item.other_data.course_code}`} legacyBehavior>

                                            {item.title}

                                        </Link>
                                    </h5>
                                    <div className="price-and-quantity">
                                        <span className="quantity">{item.quantity}</span>
                                        <span className="quantity-symbol">×</span>
                                        <span className="price">{getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))} {CalculateDiscountedPrice(item.other_data)}</span>
                                    </div>
                                </div>
                                <div className="cart-item-remove">
                                    <button onClick={() => dispatch(remove_cart_course(item))}>
                                        <i className="icon-73"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="total-price-wrapper">
                        <span className="total-text">Subtotal:</span>
                        <span className="total-amount">${parseFloat(total.toFixed(3))}</span>
                    </div>

                    <div className="cart-checkout-buttons">
                        <a href="/cart" className="edu-btn btn-small cart-btn">
                            View Cart
                        </a>

                        <a href="/checkout" className="edu-btn btn-small btn-secondary checkout-btn">
                            Checkout
                        </a>
                    </div>
                </div>
            }
        </div>
    );
}

export default Cart;