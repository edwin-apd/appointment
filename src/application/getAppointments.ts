import { GetAllAppointments } from "../infrastructure";

export const GetAppointments = async (): Promise<any> => {
    return await GetAllAppointments();
};
