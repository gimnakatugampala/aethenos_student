import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getLocalStorage, setLocalStorage } from '../../utils/localstorage';

const initialState = {
    cartCourses:[],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cart_course: (state,{payload}) => {
            const courseIndex = state.cartCourses.findIndex(item => Number(item.id ) === Number(payload.id));
            if(courseIndex >= 0){
                state.cartCourses[courseIndex].quantity +=1;
                toast.info(`${payload.title} removed from cart.`, {
                    position: 'top-left'
                })
            } else {
                const tempCourse = {...payload,quantity:1};
                state.cartCourses.push(tempCourse)
                    toast.success(`${payload.title} added to cart`, {
                    position: 'top-left'
                })
            }
            setLocalStorage('cart_items',state.cartCourses);
        },

        decrease_quantity:(state,{payload}) => {
            const cartIndex = state.cartCourses.findIndex(item => Number(item.id ) === Number(payload.id));
            if(state.cartCourses[cartIndex].quantity > 1){
                state.cartCourses[cartIndex].quantity -= 1
                toast.error(`Decrease cart quantity`, {
                    position: 'top-left'
                })
            }
            setLocalStorage('cart_items',state.cartCourses);
        },

        remove_cart_course:(state,{payload}) => {
            state.cartCourses = state.cartCourses.filter(item => Number(item.id ) !== Number(payload.id));
            toast.error(`removed from your cart`, {
                position: 'top-left'
            })
            setLocalStorage('cart_items',state.cartCourses);
        },

        clear_cart:(state,{payload}) => {
            const confirmMsg = window.confirm('Are you sure deleted your all cart items ?');
            if(confirmMsg){
                state.cartCourses = [];
            }
            setLocalStorage('cart_items',state.cartCourses);
        },

        get_cart_courses: (state, action) => {
            state.cartCourses = getLocalStorage('cart_items');
        }
    }
})

export const {cart_course,remove_cart_course,decrease_quantity,clear_cart,get_cart_courses} = cartSlice.actions;
export const cartCourses = state => state.cart.cartCourses;
export default cartSlice.reducer