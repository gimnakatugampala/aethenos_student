import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {reactLocalStorage} from 'reactjs-localstorage';
import CalculateDiscountedPrice from "../functions/pricing/CalculateDiscountedPrice";

const useCartInfo = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const cartItems = useSelector(state => state.cart.cartCourses);
    const [couponValue, setcouponValue] = useState([]);


    

    useEffect(() => {
        if(window.location.pathname.includes('/checkout')){
            const storedCoupons = reactLocalStorage.get('coupons');
            if (storedCoupons !== null) {
                setcouponValue(storedCoupons != null ? JSON.parse(storedCoupons) : []);
            }
        }
        
    }, [couponValue]); // Empty dependency array to run the effect only once on component mount
    
    // useEffect(() => {
    //     console.log(couponValue);
    // }, [couponValue]); // Add couponValue to the dependency array


    useEffect(() => {
        const cart = cartItems.reduce((cartTotal, cartItem) => {
            const { id, price, quantity } = cartItem;
            // const itemTotal = price * quantity;
            const coupon = couponValue.length > 0 && couponValue.find(coupon => coupon.id == id);
            let itemTotal;

            if (coupon != null) {
                if (coupon.couponType == 1) {
                    // Apply discount directly to the item's price
                    itemTotal = CalculateDiscountedPrice(cartItem.other_data) - CalculateDiscountedPrice(cartItem.other_data);
                } else {
                    // Apply discount directly from the coupon value
                    itemTotal = CalculateDiscountedPrice(cartItem.other_data) - CalculateDiscountedPrice(coupon);
                }
            } else {
                // If the coupon array is empty, don't reduce the amount
                itemTotal = CalculateDiscountedPrice(cartItem.other_data);
            }
            
            
            cartTotal.total += itemTotal * 1;
            cartTotal.quantity += 1;

            return cartTotal;
        }, {
            total: 0,
            quantity: 0,
        })
        // console.log(cart)
        setQuantity(cart.quantity);
        setTotal(cart.total);
    }, [cartItems,couponValue])
    return {
        quantity,
        total
    }
}

export default useCartInfo;