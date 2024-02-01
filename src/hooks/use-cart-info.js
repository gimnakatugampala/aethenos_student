import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalculateDiscountedPrice from "../functions/pricing/CalculateDiscountedPrice";

const useCartInfo = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const cartItems = useSelector(state => state.cart.cartCourses);

    // console.log(cartItems)

    useEffect(() => {
        const cart = cartItems.reduce((cartTotal, cartItem) => {
            const { price, quantity } = cartItem;
            const itemTotal = price * quantity;
            // console.log(cartItem)
            // console.log(CalculateDiscountedPrice(cartItem.other_data))
            // cartTotal.total += itemTotal
            cartTotal.total += CalculateDiscountedPrice(cartItem.other_data) * quantity
            cartTotal.quantity += quantity

            return cartTotal;
        }, {
            total: 0,
            quantity: 0,
        })
        // console.log(cart)
        setQuantity(cart.quantity);
        setTotal(cart.total);
    }, [cartItems])
    return {
        quantity,
        total
    }
}

export default useCartInfo;