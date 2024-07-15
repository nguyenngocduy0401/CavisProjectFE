import api from './ApiService'

const API_URL = "api/v1/calendars";

export const getCalendars = async (Date) => {
    const response = await api.get(API_URL, { params: { Date } });
    return response.data;
};