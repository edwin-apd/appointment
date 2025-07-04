import { handler } from '../../src/handlers/appointment';
import * as app from '../../src/application';

jest.mock('../../src/application');

describe('Appointment Handler - SQS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar 201 cuando el mensaje SQS se procesa correctamente', async () => {
    const mockMessage = 'Atención confirmada';
    (app.Attended as jest.Mock).mockResolvedValue(mockMessage);

    const sqsEvent = {
      Records: [
        {
          messageId: '8a19840f-ff61-485d-aadc-1fca15e03968',
          receiptHandle: 'some-receipt-handle',
          body: JSON.stringify({
            version: '0',
            id: 'f88d7dac-cea0-3577-bae0-e55954a34c84',
            'detail-type': 'AppointmentConfirmed',
            source: 'appointment.pe',
            account: '621402808739',
            time: '2025-07-04T21:46:35Z',
            region: 'us-east-1',
            resources: [],
            detail: {
              insuredId: '031122',
              scheduleId: 123,
              countryISO: 'PE',
            }
          }),
          attributes: {},
          messageAttributes: {},
          md5OfBody: '025e8447422b021441e6ef16f20d52c1',
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:us-east-1:621402808739:appointment-result-sqs',
          awsRegion: 'us-east-1'
        }
      ]
    };

    const result: any = await handler(sqsEvent as any, {} as any, () => {});

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      message: mockMessage
    });
    expect(app.Attended).toHaveBeenCalledWith(sqsEvent);
  });
});
