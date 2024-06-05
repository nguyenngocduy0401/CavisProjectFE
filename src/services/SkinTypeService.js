import api from './ApiService'

export const getSkinTypes = async () => {
    const response = await api.get("api/v1/skin-types");
    return response.data;
};