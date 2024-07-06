import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './ApiService';
import { store } from '../store/store';
import { removeUser } from '../store/features/authSlice';

const API_URL = "/api/v1/users";
export const getCurrentUser = async () => {
    const response = await api.get(API_URL + "/mine");
    return response.data;
};
export const updateUser = async (credentials) => {
    const response = await api.put(API_URL + "/mine", credentials);
    return response.data;
};

export const logout = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const response = await api.delete("/api/v1/auth/logout", {
        params: {
            refreshToken,
        }
    });
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("accessToken");
    store.dispatch(removeUser())
    return response.data;
};

export const registerPremium = async (id) => {
    const response = await api.post(API_URL + `/mine/premium-packages/${id}`);
    return response.data;
};

export const addPhoto = async (url) => {
    const response = await api.put(API_URL + "/mine/personal-images", {
        url
    });
    return response.data;
};

export const getPhotos = async () => {
    const response = await api.get(API_URL + "/mine/personal-images");
    return response.data;
};

export const getSkincareRoutine = async () => {
    const response = await api.get(API_URL + "/mine/skincare-routines");
    return response.data;
};
