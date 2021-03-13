/**
 * @fileoverview Configuracion del Modelo de usuarios
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Model_Users
 * 
 * @requires Service_Conexion_PostgreSQL
 */
const pool = require("../db/conexion");
const bcrypt = require('bcryptjs');


module.exports = {
    
    /**
     * Funcion encriptar una palabra con bcryptjs
     * @param {string} password palabra a encriptar
     * @returns {string} cadena encritada
     */
    async encryptPass(password){
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },

    /**
     * Funcion para comparar 2 cadenas con bcryptjs
     * @param {string} password palabra a comparar
     * @param {string} encryPassword palabra encriptar
     * @returns {boolean} boolean de la comparacion
     */
    async comparePass(password, encryPassword){
        return await bcrypt.compare(password, encryPassword);
    },

    /**
     * Funcion crear nuevo usuario del sistema
     * @param {string} name nombre del usuario
     * @param {string} password contraseña del usuario
     * @param {string} rol rol del usuario
     * @returns {object} resultado de la consulta 
     */
    async CreateNew(name, password, rol){
        const result = await pool.query('INSERT INTO users (name, password, rol) VALUES ($1, $2, $3)',
        [name.toLowerCase(), password, rol]);
        return result; 
    },

    /**
     * Funcion obtener todos los Usuarios del sistema
     * @returns {object} resultado de la consulta 
     */
    async GetFull() {
        const result = pool.query('select * from users');
        return result.rows;
    },

    /**
     * Funcion buscar en la DB la existencias por nombre de usuario
     * @param {string} name nombre del usuario
     * @returns {object} resultado de la consulta 
     */
    async GetUserName(name){
        console.log('Guardando DB');
        const result = await pool.query('select * from users where name = $1', [name.toLowerCase()]);
        return result.rows[0]; 
    },

    /**
     * Funcion buscar en la DB la existencias por id de usuario
     * @param {string} id id del usuario
     * @returns {object} resultado de la consulta 
     */
    async GetUserID(id){
        console.log('Guardando DB');
        const result = await pool.query('select * from users where user_id = $1', [id]);
        return result.rows[0]; 
    },

    /**
     * Funcion verificar la existencias de un usuario del sistema con id y name
     * @param {string} name nombre del usuario
     * @param {number} id id del usuario
     * @returns {object} resultado de la consulta 
     */
    async VerifyUser(id, name){
        const result = await pool.query('select * from users where user_id = $1 AND name = $2', 
        [id, name.toLowerCase()]);
        return result.rows[0]; 
    },

    /**
     * Funcion actualizar informacion del usuario del sistema
     * @param {number} id id del usuario
     * @param {string} user_name nombre del usuario
     * @param {string} password contraseña del usuario
     * @returns {object} resultado de la consulta 
     */
    async Update(id, name, password) {
        const result = pool.query('update users set name = $1, password = $2 where  user_id  = $3', 
        [name.toLowerCase(), password, id]);
        return result;
    },

    /**
     * Funcion eliminar un usuario del sistema
     * @param {number} id id del usuario
     * @returns {object} resultado de la consulta 
     */
    async Delete(id) {
        const result = pool.query('delete from users where user_id  = $1', [id]);
        return result;
    },
};