import mysql from 'mysql2/promise';
import { config } from '../../config';
import { AppointmentMysqlModel } from '../../../domain';

const db = mysql.createPool({
    host: config.dbHostCl,
    port: config.dbPortCl,
    user: config.bdUserCl,
    password: config.bdPasswordCl,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
});

export const saveAppointmentCl = async (appointment: AppointmentMysqlModel) => {
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