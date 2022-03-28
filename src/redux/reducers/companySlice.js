import { createSlice } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const companySlice = createSlice({
  name: "companies",
  initialState: {
    isLoading: false,
    companies: [],
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
      state.companies = action.payload;
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
    },

    createCompaniesError: (state) => {
      state.isLoading = false;
    },

    formValidationError: (state, action) => {
      state.isLoading = false;
      state.error.name = action.payload.errors.nameError;
      state.error.email = action.payload.errors.emailError;
    },

    formValidationSuccess: (state, action) => {
      state.isLoading = false;
      state.error.name = null;
      state.error.email = null;
    },

    serverSideError: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error.name = action.payload.name;
        state.error.email = action.payload.email;
      } else {
        state.error.name = null;
        state.error.email = null;
      }
    },

    redirectSlice: (state, action) => {
      history.push("/");
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
  formValidationError,
  formValidationSuccess,
  serverSideError,
  redirectSlice,
} = companySlice.actions;

export default companySlice.reducer;
