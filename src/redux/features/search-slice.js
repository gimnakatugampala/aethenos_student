import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDropdown: false,
  searchResults: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setShowDropdown(state, action) {
      state.showDropdown = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
});

export const { setShowDropdown, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
