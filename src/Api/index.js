import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const getCompaniesAPI = (payload) => {
  return axios.get(`/api/v1/contacts?page=${payload.page}&perpage=${payload.perPage}`);
};

export const createCompanyAPI = (user) => {
  return axios.post(`/api/v1/contacts`, user).then((data) => {
    console.log(data);
    return data;
  });
};
