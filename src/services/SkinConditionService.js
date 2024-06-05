import api from './ApiService'

export const getSkinCondition = async () => {
    const response = await api.get("api/v1/skin-conditions");
    return response.data;
};