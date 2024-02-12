import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCartInfo from '../../hooks/use-cart-info';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { BuyCourseByStudent, IMG_HOST, VerfiyCheckoutUser } from '../../api';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map';
import Cookies from 'js-cookie';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const OrderSummery = ({showStripe,showPaypal}) => {
    const {cartCourses} = useSelector(state => state.cart);
    const {total} = useCartInfo();

    const [purchasedCourse, setPurchasedCourse] = useState([]);
    const [buyCourseOrder, setBuyCourseOrder] = useState(null);
    

// console.log(cartCourses)

const newPricing = cartCourses != null && cartCourses.map((course) => ({
    img: course.img,
    title:course.title,
    qty:course.quantity,
    desc:course.other_data.course_main_desc,
    currency:GetCurrencyByCountry(course.other_data).toLowerCase(),
    price:(CalculateDiscountedPrice(course.other_data)).toFixed(2)
}))


// console.log(newPricing)

    useEffect(() => {

        // Check The User Token
        VerfiyCheckoutUser()

        if(total != 0){

            const calculatedPurchasedCourse = cartCourses != null && cartCourses.map((course) => ({
            courseCode: course.other_data.course_code,
            currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
            itemPrice: course.quantity * (CalculateDiscountedPrice(course.other_data).toFixed(2))
            }));
    
            setPurchasedCourse(calculatedPurchasedCourse);
    
            const calculatedBuyCourseOrder = {
            "paymentMethod": "1",
            "discount": 20,
            "totalPrice": `${total}`,
            "currency": GetCurrencyByCountry(cartCourses[0].other_data).toLowerCase(),
            "courses": calculatedPurchasedCourse
            };
    
            setBuyCourseOrder(calculatedBuyCourseOrder);
            return
        }


    }, [cartCourses, total]);


    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');

          if(buyCourseOrder != null && total != 0){
              console.log(buyCourseOrder);
              console.log(JSON.stringify(buyCourseOrder));
             var rawData =  JSON.stringify(buyCourseOrder)
              BuyCourseByStudent(rawData)

              return
          }
          // Perform actions related to a successful purchase, accessing buyCourseOrder here
    
        }
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, [buyCourseOrder]);


      
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
                    <input type="hidden" name="cartCourses" value={JSON.stringify(newPricing)} />
                    
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