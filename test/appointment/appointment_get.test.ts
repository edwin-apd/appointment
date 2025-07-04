import { handler } from '../../src/handlers/appointment';
import * as app from '../../src/application';

jest.mock('../../src/application');

describe('Appointment Handler - GET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar 200 con las citas', async () => {
    const mockAppointments = [
      {
        scheduleId: 1,
        insuredId: '123',
        countryISO: 'PE',
        status: 'pending'
      },
      {
        scheduleId: 2,
        insuredId: '456',
        countryISO: 'CL',
        status: 'confirmed'
      }
    ];

    // Mockea la función GetAppointments
    (app.GetAppointments as jest.Mock).mockResolvedValue(mockAppointments);

    const event = {
      resource: '/appointment',
      path: '/appointment',
      httpMethod: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-ASN': '272836',
        'CloudFront-Viewer-Country': 'PE',
        Host: '4aggsev0f5.execute-api.us-east-1.amazonaws.com',
        'Postman-Token': '6b297320-a17d-4a3c-9de7-c47706ce5e5f',
        'User-Agent': 'PostmanRuntime/7.44.1',
        Via: '1.1 af3d2c4aae84cb3609a51b4e8756647a.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': '5JWl0OWa62uSS6kOdYuwptY5tqgbWsgTWvDbBj2fJ_n4IPf3O84jTQ==',
        'X-Amzn-Trace-Id': 'Root=1-68684969-26ebeeb0210dde553c026feb',
        'X-Forwarded-For': '38.56.215.96, 18.68.11.12',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
      },
      multiValueHeaders: {
        Accept: ['*/*'],
        'Accept-Encoding': ['gzip, deflate, br'],
        'CloudFront-Forwarded-Proto': ['https'],
        'CloudFront-Is-Desktop-Viewer': ['true'],
        'CloudFront-Is-Mobile-Viewer': ['false'],
        'CloudFront-Is-SmartTV-Viewer': ['false'],
        'CloudFront-Is-Tablet-Viewer': ['false'],
        'CloudFront-Viewer-ASN': ['272836'],
        'CloudFront-Viewer-Country': ['PE'],
        Host: ['4aggsev0f5.execute-api.us-east-1.amazonaws.com'],
        'Postman-Token': ['6b297320-a17d-4a3c-9de7-c47706ce5e5f'],
        'User-Agent': ['PostmanRuntime/7.44.1'],
        Via: [
          '1.1 af3d2c4aae84cb3609a51b4e8756647a.cloudfront.net (CloudFront)'
        ],
        'X-Amz-Cf-Id': ['5JWl0OWa62uSS6kOdYuwptY5tqgbWsgTWvDbBj2fJ_n4IPf3O84jTQ=='],
        'X-Amzn-Trace-Id': ['Root=1-68684969-26ebeeb0210dde553c026feb'],
        'X-Forwarded-For': ['38.56.215.96, 18.68.11.12'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https']
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {
        resourceId: 'oildp8',
        resourcePath: '/appointment',
        httpMethod: 'GET',
        extendedRequestId: 'NNBofEQroAMEkSw=',
        requestTime: '04/Jul/2025:21:36:41 +0000',
        path: '/dev/appointment',
        accountId: '621402808739',
        protocol: 'HTTP/1.1',
        stage: 'dev',
        domainPrefix: '4aggsev0f5',
        requestTimeEpoch: 1751665001107,
        requestId: 'd5119333-c90a-4efd-80e0-29aaf4619831',
        identity: {
          cognitoIdentityPoolId: null,
          accountId: null,
          cognitoIdentityId: null,
          caller: null,
          sourceIp: '38.56.215.96',
          principalOrgId: null,
          accessKey: null,
          cognitoAuthenticationType: null,
          cognitoAuthenticationProvider: null,
          userArn: null,
          userAgent: 'PostmanRuntime/7.44.1',
          user: null
        },
        domainName: '4aggsev0f5.execute-api.us-east-1.amazonaws.com',
        deploymentId: '0jokfc',
        apiId: '4aggsev0f5'
      },
      body: null,
      isBase64Encoded: false
    };

    const result: any = await handler(event as any, {} as any, () => {});

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: 'OK',
      data: mockAppointments
    });
    expect(app.GetAppointments).toHaveBeenCalled();
  });
});
