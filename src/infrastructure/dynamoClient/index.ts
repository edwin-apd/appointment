import {
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "../config";
import { AppointmentDynamoModel } from "../../domain";

const ddbClient = new DynamoDBClient();

export const GetAllAppointments = async (): Promise<AppointmentDynamoModel[]> => {
    const command = new ScanCommand({
        TableName: config.tableName,
    });
    const response = await ddbClient.send(command);
    if (!response.Items) return [];
    return response.Items.map((item) => unmarshall(item) as AppointmentDynamoModel);
};

export const SaveAppointment = async (
    appointment: AppointmentDynamoModel
): Promise<void> => {
    const command = new PutItemCommand({
        TableName: config.tableName,
        Item: marshall(appointment),
    });
    await ddbClient.send(command);
};

export const UpdateAppointment = async (
    insuredId: string,
    scheduleId: number,
    status: "pending" | "completed"
): Promise<void> => {
    const command = new UpdateItemCommand({
        TableName: config.tableName,
        Key: marshall({ insuredId, scheduleId }),
        UpdateExpression: "SET #status = :status",
        ExpressionAttributeNames: {
            "#status": "status",
        },
        ExpressionAttributeValues: {
            ":status": { S: status },
        },
    });

    await ddbClient.send(command);
};
