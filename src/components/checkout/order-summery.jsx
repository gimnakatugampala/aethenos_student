"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useCartInfo from '../../hooks/use-cart-info';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { BuyCourseByStudent, fetchStripeProcessingFee, GetCoursesOfSignedInUser, IMG_HOST, ValidateCouponOnCart, VerfiyCheckoutUser } from '../../api';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice';
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import CalculateListPrice from '../../functions/pricing/CalculateListPrice'
import getSymbolFromCurrency from 'currency-symbol-map';
import Cookies from 'js-cookie';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { reactLocalStorage } from 'reactjs-localstorage';
import CalculateCouponDiscountedPrice from '../../functions/pricing/CalculateCouponDiscountedPrice';
import HandleCountry from '../../functions/pricing/HandleCountry';
import FormatHTMLRemove from '../../functions/FormatHTMLRemove';
import FormatNumbers from '../../functions/FormatNumbers';





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







     // Add state to track if the order has been processed
     const [isOrderProcessed, setIsOrderProcessed] = useState(false);

    useEffect(() => {  
        if(window.location.pathname.includes('/checkout')){
            const storedCoupons = reactLocalStorage.get('coupons');
            if (storedCoupons !== null) {
                setcouponValue(storedCoupons != null ? JSON.parse(storedCoupons) : []);
            }
        }         

    }, [couponValue]); 
    // -------------------------------------
    

    // useEffect(() => {
    //     console.log(couponValue)
       
    // },[couponValue])

    const [currentUserCourses, setcurrentUserCourses] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [hasMatchingCourses, setHasMatchingCourses] = useState(false); // State to track matching courses
    
    // Fetch courses of the signed-in user
    useEffect(() => {
        GetCoursesOfSignedInUser(setcurrentUserCourses, setisLoading);
    }, []);
    
    useEffect(() => {
        const purchasedCourseIds = currentUserCourses.map(course => course.id);
    
        // Check if there are matching courses
        const matchingCourses = cartCourses.filter(course => purchasedCourseIds.includes(course.id));
        setHasMatchingCourses(matchingCourses.length > 0);
    }, [currentUserCourses, cartCourses]);
    
    
    

    



const newPricing = cartCourses != null && cartCourses.map((course) => {
    const coupon = couponValue.find(coupon => coupon.id === course.id);
    // console.log(coupon)
    
    // if(coupon){
    //     console.log(CalculateCouponDiscountedPrice(coupon))
    // }
    const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
    const discountedPrice = coupon 
        ? (coupon.couponType === 1 
            ? 0 // Free coupon
            : CalculateCouponDiscountedPrice(coupon) // Apply global discount
        ) 
        : originalPrice;

    return {
        img: course.img,
        title: course.title,
        qty: 1,
        desc: FormatHTMLRemove(course.other_data.course_main_desc).slice(0,1000),
        currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
        price: discountedPrice
    };
});






    // // Items For Paypal
    // const PaypalItems = cartCourses != null && cartCourses.map((course) => {
    // const coupon = couponValue.find(coupon => coupon.id === course.id);
    // const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
    // const discountedPrice = coupon 
    // ? (coupon.couponType === 1 
    //     ? 0 // Free coupon
    //     : Math.max(originalPrice - (coupon.global_discount_price || 0), 0) // Apply global discount
    // ) 
    // : originalPrice;

    // return {
    // name:course.title,
    // description:"Test Course Description",
    // quantity:1,
    // unit_amount:{
    //     currency_code:GetCurrencyByCountry(course.other_data),
    //     value: discountedPrice.toFixed(2)
    // }
    // };
    // });


    // Function to calculate total after applying coupons - Paypal
const calculateTotalWithCoupon = () => {
    return cartCourses.reduce((acc, course) => {
        const coupon = couponValue.find(coupon => coupon.id === course.id);
        const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
        const discountedPrice = coupon 
            ? (coupon.couponType === 1 
                ? 0 // Free coupon
                : CalculateCouponDiscountedPrice(coupon) // Apply global discount
            ) 
            : originalPrice;
        return acc + discountedPrice;
    }, 0); // Fixing to 2 decimal places for PayPal
};


// Function to generate PayPal items with discounted prices - Paypal
const generatePaypalItems = () => {
    return cartCourses.map(course => {
        const coupon = couponValue.find(coupon => coupon.id === course.id);
        const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
        const discountedPrice = coupon 
            ? (coupon.couponType === 1 
                ? 0 // Free coupon
                : CalculateCouponDiscountedPrice(coupon) // Apply global discount
            ) 
            : originalPrice;
        
        return {
            name: course.title,
            unit_amount: {
                currency_code: GetCurrencyByCountry(course.other_data),
                value: discountedPrice
            },
            quantity: '1' // Assuming quantity is 1; adjust if needed
        };
    });
};


