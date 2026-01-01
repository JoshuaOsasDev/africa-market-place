import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: any = {
  categories: [],
  newCategories: [],
  isLoading: true
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<any>) {
      state.categories = action.payload.data;
      state.newCategories = action.payload.newCategories;
      state.isLoading = false;
    }
  }
});

// Reducer
export default categoriesSlice.reducer;

// Actions
export const { setCategories } = categoriesSlice.actions;

