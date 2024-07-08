import api from './ApiService'
const API_URL = "/api/v1/skincare-routines/";
export const setSkincareRoutine = async (id, credentials) => {
    const response = await api.put(API_URL + id, credentials);
    return response.data;
};