// console.log(newPricing)

    useEffect(() => {


        // Update the Paypal Total
        calculateTotalWithCoupon()
        generatePaypalItems()

        // Check The User Token
        VerfiyCheckoutUser()


        if(JSON.parse(window.localStorage.getItem('cart_items')) == null || JSON.parse(window.localStorage.getItem('cart_items')).length == 0){
            router.push('/cart');
            return
        }

        if (total !== 0) {
            const calculatedPurchasedCourse = cartCourses.map((course) => {
                // --- list price --
                // console.log(CalculateListPrice(course.other_data))
                const coupon = couponValue.find(coupon => coupon.id === course.id);
                const originalPrice = CalculateDiscountedPrice(course.other_data) || 0;
                const discountedPrice = coupon 
                    ? (coupon.couponType === 1 
                        ? 0 // Free coupon
                        : CalculateCouponDiscountedPrice(coupon) // Apply global discount
                    ) 
                    : originalPrice;

                return {
                    courseCode: course.other_data.course_code,
                    currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
                    itemPrice: discountedPrice,
                    listPrice: CalculateListPrice(course.other_data),
                    couponCode: coupon ? coupon.text : ""
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
                            acc += CalculateCouponDiscountedPrice(coupon); // Apply global discount
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
            "country": HandleCountry(),
            "courseType": courseType,
            "processingFee" :0,
            "courses": calculatedPurchasedCourse
            };

            // console.log(calculatedBuyCourseOrder)
    
            setBuyCourseOrder(calculatedBuyCourseOrder);
            return
        }

        


    }, [cartCourses, total]);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');

            if (!isOrderProcessed && buyCourseOrder != null && total != 0) {
                console.log(buyCourseOrder);
                console.log(query.get('session_id'));
                

                const loadPayments = async () => {
                    const data = await fetchStripeProcessingFee(query.get('session_id'));

                    console.log(data)

                    if(data[0]){

                        console.log('Processing fee:', data[0].amount);
    
                        // Convert to dollars form cents
                        buyCourseOrder.processingFee = data[0].amount / 100
                       
                        var rawData = JSON.stringify(buyCourseOrder);
                        BuyCourseByStudent(rawData, router, buyCourseOrder);
                        console.log(buyCourseOrder)
                         
                    }

                       
                };


                loadPayments();

                setIsOrderProcessed(true);
                return;
            }
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }

        console.log(buyCourseOrder)
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

        // Update the Paypal Total
        calculateTotalWithCoupon()
        generatePaypalItems()

        setcouponEmpty(false)
    }

    // Coupon
    const handleDelete = (t) => {
        const updatedTags = tags.filter(tag => tag.id != t.id);
        window.localStorage.setItem("coupons", JSON.stringify(updatedTags));

        // Update the Paypal Total
        calculateTotalWithCoupon()
        generatePaypalItems()

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
                                        : CalculateCouponDiscountedPrice(coupon) // Apply global discount
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
                                            {FormatNumbers(discountedPrice)}
                                            
                                            {coupon && (
                                                <span className="text-decoration-line-through mx-2">
                                                    {getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))} 
                                                    {FormatNumbers(originalPrice)}
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
                                    {FormatNumbers(total.toFixed(2))}
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
                        hasMatchingCourses == false && 
                        <PayPalScriptProvider options={{ clientId: "Ad3sOTVUvFCOXRGLh_s8W5jEl3rwdtGkAgTp8qVgQ0RqKvh-wQMZ-AP7OPEhZxeB04NswkDbS0lKF7kd" ,currency : GetCurrencyByCountry(cartCourses[0].other_data)}}>
                             <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: calculateTotalWithCoupon(),
                                        currency_code: GetCurrencyByCountry(cartCourses[0].other_data),
                                        breakdown: {
                                            item_total: { 
                                                currency_code: GetCurrencyByCountry(cartCourses[0].other_data),
                                                value: calculateTotalWithCoupon() 
                                            },
                                        }
                                    },
                                    items: generatePaypalItems()
                                }]
                            });
                        }}
                        onCancel={() => {
                            window.location.reload()
                        }}
                        onApprove={async (data, actions) => {
                            try {
                              // Capture the order on the frontend
                              const details = await actions.order.capture();
                              console.log('Order Details:', details);
                          
                              // Extract capture ID from the captured order details
                              const captureId = details.purchase_units[0].payments.captures[0].id;
                          
                              // Send capture ID to the backend to retrieve processing fee
                              const response = await fetch('/api/paypal_processing_fee', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ captureId: captureId }),
                              });
                          
                              const result = await response.json();
                              if (response.ok) {
                                console.log('Paypal Pricing Break Down:', result.transaction.seller_receivable_breakdown);
                                console.log('Processing Fee:', result.transaction.seller_receivable_breakdown.paypal_fee.value);
                                // Handle successful payment and processing fee here

                                // Save Data
                                buyCourseOrder.paymentMethod = "2";
                                buyCourseOrder.processingFee = +(result.transaction.seller_receivable_breakdown.paypal_fee.value);
                                console.log(buyCourseOrder);
                                //   console.log(JSON.stringify(buyCourseOrder));
                                 var rawData =  JSON.stringify(buyCourseOrder)
                                  BuyCourseByStudent(rawData,router,buyCourseOrder)
                                  return
                                // router.push("/checkout?success=true");

                              } else {
                                console.error('Failed to retrieve processing fee:', result.error);
                              }
                            } catch (error) {
                              console.error('Error handling PayPal approval:', error);
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
                        hasMatchingCourses ? (
                            <button onClick={() => window.location.href = "/cart"} className="w-100 my-2 edu-btn btn-medium checkout-btn">
                            <span className="d-flex justify-content-center align-items-center">
                                Go to Cart
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
                    )
                    )}


                    
                
            </div>
        </div>
    )
}

export default OrderSummery;