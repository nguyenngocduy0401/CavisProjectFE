import api from './ApiService'

const API_URL = "api/v1/product";

export const getProduct = async (id) => {
    const response = await api.get(API_URL + `/${id}`);
    return response.data;
};