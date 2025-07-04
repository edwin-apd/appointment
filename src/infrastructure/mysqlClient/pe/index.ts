import mysql from 'mysql2/promise';
import { config } from '../../config';
import { AppointmentMysqlModel } from '../../../domain';

const db = mysql.createPool({
    host: config.dbHostPe,
    port: config.dbPortPe,
    user: config.bdUserPe,
    password: config.bdPasswordPe,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
});

export const saveAppointmentPe = async (appointment: AppointmentMysqlModel) => {
    const query = `
    INSERT INTO appointment (insuredId, scheduleId, countryISO)
    VALUES (?, ?, ?)
  `;
    const values = [
        appointment.insuredId,
        appointment.scheduleId,
        appointment.countryISO
    ];
    await db.execute(query, values);
};