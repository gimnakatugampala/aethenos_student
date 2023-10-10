import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clear_cart } from '../../redux/features/cart-slice';
import CartItem from './cart-item';
import OrderSummery from './order-summery';

const CartArea = () => {
    const { cartCourses } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <section className="cart-page-area edu-section-gap">
            {cartCourses.length === 0 && 
                <div className="container py-5">
                    <h3>No Cart Items</h3>
                    <div className="update-btn">
                        <Link href="/course-style-1">
                            <a className="edu-btn btn-border btn-medium disabled">
                                Return to Courses
                            </a>
                        </Link>
                    </div>
                </div>
            }
            {cartCourses.length > 0 && 
                <div className="container">
                    <div className="table-responsive">
                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th scope="col" className="product-remove"></th>
                                    <th scope="col" className="product-thumbnail"></th>
                                    <th scope="col" className="product-title">Product Name</th>
                                    <th scope="col" className="product-price">Price</th>
                                    <th scope="col" className="product-quantity">Quantity</th>
                                    <th scope="col" className="product-subtotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartCourses.map((item, i) => <CartItem key={i} item={item} />)}
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-update-btn-area">
                        <div className="input-group product-cupon">
                            <input placeholder="Coupon code..." type="text" />
                            <button type="submit" className="submit-btn"><i className="icon-4"></i></button>
                        </div>
                        <div className="update-btn">
                            <a style={{ cursor: 'pointer' }} onClick={() => dispatch(clear_cart())} className="edu-btn btn-border btn-medium disabled">Clear Cart
                                <i className="icon-4"></i>
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
                            <OrderSummery/>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default CartArea;