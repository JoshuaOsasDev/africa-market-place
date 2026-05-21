import Cookies from "js-cookie";
import { userAuthType } from "@/types/authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state

const initialState: userAuthType = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false,
  loading: false,
  token: null,
};

// slice
const slice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signInAction(state, action) {
      const { user, token } = action.payload;
      console.log(user, token, "user and token");
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // 1. Save to Cookies so Middleware can see it
      // 'lax' is fine for localhost, but 'none' + 'secure' is needed for cross-domain
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user_role", user.role, { expires: 7 });
    },
    setLogoutAction(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // 2. Remove Cookies on logout
      Cookies.remove("token");
      //Cookies.remove("user_role");
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
    updateProfileAction(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
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
  updateProfileAction,
} = slice.actions;
