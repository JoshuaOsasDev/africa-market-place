import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShowFormState = {
  showForm: boolean;
};

const initialState: ShowFormState = {
  showForm: false,
};

const showFormSlice = createSlice({
  name: "showForm",
  initialState,
  reducers: {
    setShowForm: (state, action: PayloadAction<{ showform: boolean }>) => {
      state.showForm = action.payload.showform;
    },
  },
});

export const { setShowForm } = showFormSlice.actions;
export const showFormReducer = showFormSlice.reducer;
