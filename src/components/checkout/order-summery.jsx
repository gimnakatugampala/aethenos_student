"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useCartInfo from '../../hooks/use-cart-info';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { BuyCourseByStudent, IMG_HOST, ValidateCouponOnCart, VerfiyCheckoutUser } from '../../api';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import getSymbolFromCurrency from 'currency-symbol-map';
import Cookies from 'js-cookie';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { reactLocalStorage } from 'reactjs-localstorage';



const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const COUNTRY = Cookies.get('aethenos_user_origin')

const OrderSummery = ({showStripe,showPaypal}) => {
    const {cartCourses} = useSelector(state => state.cart);
    const {total} = useCartInfo();
    const router = useRouter();
    const [purchasedCourse, setPurchasedCourse] = useState([]);
    const [buyCourseOrder, setBuyCourseOrder] = useState(null);
    const [tags, setTags] = useState([]);
    const [btnLoading, setbtnLoading] = useState(false)
    

    const [coupon, setcoupon] = useState("")

    const [couponEmpty, setcouponEmpty] = useState(false)
    const [couponError, setcouponError] = useState(false)

    const [CouponErrorText, setCouponErrorText] = useState("")

    // -------------------------------------
    const [couponValue, setcouponValue] = useState([]);

    useEffect(() => {  
        if(window.location.pathname.includes('/checkout')){
            const storedCoupons = reactLocalStorage.get('coupons');
            if (storedCoupons !== null) {
                setcouponValue(storedCoupons != null ? JSON.parse(storedCoupons) : []);
            }
        }         

    }, [couponValue]); 
    // -------------------------------------
    

// console.log(cartCourses)

const newPricing = cartCourses != null && cartCourses.map((course) => {
    const coupon = couponValue.find(coupon => coupon.id === course.id);
    const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
    const discountedPrice = coupon 
        ? (coupon.couponType === 1 
            ? 0 // Free coupon
            : Math.max(originalPrice - (coupon.global_discount_price || 0), 0) // Apply global discount
        ) 
        : originalPrice;

    return {
        img: course.img,
        title: course.title,
        qty: 1,
        desc: course.other_data.course_main_desc,
        currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
        price: discountedPrice.toFixed(2)
    };
});



// Items For Paypal
const PaypalItems = cartCourses != null && cartCourses.map((course) => ({
    name:course.title,
    description:"Test Course Description",
    quantity:1,
    unit_amount:{
        currency_code:GetCurrencyByCountry(course.other_data),
        value:(CalculateDiscountedPrice(course.other_data)) == null ? 0 : (CalculateDiscountedPrice(course.other_data))
    }
}))


// console.log(newPricing)

    useEffect(() => {

        // console.log(total)

        // Check The User Token
        VerfiyCheckoutUser()


        if(JSON.parse(window.localStorage.getItem('cart_items')) == null || JSON.parse(window.localStorage.getItem('cart_items')).length == 0){
            router.push('/cart');
            return
        }

        if (total !== 0) {
            const calculatedPurchasedCourse = cartCourses.map((course) => {
                const coupon = couponValue.find(coupon => coupon.id === course.id);
                const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
                const discountedPrice = coupon 
                    ? (coupon.couponType === 1 
                        ? 0 // Free coupon
                        : Math.max(originalPrice - (coupon.global_discount_price || 0), 0) // Apply global discount
                    ) 
                    : originalPrice;

                return {
                    courseCode: course.other_data.course_code,
                    currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
                    itemPrice: discountedPrice.toFixed(2)
                };
            });

            // Determine courseType and calculate discount
            let courseType = 1;
            let discount = 0;

            if (couponValue.length > 0) {
                courseType = 3;
                discount = cartCourses.reduce((acc, course) => {
                    const coupon = couponValue.find(coupon => coupon.id === course.id);
                    const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
                    if (coupon) {
                        if (coupon.couponType === 1) {
                            acc += originalPrice; // Full discount
                        } else {
                            acc += coupon.global_discount_price || 0; // Apply global discount
                        }
                    }
                    return acc;
                }, 0);
            }

            let existingData = JSON.parse(localStorage.getItem('aethenos_referral_codes')) || [];
            if (existingData.some(data => 
                calculatedPurchasedCourse.some(course => course.courseCode === data.courseCode)
            )) {
                courseType = 4;
            }

            const calculatedBuyCourseOrder = {
            "paymentMethod": "1",
            "discount": discount,
            "totalPrice": `${total}`,
            "currency": GetCurrencyByCountry(cartCourses[0].other_data).toLowerCase(),
            "country": JSON.parse(COUNTRY).country_name,
            "courseType": courseType,
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
            //   console.log(JSON.stringify(buyCourseOrder));
             var rawData =  JSON.stringify(buyCourseOrder)
              BuyCourseByStudent(rawData,router,buyCourseOrder)
              return
          }

    
    
        }
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, [buyCourseOrder]);

       // Handle Coupons
    const handleCouponSubmit = () => {
        if(coupon == ""){
            setcouponEmpty(true)
            return
        }

        const isCouponInTags = tags.some(tag => tag.text == coupon);
        if (isCouponInTags) {
            setCouponErrorText("Coupon is already Selected");
            setcouponError(true)
            return
        } 


        ValidateCouponOnCart(coupon,setcouponError,setCouponErrorText,setTags,cartCourses,setbtnLoading,setcoupon,tags)
        setcouponEmpty(false)
    }

    // Coupon
    const handleDelete = (t) => {
        const updatedTags = tags.filter(tag => tag.id != t.id);
        window.localStorage.setItem("coupons", updatedTags);

        setTags(updatedTags);
      };
    

      
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
                            {cartCourses.map((item, i) => {
                                // Find the coupon for the current item, if it exists
                                const coupon = couponValue.find(coupon => coupon.id === item.id);
                                // Calculate the discounted price
                                const originalPrice = CalculateDiscountedPrice(item.other_data) || 0;
                                const discountedPrice = coupon 
                                    ? (coupon.couponType === 1 
                                        ? 0 // Free coupon
                                        : Math.max(originalPrice - (coupon.global_discount_price || 0), 0) // Apply global discount
                                    ) 
                                    : originalPrice;

                                return (
                                    <tr key={i}>
                                        <td>
                                            <img className='mx-3 rounded' height={70} width={60} src={`${IMG_HOST}${item.other_data.img}`} />
                                            {item.title.substring(0, 25)}... <span className="quantity">x 1</span>
                                        </td>
                                        <td>
                                            {getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))} 
                                            {discountedPrice.toFixed(2)}
                                            
                                            {coupon && (
                                                <span className="text-decoration-line-through mx-2">
                                                    {getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))} 
                                                    {originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr className="order-total">
                                <td>Order Total</td>
                                <td>
                                    {cartCourses.length > 0 && getSymbolFromCurrency(GetCurrencyByCountry(cartCourses[0].other_data))}
                                    {total.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }


                    <div className='my-3'>
                        {/* CHips  */}
                    {couponValue.length > 0 && (
                        <Stack className='my-2' direction="row" spacing={1}>
                            {couponValue.map((tag, index) => (
                                <Chip key={index} label={tag.text} onDelete={() => handleDelete(tag)} />
                            ))}
                        </Stack>
                    )}
                   

                    <div className="cart-update-btn-area d-flex">
                        <div className="input-group product-cupon">
                            <input value={coupon} onChange={(e) => setcoupon((e.target.value).toUpperCase())} placeholder="Coupon code..." type="text" />
                            {btnLoading ? (
                            <button className="submit-btn">
                                 <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </button>
                            ) : (
                            <button onClick={handleCouponSubmit} type="submit" className="submit-btn"><i className="icon-4"></i></button>
                            )}
                        </div>
                    </div>  

                    {couponEmpty && <p className='text-danger m-0 p-0'>Please Enter Coupon Code</p>}
                    {couponError && <span className='text-danger m-0 p-0'>{CouponErrorText}</span>}
                    </div>

                    {showPaypal && (
                        <PayPalScriptProvider options={{ clientId: "AbhfyGv-hhPIo4dZ_Wia7_0sevNZC3B871Ndw8aDEIm8h6O59L1sV0TzgFXyCpwx-_GC93sKwsU_GtEF" }}>
                            <PayPalButtons
                                style={{ color: "blue", layout: "horizontal" }}
                                createOrder={async () => {
                                    try {
                                        const response = await fetch('/api/paypal_checkout', {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                cartData: PaypalItems,
                                                totalPrice: total
                                            })
                                        });

                                        if (!response.ok) throw new Error('Failed to create PayPal order');

                                        const order = await response.json();
                                        console.log('PayPal Order Created:', order);
                                        return order.id;
                                    } catch (error) {
                                        console.error('PayPal Order Creation Error:', error);
                                    }
                                }}
                                onApprove={async (data, actions) => {
                                    try {
                                        await actions.order.capture();
                                        console.log('PayPal Order Approved:', data);

                                        // Create the order data to send to your server
                                        const calculatedPurchasedCourse = cartCourses.map((course) => ({
                                            courseCode: course.other_data.course_code,
                                            currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
                                            itemPrice: 1 * CalculateDiscountedPrice(course.other_data)
                                        }));

                                        const calculatedBuyCourseOrder = {
                                            "paymentMethod": "2",
                                            "discount": 0,
                                            "totalPrice": `${total}`,
                                            "currency": GetCurrencyByCountry(cartCourses[0].other_data).toLowerCase(),
                                            "courses": calculatedPurchasedCourse
                                        };

                                        const rawData = JSON.stringify(calculatedBuyCourseOrder);
                                        await BuyCourseByStudent(rawData, router, buyCourseOrder);

                                        console.log('Order placed:', calculatedBuyCourseOrder);
                                    } catch (error) {
                                        console.error('PayPal Order Approval Error:', error);
                                    }
                                }}
                            />
                        </PayPalScriptProvider>
                    )}


            
                    {showStripe && (
                    total === 0 ? (
                        <button onClick={() => {
                            var rawData =  JSON.stringify(buyCourseOrder)
                            BuyCourseByStudent(rawData,router,buyCourseOrder)
                            return
                        }} className="w-100 my-2 edu-btn btn-medium checkout-btn">
                        <span className="d-flex justify-content-center align-items-center">
                            Complete Checkout
                        </span>
                        </button>
                    ) : (
                        <form action="/api/checkout_sessions" method="POST">
                        <input type="hidden" name="cartCourses" value={JSON.stringify(newPricing)} />
                        <section>
                            <button type="submit" className="w-100 my-2 edu-btn btn-medium checkout-btn">
                            <span className="d-flex justify-content-center align-items-center">
                                Complete Checkout
                            </span>
                            </button>
                        </section>
                        </form>
                    )
                    )}


                    
                
            </div>
        </div>
    )
}

export default OrderSummery;