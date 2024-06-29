import api from './ApiService'

const API_URL = "api/v1/personal-analysts/mine";

export const addSkinAnalyst = async (skinIdList) => {
    const response = await api.post(API_URL, { skinIdList });
    return response.data;
};
export const getAnalystProducts = async (credentials) => {
    const response = await api.get(API_URL + "/products", {
        params: credentials
    });
    return response.data;
}
export const getAnalystMethods = async (credentials) => {
    const response = await api.get(API_URL + "/methods", {
        params: credentials
    });
    return response.data;
}