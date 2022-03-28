import axios from "axios";
import { retry } from "redux-saga/effects";

axios.defaults.baseURL = "http://localhost:8000";

export const getCompaniesAPI = async () => await axios.get("/api/v1/contacts");

export const createCompanyAPI = (user) => {
  console.log(user, "user");

  return axios.post(`/api/v1/contacts`, user)
  .then(data => {
    console.log(data)
    return data;
  })
  
}

