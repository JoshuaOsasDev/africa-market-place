import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShowFormState = {
  show: boolean;
  type: string;
};

const initialState: ShowFormState = {
  show: false,
  type: "",
};

// const showFormSlice = createSlice({
//   name: "showForm",
//   initialState,
//   reducers: {
//     setShowForm: (state, action: PayloadAction<{ showform: boolean }>) => {
//       state.showForm = action.payload.showform;
//     },
//   },
// });

const showFormSlice = createSlice({
  name: "showForm",
  initialState,
  reducers: {
    setShowForm: (
      state,
      action: PayloadAction<{ showform: { show: boolean; type: string } }>,
    ) => {
      state.show = action.payload.showform.show;
      state.type = action.payload.showform.type;
    },
  },
});

export const { setShowForm } = showFormSlice.actions;
export const showFormReducer = showFormSlice.reducer;
