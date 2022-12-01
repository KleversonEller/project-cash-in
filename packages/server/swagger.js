const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/doc/output.json';
const endpointsFiles = ['./src/routers/user.routes.ts']

swaggerAutogen(outputFile, endpointsFiles)
