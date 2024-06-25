import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../config/api";
import { refresh } from "./RefreshService";
import { logout } from "./UserService";

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
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if ((err.response.status === 401 || err.response.status === 403) && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    console.log("refreshing")
                    const oldRefreshToken = await AsyncStorage.getItem("refreshToken");
                    const oldAccessToken = await AsyncStorage.getItem("accessToken");
                    const data = await refresh(oldRefreshToken, oldAccessToken)
                    if (data) {
                        const accessToken = data.data.accessToken;
                        const refreshToken = data.data.refreshToken;
                        await AsyncStorage.setItem("accessToken", accessToken);
                        await AsyncStorage.setItem("refreshToken", refreshToken);
                    } else {
                        await logout()
                    }
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;