/**
 * @fileoverview Configuracion y metodos del servicio PostgreSQL
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Service_Conexion_PostgreSQL
 * 
 * @see {@link https://www.npmjs.com/package/pg}
 * 
 * @requires dotenv
 * @requires pg
 */
require('dotenv').config();
const { Pool } = require('pg');

/**
 * Configuracion de la conexion de a la DB PostgreSQL
 * @typedef {Object} pool
 * @property {string} host direccion del servicio 
 * @property {string} user nombre de usuario
 * @property {string} password contraseña del usuario
 * @property {string} database nombre de la base de dato
 * @property {string|number} port numero de puerto
 */

 /**
  * @type {pool}
  */
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

module.exports = pool;