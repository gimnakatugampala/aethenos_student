import React from 'react';
import { useSelector } from 'react-redux';
import useCartInfo from '../../hooks/use-cart-info';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { IMG_HOST } from '../../api';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const OrderSummery = ({showStripe,showPaypal}) => {
    const {cartCourses} = useSelector(state => state.cart);
    const {total} = useCartInfo();
// console.log(cartCourses)

    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);

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
                                    <td><img className='mx-3 rounded' height={70} width={60} src={`${IMG_HOST}${item.other_data.img}`} />{item.title.substring(0,20)}... <span className="quantity">x {item.quantity}</span></td>
                                    <td>{getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))} {(item.quantity * (CalculateDiscountedPrice(item.other_data))).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="order-total">
                                <td>Order Total</td>
                                <td>{cartCourses.length > 0 && getSymbolFromCurrency(GetCurrencyByCountry(cartCourses[0].other_data))}{total}</td>
                            </tr>
                        </tbody>
                    </table>
                }

                {showPaypal && <PayPalScriptProvider options={{ clientId: "test" }}>
                            <PayPalButtons style={{ layout: "horizontal" }} />
                    </PayPalScriptProvider>}
                     
                {/* {showStripe && <a href="#" className="edu-btn order-place btn-medium w-100 my-2">Place Your order <i className="icon-4"></i></a>} */}
                {showStripe && <form action="/api/checkout_sessions" method="POST">
                    <section>
                        <button className="edu-btn order-place btn-medium w-100 my-2" type="submit" role="link">
                            <span className='d-flex justify-content-center align-items-center'>
                              Checkout via<i style={{fontSize:'30px'}} className="fa-brands fa-stripe mx-1"></i>
                            </span>
                        </button>
                    </section>
                    </form>}
                
            </div>
        </div>
    )
}

export default OrderSummery;