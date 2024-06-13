import api from './ApiService'

const API_URL = "api/v1/personal-analysts";

export const addSkinAnalyst = async (skinIdList) => {
    const response = await api.post(API_URL + "/mine", { skinIdList });
    return response.data;
};
export const getAnalystProducts = async (Category) => {
    const response = await api.get(API_URL + "/mine/products", {
        params: {
            Category,
        }
    });
    return response.data;
}