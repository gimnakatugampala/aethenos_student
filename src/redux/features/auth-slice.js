import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '../../utils/localstorage';

const initialState = {
    allUsers: [],
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        add_user: (state, { payload }) => {
            state.allUsers.push(payload);
            state.user = payload;
            setLocalStorage('user', state.user);
        },
        user_info: (state, { payload }) => {
            state.user = payload;
            setLocalStorage('user', state.user);
        },
        sign_out: (state, { payload }) => {
            state.user = {};
            setLocalStorage('user', state.user);
        },
        get_user: (state, { payload }) => {
            state.user = getLocalStorage('user');
        }
    }
})

export const { user_info, add_user, sign_out,get_user } = authSlice.actions;

export default authSlice.reducer;