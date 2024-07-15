import api from './ApiService'

const API_URL = "api/v1/appointments";

export const getAppointments = async (StartDate, EndDate) => {
    const response = await api.get(API_URL, { params: { StartDate, EndDate, PageSize: 999 } });
    return response.data;
};
export const getAppointmentExperts = async (Date, StartTime, EndTime, Role) => {
    const response = await api.get(API_URL + "/users", { params: { Date, StartTime, EndTime, PageSize: 999, Role } });
    return response.data;
};