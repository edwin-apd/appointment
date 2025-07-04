import { APIGatewayProxyEvent, APIGatewayProxyHandler, SQSEvent } from "aws-lambda";
import { AppointmentResponse } from "../domain";
import { Scheduling, GetAppointments, Attended } from "../application";

export const handler: APIGatewayProxyHandler = async (
  event: any
): Promise<AppointmentResponse> => {
  try {
    console.log("📨 Peticion recibida", event);
    const method = event?.requestContext?.http?.method || event?.httpMethod || 'UNKNOWN';
    if (method === "GET") {
      //trae todos los agendamientos
      const data = await GetAppointments();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'OK', data }),
      }
    }
    if (method === "POST") {
      //agendamiento
      const data = await Scheduling(event);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: data }),
      };
    }
    if ("Records" in event) {
      //atendido
      const data = await Attended(event);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: data }),
      };
    }
    return {
      statusCode: 405,
      body: JSON.stringify({ message: `Método ${"httpMethod" in event ? event.httpMethod : "desconocido"} no permitido` }),
    };
  } catch (error: any) {
    console.error("❌ Error en Lambda:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error?.message || "Error al procesar la solicitud",
      }),
    };
  }
};
