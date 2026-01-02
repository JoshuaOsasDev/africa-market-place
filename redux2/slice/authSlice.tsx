import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  userProfile: {
    userEmail: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    userImage: "",
    role: "",
    token: "",
  },
  loading: false,
};

// this is an example section, you can follow this pattern to desing yours
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserEmailAndTokenAction: (
      state,
      action: PayloadAction<{ userEmail: string; token: string }>,
    ) => {
      state.userProfile.token = action.payload.token;
      state.userProfile.userEmail = action.payload.userEmail;
    },
    setUserEmailAction: (
      state,
      action: PayloadAction<{ userEmail: string }>,
    ) => {
      state.userProfile.userEmail = action.payload.userEmail;
    },
    setUserBioAction: (state, action: PayloadAction<any>) => {
      state.userProfile = {
        ...state.userProfile,
        ...action.payload,
      };
    },
    setGlobalAppLoaderAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUserEmailAndTokenAction,
  setUserEmailAction,
  setUserBioAction,
  setGlobalAppLoaderAction,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
