import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../config/api";

const URL = API_URL_ENV;
const API_URL = "/api/v1/auth";
const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const login = async (userLogin) => {
  const response = await instance.post(API_URL + "/login", userLogin);
  if (response.data.data != null) {
    await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
    await AsyncStorage.setItem("refreshToken", response.data.data.refreshToken);
  }
  return response.data;
};

export const register = async (userRegister) => {
  const response = await instance.post(API_URL + "/register", userRegister);
  if (response.data.data != null) {
  }
  return response.data;
};
export const sendOTP = async (emailObj) => {
  console.log(emailObj.email);
  console.log(emailObj);
  const response = await instance.post(API_URL + "/otp-email", emailObj);
  console.log(response);
  return response.data;
};
export const resetPassword = async (resetPassword) => {
  const response = await instance.put(API_URL + "/reset-password/" + resetPassword.email, resetPassword);
  return response.data;
};