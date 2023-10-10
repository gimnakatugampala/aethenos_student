import {createSlice} from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name:'event',
    initialState:{
        categories:[]
    },
    reducers:{
        add_category:(state,{payload}) => {
            if(payload.changeType === 'remove'){
                state.categories = state.categories.filter((category) => category !== payload.item)
            }
            else if(payload.changeType === 'added'){
                state.categories.push(payload.item)
            }
        }
    }
})

export const {add_category}  = eventSlice.actions;
export default eventSlice.reducer;