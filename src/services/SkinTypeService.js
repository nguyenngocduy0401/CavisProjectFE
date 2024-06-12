import api from './ApiService'

const API_URL = "api/v1/skin-types";

export const getSkinTypes = async () => {
    const response = await api.get(API_URL);
    return response.data;
};