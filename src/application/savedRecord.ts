import { AppointmentMysqlModel } from "../domain";
import { saveAppointmentCl, saveAppointmentPe } from "../infrastructure";

export const savedRecord = async (pais: 'PE' | 'CL', appointment: AppointmentMysqlModel): Promise<void> => {
    if (pais === 'PE') {
        await saveAppointmentPe(appointment);
    } else {
        await saveAppointmentCl(appointment);
    }
};