import api from './ApiService'

const API_URL = "api/v1/method";

export const getMethod = async (id) => {
    const response = await api.get(API_URL + `/${id}`);
    return response.data;
};