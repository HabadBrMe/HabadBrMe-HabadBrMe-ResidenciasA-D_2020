 /**
 * @fileoverview Archivo de configuracion del Swagger
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @see {@link https://github.com GitHub}
 * 
 * @module Swagger-Config
 * 
 * @requires swagger-jsdoc
 * @requires pkg
 */
const swaggerJSDoc = require('swagger-jsdoc');
const pkg = require('../../package.json');

/**
 * Variable de configuracion swaggerDefinition
 * @type {object}
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Servidor en Desarrollo',
    },
  ],
  components:{
    securitySchemes:{
      bearerAuth:{
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingrese el token bearer de autenticacion'
      }
    }
  }
};

/**
 * Variable de configuracion ontions
 * @type {object}
 */
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

/**
 * Variable de configuracion swagggerSpec
 * @type {object}
 */
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;