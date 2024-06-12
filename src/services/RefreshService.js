import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "./UserService";
import API_URL_ENV from "../config/api";

const url = API_URL_ENV;
const instance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    responseType: "json"
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            if (err.response.status === 401 || err.response.status === 500) {
                await logout()
            }
        }
        return Promise.reject(err);
    }
);

export const refresh = async (refreshToken, accessToken) => {
    const response = await instance.put("/api/v1/auth/new-token", {
        refreshToken,
        accessToken
    });
    return response.data;
};

