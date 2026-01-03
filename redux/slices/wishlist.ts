import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setWishlistAction(state, action) {
      state.wishlist = action.payload;
    },
    resetWishlistAction(state) {
      state.wishlist = [];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setWishlistAction, resetWishlistAction } = slice.actions;


