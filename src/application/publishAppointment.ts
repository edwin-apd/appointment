import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { AppointmentMysqlModel } from '../domain';

const eventBridge = new EventBridgeClient();

export const publishAppointmentConfirmed = async (source: 'appointment.pe' | 'appointment.cl', appointment: AppointmentMysqlModel) => {
    await eventBridge.send(
        new PutEventsCommand({
            Entries: [
                {
                    Source: source,
                    DetailType: 'AppointmentConfirmed',
                    Detail: JSON.stringify(appointment),
                    EventBusName: 'default'
                }
            ]
        })
    );
};
