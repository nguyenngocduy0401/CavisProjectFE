import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_ENV from "../config/api";
import { refresh } from "./RefreshService";
import { store } from "../store/store";
import { removeUser } from "../store/features/authSlice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

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
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalConfig.headers['Authorization'] = 'Bearer ' + token;
                        return instance(originalConfig);
                    }).catch(error => {
                        return Promise.reject(error);
                    });
                }
                originalConfig._retry = true;
                isRefreshing = true;

                try {
                    console.log("refreshing")
                    const oldRefreshToken = await AsyncStorage.getItem("refreshToken");
                    const oldAccessToken = await AsyncStorage.getItem("accessToken");
                    const data = await refresh(oldRefreshToken, oldAccessToken)
                    if (data.isSuccess) {
                        const accessToken = data.data.accessToken;
                        const refreshToken = data.data.refreshToken;
                        await AsyncStorage.setItem("accessToken", accessToken);
                        await AsyncStorage.setItem("refreshToken", refreshToken);
                        processQueue(null, accessToken);
                        return instance(originalConfig);
                    } else {
                        processQueue(err, null);
                        await AsyncStorage.removeItem("refreshToken");
                        await AsyncStorage.removeItem("accessToken");
                        store.dispatch(removeUser())
                    }
                } catch (_error) {
                    processQueue(_error, null);
                    return Promise.reject(_error);
                } finally {
                    isRefreshing = false;
                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;