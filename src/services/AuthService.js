import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../config/api";

const URL = API_URL_ENV ;
const API_URL ="/api/v1/auth";
const instance = axios.create({
  baseURL: URL,
  headers: {
      "Content-Type": "application/json",
  },
});
export const login = async (userLogin) => {
  const response = await instance.post(API_URL+"/login", userLogin);
  if (response.data.data != null){
  await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
  await AsyncStorage.setItem("refreshToken", response.data.data.refreshToken);
  }
  return response.data;
};

export const register = async (userRegister) => {
  const response = await instance.post(API_URL+"/register", userRegister);
  if (response.data.data != null){
  }
  return response.data;
};