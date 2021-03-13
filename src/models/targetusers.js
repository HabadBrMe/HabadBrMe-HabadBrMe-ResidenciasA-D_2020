 /**
 * @fileoverview Configuracion del Modelo de usuarios destinos
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Model_Receivers
 * 
 * @requires pool 
 */
const pool = require("../db/conexion");

module.exports = {

    /**
     * Funcion crear nuevo usuario receiver
     * @param {string | number} number_phone numero del usuario destino
     * @param {string} origin nombre o codigo del origen
     * @param {number} lada lada del numero del usuario destino
     * @param {number} userid id del usuario del sistema
     * @returns {object} resultado de la consulta
     */
    async CreateNew(number_phone, origin, lada, userid){
        const result = await pool.query('INSERT INTO targetusers (destination_number, origin, keylada_id, user_id) VALUES ($1, $2, $3, $4)',
        [number_phone, origin, lada, userid]);
        return result; 
    },

    /**
     * Funcion obtener todos los usuario receivers solo del usuario del sistema actual
     * @param {number} iduser id el usuario del sistema 
     * @returns {object} resultado de la consulta
     */
    async GetFull(iduser) {
        const result = await pool.query('select targetusers.targetuser_id, targetusers.destination_number, targetusers.origin, keyslada.key from targetusers, keyslada where user_id = $1 AND targetusers.keylada_id = keyslada.keylada_id',[iduser]);
        return result.rows;
    },

    /**
     * Funcion obtener y verificar el usuario destino del usuario del sistema
     * @param {string | number} number_phone numero del usuario destino
     * @param {string | number} iduser id del usuarios del sistema
     * @returns {object} resultado de la consulta
     */
    async GetReceivers(number_phone, iduser) {
        const result = await pool.query('select * from targetusers  where destination_number = $1 AND user_id = $2', 
        [number_phone, iduser]);
        return result.rows[0];
    },

    /**
     * Funcion obtener y verificar el numero destino con el id del registro y id del usuario
     * @param {string | number} id id le registro del numero destino
     * @param {string | number} iduser id del usuarios del sistema
     * @returns {object} resultado de la consulta
     */
    async GetTargetUser(number_phone) {
        const result = await pool.query('select * from targetusers  where destination_number = $1', 
        [number_phone]);
        return result.rows[0];
    },

    /**
     * Funcion verificar la relacion de numero y transmitter del usuario destino
     * @param {string | number} number_phone numero del usuario destino
     * @param {string} origin nombre o codigo del origen
     * @param {number} iduser id el usuario del sistema 
     * @returns {object} resultado de la consulta
     */
    async Getrelacion(number_phone, origin, userid){
        const result = await pool.query('select * from targetusers where destination_number = $1 AND origin = $2 AND user_id = $3', 
        [number_phone, origin, userid]);
        return result.rows[0]; 
    },

    /**
     * Funcion actualizar datos de un usuario receivers
     * @param {number} id id del usuario receiver
     * @param {string | number} number_phone numero del usuario destino
     * @param {string} transmitter nombre o codigo del origen
     * @param {number} iduser id el usuario del sistema 
     * @returns {object} resultado de la consulta
     */
    async Update(targetuser_id, number_phone, origin, lada, userid) {
        const result = pool.query('update targetusers set destination_number = $1, origin = $2, keylada_id = $3 where targetuser_id = $4 AND user_id = $5 ', 
        [number_phone, origin, lada, targetuser_id, userid]);
        return result;
    },

    /**
     * Funcion eliminacion de un usuario destino
     * @param {number} id id del usuario destino
     * @param {number} iduser id el usuario del sistema 
     * @returns {object} resultado de la consulta
     */
    async Delete(id, userid) {
        const result = pool.query('delete from targetusers where targetuser_id = $1 AND user_id = $2', 
        [id, userid]);
        return result;
    },
};