// Why it's important: 
// You don’t need to manually pass the token in every API call. This keeps your code clean and secure.

import axios from "axios";

const instance = axios.create({ // axios.create({ baseURL }) Creates a custom Axios instance with the backend URL
  baseURL: "http://localhost:3000",
});

//Before sending any request,
// it automatically attaches the JWT token to the Authorization header if it exists in localStorage
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //Authorization: Bearer <token>: This is how the backend recognizes and authorizes the user
  }
  return config;
});

export default instance;
