import { handler } from '../../src/handlers/appointment';
import * as app from '../../src/application';

jest.mock('../../src/application');

describe('Appointment Handler - POST - PE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar 201 cuando se agenda correctamente', async () => {
    const mockMessage = 'Agendamiento exitoso';
    (app.Scheduling as jest.Mock).mockResolvedValue(mockMessage);

    const postEvent = {
      resource: '/appointment',
      path: '/appointment', 
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      requestContext: {
        httpMethod: 'POST',
        http: {
          method: 'POST'
        }
      },
      body: JSON.stringify({
        insuredId: "031122",
        scheduleId: 123,
        countryISO: "PE"
      }),
      isBase64Encoded: false
    };

    const result: any = await handler(postEvent as any, {} as any, () => {});

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      message: mockMessage
    });
    expect(app.Scheduling).toHaveBeenCalledWith(postEvent);
  });
});
