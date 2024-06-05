import axios from "axios";
import { refresh } from "./refresh";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default instance;