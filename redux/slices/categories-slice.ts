import { createSlice } from "@reduxjs/toolkit";

interface InitialStateTypes {
  selectedCategory: null | string;
}

const initialState: InitialStateTypes = {
  selectedCategory: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    resetCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, resetCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
