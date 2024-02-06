import React from 'react';
import { useSelector } from 'react-redux';
import useCartInfo from '../../hooks/use-cart-info';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderSummery = ({showStripe,showPaypal}) => {
    const {cartCourses} = useSelector(state => state.cart);
    const {total} = useCartInfo();
    return (
        <div className="order-summery checkout-summery">
            <div className="summery-table-wrap">
                <h4 className="title">Your Orders</h4>
                {cartCourses.length === 0 && 
                    <div className='mt-3'>
                        <h4>No cart items</h4>
                    </div>
                }

                {cartCourses.length > 0 &&
                    <table className="table summery-table">
                        <tbody>
                            {cartCourses.map((item,i) => (
                                <tr key={i}>
                                    <td>{item.title.substring(0,20)}... <span className="quantity">x {item.quantity}</span></td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                            <tr className="order-total">
                                <td>Order Total</td>
                                <td>${total}</td>
                            </tr>
                        </tbody>
                    </table>
                }

                {showPaypal && <PayPalScriptProvider options={{ clientId: "test" }}>
                            <PayPalButtons style={{ layout: "horizontal" }} />
                    </PayPalScriptProvider>}
                     
                {showStripe && <a href="#" className="edu-btn order-place btn-medium w-100 my-2">Place Your order <i className="icon-4"></i></a>}
                
            </div>
        </div>
    )
}

export default OrderSummery;