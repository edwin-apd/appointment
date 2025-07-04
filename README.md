<!--
title: 'Ejemplo de Endpoint HTTP Simple con AWS y NodeJS'
description: 'Esta plantilla demuestra cómo crear una API HTTP simple usando Node.js, AWS Lambda y API Gateway con el framework Serverless.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# API HTTP con Serverless Framework y Node.js en AWS

Este proyecto demuestra cómo construir una API HTTP simple utilizando **Node.js**, **AWS Lambda** y **API Gateway**, con el **framework Serverless**. Es ideal como punto de partida para construir microservicios o backends sin servidor (serverless).

> 🔧 Esta plantilla no incluye persistencia de datos (como bases de datos). Para ejemplos más completos con TypeScript, MongoDB, DynamoDB, etc., puedes revisar el repositorio de ejemplos oficiales: [serverless/examples](https://github.com/serverless/examples/).

---

## 🚀 Despliegue

Para desplegar esta API en AWS, ejecuta el siguiente comando en la raíz del proyecto:

```bash
serverless deploy
```

Después del despliegue, verás una salida similar a esta:

```bash
Deploying "appointment-api" to stage "dev" (us-east-1)

✔ Servicio desplegado en el stack appointment-api-dev (91s)

endpoint: GET  - https://4aggsev0f5.execute-api.us-east-1.amazonaws.com/dev/appointment  
         POST - https://4aggsev0f5.execute-api.us-east-1.amazonaws.com/dev/appointment

functions:
  handler: appointment-api-dev-handler (3.4 kB)
```

> ⚠️ Nota: Por defecto, la API es pública. Si deseas protegerla para entornos productivos, puedes configurar autenticación mediante authorizers. Consulta [la documentación de HTTP API (API Gateway V2)](https://www.serverless.com/framework/docs/providers/aws/events/http-api).

---

## 📡 Invocación de la API

Una vez desplegada, puedes probar tu API con `curl` o Postman.

### Obtener citas médicas:

```bash
curl --location 'https://4aggsev0f5.execute-api.us-east-1.amazonaws.com/dev/appointment'
```

### Crear una nueva cita médica:

```bash
curl --location 'https://4aggsev0f5.execute-api.us-east-1.amazonaws.com/dev/appointment' \
--header 'Content-Type: application/json' \
--data '{
  "insuredId": "031122",
  "scheduleId": 183,
  "countryISO": "CL"
}'
```

---

## 📁 Estructura del proyecto (ejemplo)

```bash
.
├── src/
│   ├── application/
│   │   └── attended.ts
│   │   └── getAppointments.ts
│   │   └── index.ts
│   │   └── publishAppointment.ts
│   │   └── savedRecord.ts
│   │   └── scheduling.ts
│   ├── domain/
│   │   └── interfaces
│   │   │   └── appointmentResponse.ts
│   │   └── models
│   │   │   └── dynamo
│   │   │   │   └── index.ts
│   │   │   └── mysql
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── handlers/
│   │   └── appointment_cl.ts
│   │   └── appointment_pe.ts
│   │   └── appointment.ts
│   └── infrastructure/
│       └── config
│       │   └── index.ts
│       └── dynamoClient
│       │   └── index.ts
│       └── mysqlClient
│       │   └── cl
│       │   │   └── index.ts
│       │   └── pe
│       │   │   └── index.ts
│       │   └── index.ts
│       └── index.ts
├── test/
│   ├── application/
│   │   └── appointment_get.test.ts
│   │   └── appointment_post_cl.test.ts
│   │   └── appointment_post_pe.test.ts
│   │   └── appointment_sqs.test.ts
│   ├── application/
│   │   └── appointment_cl_sqs.test.ts
│   └── infrastructure/
│       └── appointment_pe_sqs.test.ts
├── jest.config.ts
├── openapi.yaml
├── package-lock.json
├── package.json
├── README.md
├── serverless.yml
└── tsconfig.json
```

---

## 🛠️ Requisitos

- Node.js v18+ o v20+
- Cuenta en AWS con permisos para Lambda y API Gateway
- Serverless Framework v3 o v4
  ```bash
  npm install -g serverless
  ```

---

## 📄 Licencia

Este proyecto se proporciona con fines educativos y de desarrollo. Puedes adaptarlo libremente a tus necesidades.

---
