import { handler } from '../../src/handlers/appointment_pe';
import * as app from '../../src/application';

jest.mock('../../src/application');

describe('AppointmentPE Handler - SQS con SNS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería procesar correctamente el mensaje SNS dentro de SQS', async () => {
    const mockAppointment = {
      scheduleId: 183,
      insuredId: '031122',
      countryISO: 'PE',
      status: 'pending'
    };

    const snsWrappedMessage = {
      Type: 'Notification',
      MessageId: '7b9d7746-0954-58e9-ab2b-17a45954959f',
      TopicArn: 'arn:aws:sns:us-east-1:621402808739:appointment-topic',
      Message: JSON.stringify(mockAppointment),
      Timestamp: '2025-07-04T21:55:12.348Z',
      SignatureVersion: '1',
      Signature: 'some-signature',
      SigningCertURL: 'https://sns.us-east-1.amazonaws.com/SimpleNotificationService.pem',
      UnsubscribeURL: 'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe',
      MessageAttributes: {
        countryISO: { Type: 'String', Value: 'PE' }
      }
    };

    const sqsEvent = {
      Records: [
        {
          messageId: 'msg-123',
          body: JSON.stringify(snsWrappedMessage),
          attributes: {},
          messageAttributes: {},
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:us-east-1:621402808739:SQS_PE',
          awsRegion: 'us-east-1'
        }
      ]
    };

    await handler(sqsEvent as any, {} as any, () => {});

    const expectedAppointment = {
      insuredId: '031122',
      scheduleId: 183,
      countryISO: 'PE'
    };

    expect(app.savedRecord).toHaveBeenCalledWith('PE', expectedAppointment);
    expect(app.publishAppointmentConfirmed).toHaveBeenCalledWith('appointment.pe', expectedAppointment);
  });
});
