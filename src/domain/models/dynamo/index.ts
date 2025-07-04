export interface AppointmentDynamoModel {
  scheduleId: number;
  insuredId: string;
  countryISO: "PE" | "CL";
  status: "pending" | "confirmed";
}
