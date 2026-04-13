import { WishlistSliceState } from "@/components/pageComponents/user/wishlist/wishlistComp";
import { createSlice } from "@reduxjs/toolkit";
import { filter } from "lodash";

const initialState: WishlistSliceState = {
  wishlist: {
    data: [],
  },
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setWishlistAction(state, action) {
      state.wishlist = action.payload;
    },

    resetWishlistAction(state) {
      state.wishlist.data = [];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setWishlistAction, resetWishlistAction } = slice.actions;
