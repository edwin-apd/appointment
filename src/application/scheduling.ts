import { APIGatewayProxyEvent } from "aws-lambda";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { AppointmentDynamoModel } from "../domain";
import { config, SaveAppointment } from "../infrastructure";

const sns = new SNSClient();

export const Scheduling = async (event: APIGatewayProxyEvent): Promise<string> => {
    const body = JSON.parse(event.body || "{}");
    const newAppointment: AppointmentDynamoModel = {
        scheduleId: body.scheduleId,
        insuredId: body.insuredId,
        countryISO: body.countryISO,
        status: "pending",
    };
    await SaveAppointment(newAppointment);
    const command = new PublishCommand({
        TopicArn: config.topicSns,
        Message: JSON.stringify(newAppointment),
        MessageAttributes: {
            countryISO: {
                DataType: "String",
                StringValue: newAppointment.countryISO,
            },
        },
    });
    await sns.send(command);
    return "El agendamiento está en proceso.";
};
