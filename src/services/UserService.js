import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './ApiService';

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
    return response.data;
};
