import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "errors",
  initialState: {
    errors: {},
    serverSideError: {},
  },
  reducers: {
    companyFormValidationError: (state, action) => {
      state.errors.name = action.payload.errors.nameError;
      state.errors.email = action.payload.errors.emailError;
      state.errors.webAddress = action.payload.errors.webAddressError;
      state.errors.phone = action.payload.errors.phoneError;
    },

    companyFormValidationSuccess: (state, action) => {
      state.errors = {};
      state.serverSideError = {};
    },

    companyServerSideError: (state, action) => {
      if (action.payload) {
        state.serverSideError.name = action.payload.serverErr.name;
        state.serverSideError.email = action.payload.serverErr.email;
        state.serverSideError.email = action.payload.serverErr.email;
      } else {
        state.serverSideError = {};
      }
    },
  },
});

export const {
  companyFormValidationError,
  companyFormValidationSuccess,
  companyServerSideError,
} = errorSlice.actions;

export default errorSlice.reducer;
