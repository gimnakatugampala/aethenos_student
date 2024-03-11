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
    // const [couponValue, setcouponValue] = useState([]);

    // useEffect(() => {
    //     const storedCoupons = reactLocalStorage.get('coupons');
    //     if (storedCoupons !== null) {
    //         setcouponValue(storedCoupons != null ? JSON.parse(storedCoupons) : []);
    //     }
    // }, [couponValue]); 
    // -------------------------------------
    

// console.log(cartCourses)

const newPricing = cartCourses != null && cartCourses.map((course) => ({
    img: course.img,
    title:course.title,
    qty:course.quantity,
    desc:course.other_data.course_main_desc,
    currency:GetCurrencyByCountry(course.other_data).toLowerCase(),
    price:(CalculateDiscountedPrice(course.other_data)) == null ? 0 : (CalculateDiscountedPrice(course.other_data))
}))


// Items For Paypal
const PaypalItems = cartCourses != null && cartCourses.map((course) => ({
    name:course.title,
    description:"Test Course Description",
    quantity:course.quantity,
    unit_amount:{
        currency_code:GetCurrencyByCountry(course.other_data),
        value:(CalculateDiscountedPrice(course.other_data)) == null ? 0 : (CalculateDiscountedPrice(course.other_data))
    }
}))


// console.log(newPricing)

    useEffect(() => {

        // Check The User Token
        VerfiyCheckoutUser()


        if(JSON.parse(window.localStorage.getItem('cart_items')) == null || JSON.parse(window.localStorage.getItem('cart_items')).length == 0){
            router.push('/cart');
            return
        }

        if(total != 0){

            const calculatedPurchasedCourse = cartCourses != null && cartCourses.map((course) => ({
            courseCode: course.other_data.course_code,
            currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
            itemPrice: course.quantity * (CalculateDiscountedPrice(course.other_data))
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
                            {cartCourses.map((item,i) => (
                                <tr key={i}>
                                    <td><img className='mx-3 rounded' height={70} width={60} src={`${IMG_HOST}${item.other_data.img}`} />{item.title.substring(0,25)}... <span className="quantity">x {item.quantity}</span></td>
                                    <td>
                                    {getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))} 
                                    {(item.quantity * (CalculateDiscountedPrice(item.other_data))).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                            <tr className="order-total">
                                <td>Order Total</td>
                                <td>{cartCourses.length > 0 && getSymbolFromCurrency(GetCurrencyByCountry(cartCourses[0].other_data))}{(total).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                }

                    <div className='my-3'>
                    {tags.length > 0 && (
                        <Stack className='my-2' direction="row" spacing={1}>
                            {tags.map((tag, index) => (
                                <Chip key={index} label={tag.text} onDelete={() => handleDelete(tag)} />
                            ))}
                        </Stack>
                    )}
                   

                    {/* <div className="cart-update-btn-area d-flex">
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
                    </div>   */}

                    {couponEmpty && <p className='text-danger m-0 p-0'>Please Enter Coupon Code</p>}
                    {couponError && <span className='text-danger m-0 p-0'>{CouponErrorText}</span>}
                    </div>

                {showPaypal && (

                 <PayPalScriptProvider options={{
                    clientId:"AbhfyGv-hhPIo4dZ_Wia7_0sevNZC3B871Ndw8aDEIm8h6O59L1sV0TzgFXyCpwx-_GC93sKwsU_GtEF"
                 }}>
                    <PayPalButtons style={{color:"blue",layout:"horizontal"}} 
                    createOrder={async() =>{
                        const response = await fetch('/api/paypal_checkout', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                cartData:PaypalItems,
                                totalPrice:total
                            })
                        });
                
                        const order = await response.json();
                        console.log(order);
                        return order.id
                       
                    }}
                    onApprove={(data,actions) =>{
                        console.log(data)
                        actions.order.capture()

                        // ----------- ORDER PLACE --------------

                        const calculatedPurchasedCourse = cartCourses != null && cartCourses.map((course) => ({
                            courseCode: course.other_data.course_code,
                            currency: GetCurrencyByCountry(course.other_data).toLowerCase(),
                            itemPrice: course.quantity * (CalculateDiscountedPrice(course.other_data))
                            }));
                    
                            // setPurchasedCourse(calculatedPurchasedCourse);
                    
                            const calculatedBuyCourseOrder = {
                            "paymentMethod": "2",
                            "discount": 20,
                            "totalPrice": `${total}`,
                            "currency": GetCurrencyByCountry(cartCourses[0].other_data).toLowerCase(),
                            "courses": calculatedPurchasedCourse
                            };

                            var rawData =  JSON.stringify(calculatedBuyCourseOrder)
                            BuyCourseByStudent(rawData)

                            console.log(calculatedBuyCourseOrder)

                        // ----------- ORDER PLACE --------------

                    }}
                    />
                </PayPalScriptProvider>
                )}

                     
            
                {showStripe && <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="cartCourses" value={JSON.stringify(newPricing)} />
                    
                    <section>
                    <Button  type="submit" className='w-100 my-2' variant="primary">
                    <span className='d-flex justify-content-center align-items-center'>
                              Checkout via<i style={{fontSize:'30px'}} className="fa-brands fa-stripe mx-1"></i>
                            </span>
                    </Button>
                    </section>
                    </form>}

                    
                
            </div>
        </div>
    )
}

export default OrderSummery;