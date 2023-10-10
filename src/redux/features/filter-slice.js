import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        categories: [],
        instructors: [],
        levels: [],
        languages: [],
        price: 0,
        page_count: 0,
        item_offset: 0,
        forcePage: null
    },
    reducers: {
        add_category: (state, { payload }) => {
            if (payload.changeType === "remove") {
                state.categories = state.categories.filter(
                    (category) => category !== payload.item
                );
            } else if (payload.changeType === "added") {
                state.categories.push(payload.item);
            }
        },
        add_instructor: (state, { payload }) => {
            const isExist = state.instructors.includes(payload.instructor);
            if (!isExist) {
                state.instructors.push(payload.instructor);
            } else {
                state.instructors = state.instructors.filter(
                    (instructor) => instructor !== payload.instructor
                );
            }
        },
        add_level: (state, { payload }) => {
            const isExist = state.levels.includes(payload.level);
            if (!isExist) {
                state.levels.push(payload.level);
            } else {
                state.levels = state.levels.filter(
                    (level) => level !== payload.level
                );
            }
        },
        add_language: (state, { payload }) => {
            const isExist = state.languages.includes(payload.language);
            if (!isExist) {
                state.languages.push(payload.language);
            } else {
                state.languages = state.languages.filter(
                    (language) => language !== payload.language
                );
            }
        },
        add_price: (state, { payload }) => {
            state.price = payload;
        },
        add_count_page: (state, { payload }) => {
            state.page_count = payload;
        },
        add_item_offset: (state, { payload }) => {
            state.item_offset = payload;
        },
        add_force_page: (state, { payload }) => {
            state.forcePage = payload;
        },
        reset_filter: (state, { payload }) => {
            state.categories = [];
            state.instructors = [];
            state.languages = [];
            state.levels = [];
            state.price = payload;
        }
    }
});

export const {
    add_category,
    add_instructor,
    add_level,
    add_language,
    add_price,
    reset_filter,
    add_count_page,
    add_item_offset,
    add_force_page
} = filterSlice.actions;

export default filterSlice.reducer;