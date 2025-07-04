import { SQSEvent } from "aws-lambda";
import { UpdateAppointment } from "../infrastructure";
import { AppointmentMysqlModel } from "../domain";

export const Attended = async (event: SQSEvent): Promise<string> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body || "{}");
    const appointment: AppointmentMysqlModel = body.detail;
    if (!appointment || !appointment.insuredId || !appointment.countryISO || !appointment.scheduleId) {
      console.warn("⚠️ appointment no encontrado en body.detail");
      return "appointment no encontrado";
    }
    await UpdateAppointment(appointment.insuredId, appointment.scheduleId, "completed");
  }
  return "Atencion completa.";
};