import api from './ApiService'

const API_URL = "api/v1/skin-conditions";

export const getSkinCondition = async () => {
    const response = await api.get(API_URL);
    return response.data;
};