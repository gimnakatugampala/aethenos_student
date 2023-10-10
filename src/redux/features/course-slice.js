import { createSlice } from '@reduxjs/toolkit';
import { course_data } from '../../data';

const initialState = {
    courses:course_data,
    course:{}
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        single_product: (state,{payload}) => {}
    }
})

export const { single_product } = courseSlice.actions;
export const selectCourses = (state) => state.courses.courses;
export default courseSlice.reducer
