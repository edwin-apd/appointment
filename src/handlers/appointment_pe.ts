import { SQSHandler } from 'aws-lambda';
import { AppointmentMysqlModel } from '../domain';
import { publishAppointmentConfirmed, savedRecord } from '../application';

export const handler: SQSHandler = async (event): Promise<void> => {
    console.log("📨 Peticion recibida", event);
  for (const record of event.Records) {
    try {
      const snsPayload = JSON.parse(record.body);
      const appointment = JSON.parse(snsPayload.Message);
      const newAppointment: AppointmentMysqlModel = {
        insuredId: appointment.insuredId,
        scheduleId: appointment.scheduleId,
        countryISO: 'PE'
      };
      await savedRecord('PE', newAppointment);
      await publishAppointmentConfirmed('appointment.pe', newAppointment);
    } catch (err: any) {
      console.error('⚠️ No se pudo parsear como SNS. Mensaje bruto:', record.body);
      console.error('⚠️ Error', err.message);
    }
  }
};
