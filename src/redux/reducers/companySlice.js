import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "companies",
  initialState: {
    isLoading: false,
    showToaster: false,
    companies: [],
    count: 0,
    from: null,
    to: null,
    error: {
      name: null,
      email: null,
      address: null,
    },
    serverSideError: "",
  },
  reducers: {
    getCompaniesStart: (state) => {
      state.isLoading = true;
    },

    getCompaniesSuccess: (state, action) => {
      state.companies = action.payload.data;
      state.count = action.payload.total;
      state.isLoading = false;
    },

    getCompaniesError: (state) => {
      state.isLoading = false;
    },

    createCompaniesStart: (state) => {
      state.isLoading = true;
    },

    createCompaniesSuccess: (state, action) => {
      state.isLoading = false;
      state.showToaster = true;
    },

    createCompaniesError: (state) => {
      state.isLoading = false;
    },

    hideToaster: (state) => {
      state.showToaster = false;
    },
  },
});

export const {
  getCompaniesStart,
  getCompaniesSuccess,
  getCompaniesError,
  createCompaniesStart,
  createCompaniesSuccess,
  createCompaniesError,
  hideToaster
} = companySlice.actions;

export default companySlice.reducer;
