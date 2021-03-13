/**
 * @fileoverview Configuracion del Modelo de claves de ladas
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Model_keylada
 * 
 * @requires pool:/db/conexion.js
 * @requires bcryptjs
 */
const pool = require("../db/conexion");

module.exports = {

    /**
     * Funcion crear nueva clave de lada del sistema
     * @async
     * @function
     * @param {string} key clave de la lada
     * @param {string} description descripcion breve de la lada
     * @returns {object} resultado de la consulta
     */
    async CreateNew(key, description){
        const result = await pool.query('INSERT INTO keyslada (key, description) VALUES ($1, $2)',
        [key, description]);
        return result; 
    },
    /**
     * Funcion obtener todas las claves de lada del sistema
     * @returns {object} resultado de la consulta
     */
    async GetFull() {
        const result = await pool.query('select * from keyslada');
        return result.rows;
    },
    /**
     * Funcion verificar la exitencia de una clave de lada del sistema
     * @param {string} lada clave de la lada
     * @returns {object} resultado de la consulta
     */
    async Verify(lada){
        const result = await pool.query('select * from keyslada where key = $1', [lada]);
        return result.rows[0]; 
    },
    /**
     * Funcion actualizar una clave de lada del sistema
     * @param {string} id identificacion de la lada
     * @param {string} key clave de la lada
     * @param {string} description descripcion breve de la lada
     * @returns {object} resultado de la consulta
     */
    async Update(id, key, description) {
        const result = pool.query('update keyslada set key = $1, description = $2 where keylada_id = $3', 
        [key, description, id]);
        return result;
    },
    /**
     * Funcion eliminar una clave de lada del sistema
     * @param {string} id identificacion de la lada
     * @returns {object} resultado de la consulta
     */
    async Delete(id) {
        const result = pool.query('delete from keyslada where keylada_id = $1', 
        [id]);
        return result;
    },

};