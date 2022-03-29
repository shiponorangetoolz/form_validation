import { createSlice } from "@reduxjs/toolkit";

export const toasterSlice = createSlice({
  name: "toster",
  initialState: {
    showToaster: false,
  },
  reducers: {
    showToaster: (state, action) => {
      state.showToaster = true;
    },

    hideToaster: (state) => {
      state.showToaster = false;
    },
  },
});

export const { showToaster, hideToaster } = toasterSlice.actions;

export default toasterSlice.reducer;
