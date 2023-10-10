import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getLocalStorage, setLocalStorage } from '../../utils/localstorage';

const initialState = {
    wishlist:[]
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        add_to_wishlist:(state,{payload}) => {
            if(payload.change_type === 'remove_wishlist'){
                state.wishlist = state.wishlist.filter(item => item.id !== payload.item.id)
                toast.error(`${payload.item.title} removed from wishlist`, {
                    position: 'top-left'
                })
            } else if(payload.change_type === 'add_wishlist'){
                state.wishlist.push(payload.item);
                toast.success(`${payload.item.title} added to wishlist`, {
                    position: 'top-left'
                })
            }
            setLocalStorage('wishlist_items',state.wishlist)
        },
        remove_wishlist_product:(state,{payload}) => {
            state.wishlist = state.wishlist.filter(item => item.id !== payload.id);
            toast.error(`removed from your wishlist`, {
                position: 'top-left'
            })
            setLocalStorage('wishlist_items',state.wishlist)
        },
        get_wishlist_products: (state, { payload }) => {
            state.wishlist = getLocalStorage('wishlist_items');
        }
    }
})

export const { add_to_wishlist,remove_wishlist_product,get_wishlist_products } = wishlistSlice.actions;
export const wishlistItems = (state) => state.wishlist.wishlist;
export default wishlistSlice.reducer