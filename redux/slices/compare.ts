import { createSlice } from '@reduxjs/toolkit';


const initialState: any = {
  products: []
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addCompareProduct(state, action) {
      state.products = [...state.products, action.payload];
    },
    removeCompareProduct(state, action) {
      const filtered = state.products.filter((p:any) => p !== action.payload);
      state.products = filtered;
    },
    resetCompareProducts(state) {
      state.products = [];
    }
  }
});

// Reducer
export default compareSlice.reducer;

// Actions
export const { addCompareProduct, removeCompareProduct, resetCompareProducts } = compareSlice.actions;


