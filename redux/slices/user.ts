import { userAuthType } from "@/types/authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state

const initialState: userAuthType = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false,
  loading: false,
};

// slice
const slice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signInAction(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogoutAction(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    setCountAction(state) {
      state.count = state.count + 1;
    },
    setInitializeAction(state) {
      state.isInitialized = true;
    },
    updateStatusAction(state, action) {
      if (state.user) {
        state.user.status = action.payload;
      }
    },
    verifyUserAction(state) {
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    updateUserRoleAction(state) {
      if (state.user) {
        state.user.role = "vendor";
      }
    },
    setLoaderAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  signInAction,
  setLogoutAction,
  setCountAction,
  setInitializeAction,
  updateStatusAction,
  verifyUserAction,
  updateUserRoleAction,
  setLoaderAction,
} = slice.actions;
