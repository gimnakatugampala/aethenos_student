import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clear_cart } from '../../redux/features/cart-slice';
import CartItem from './cart-item';
import OrderSummery from './order-summery';
import { useRouter } from 'next/router';
import { ValidateCouponOnCart } from '../../api';
import ErrorAlert from '../../functions/Alert/ErrorAlert';

const CartArea = () => {
    const { cartCourses } = useSelector(state => state.cart);
    const [coupon, setcoupon] = useState("")

    const [couponEmpty, setcouponEmpty] = useState(false)
    const [couponError, setcouponError] = useState(false)

    const [CouponErrorText, setCouponErrorText] = useState("")

    const dispatch = useDispatch();
    const router = useRouter();
    const handleReturnToCourses = () => {       
        router.back();
    };

    // Handle Coupons
    const handleCouponSubmit = () => {
        console.log(coupon)
        if(coupon == ""){
            // ErrorAlert("Error","Please Enter Coupon")
            setcouponEmpty(true)
            return
        }
        ValidateCouponOnCart(coupon,setcouponError,setCouponErrorText)
        setcouponEmpty(false)
    }

    return (
        <section className="cart-page-area edu-section-gap">
            {cartCourses.length === 0 && 
                <div className="container py-5">
                    <h3>No Cart Items</h3>
                    <div className="update-btn">
                    <a style={{ cursor: 'pointer' }} onClick={handleReturnToCourses} className="edu-btn btn-border btn-medium disabled">
                            Return to Courses
                        </a>
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
                            <input value={coupon} onChange={(e) => setcoupon((e.target.value).toUpperCase())} placeholder="Coupon code..." type="text" />
                            <button onClick={handleCouponSubmit} type="submit" className="submit-btn"><i className="icon-4"></i></button>
                        </div>
                        <div className="update-btn">
                            <a style={{ cursor: 'pointer' }} onClick={() => dispatch(clear_cart())} className="edu-btn btn-border btn-medium disabled">Clear Cart
                                <i className="icon-4"></i>
                            </a>
                        </div>
                    </div>
                    {couponEmpty && <p className='text-danger m-0 p-0'>Please Enter Coupon Code</p>}
                    {couponError && <span className='text-danger m-0 p-0'>{CouponErrorText}</span>}
                    


                    <div className="row">
                        <div className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
                            <OrderSummery/>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}

export default CartArea;