import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  tableName: "AppointmentTable",
  topicSns: process.env.SNS_TOPIC_ARN!,
  dbHostPe: process.env.BD_HOST_PE!,
  dbPortPe: parseInt(process.env.BD_PORT_PE!),
  bdUserPe: process.env.BD_USER_PE!,
  bdPasswordPe: process.env.DB_PASSWORD_PE!,
  dbHostCl: process.env.BD_HOST_CL!,
  dbPortCl: parseInt(process.env.BD_PORT_CL!),
  bdUserCl: process.env.BD_USER_CL!,
  bdPasswordCl: process.env.DB_PASSWORD_CL!,
  database: 'appointments_service'
};
