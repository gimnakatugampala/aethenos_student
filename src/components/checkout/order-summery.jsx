import React from 'react';
import { useSelector } from 'react-redux';
import useCartInfo from '../../hooks/use-cart-info';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const OrderSummery = ({showStripe,showPaypal}) => {
    const {cartCourses} = useSelector(state => state.cart);
    const {total} = useCartInfo();


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
                     
                {/* {showStripe && <a href="#" className="edu-btn order-place btn-medium w-100 my-2">Place Your order <i className="icon-4"></i></a>} */}
                {showStripe && <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>}
                
            </div>
        </div>
    )
}

export default OrderSummery;