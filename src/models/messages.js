 /**
 * @fileoverview Configuracion del modelo de mensajes
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Model_Messages
 * 
 * @requires ./db/conexion
 */
const pool = require("../db/conexion");

module.exports = {

    /**
     * Funcion guardar un registro del mensaje en la DB
     * @param {string} message
     * @param {string} origin nombre o codigo del origen
     * @param {string|number} targetuserid numero de telefono del usuario destino
     * @param {string} url direccion web del recurso
     * @param {string | number} sid id del mensaje por whatsapp
     * @param {string} status estado del mensaje por whatsapp
     * @returns {object} resultado de la consulta
     */
    async SaveMessage(message, targetuserid, url, sid, status){
        const now = await Date.now();
        console.log('Guardando DB');
        await pool.query('INSERT INTO messageslog (text, targetuser_id, cloud_url, twilio_sid, date, status) VALUES ($1, $2, $3, $4, to_timestamp($5 / 1000.0), $6)', 
        [message, targetuserid, url, sid, now,  status]);  
    },

    /**
     * Funcion obtener todos los registros de mensajes
     * @returns {object} resultado de la consulta
     */
    async GetFullMessages() {
        const resultados = await pool.query('select * from messageslog');
        return resultados.rows;
    },

};