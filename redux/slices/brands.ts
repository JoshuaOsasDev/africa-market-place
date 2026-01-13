import { createSlice } from '@reduxjs/toolkit';


const initialState: any = {
  brands: [],
  isLoading: true
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrands(state, action) {
      state.brands = action.payload;
      state.isLoading = false;
    }
  }
});

// Reducer
export default brandSlice.reducer;

// Actions
export const { setBrands } = brandSlice.actions;


