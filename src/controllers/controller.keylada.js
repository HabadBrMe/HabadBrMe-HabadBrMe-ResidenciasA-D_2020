/**
 * @fileoverview Configuracion de Controlador de claves de lada
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Controller_keylada
 * 
 * @requires Model_keylada
 */
const DB = require('../models/keylada');

module.exports = {
    
    /**
     * Funcion registrar una nueva clave-lada en el sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {400} si clave-lada ya esta registrada
     * @code {201} si se registra con exito clave-lada
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async Newlada (req, res) {
        const {key, description} = req.body;
        const keyfound = await DB.Verify(key);
        if(keyfound) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Error lada ya resistrada'
            }).end();
        const lada = await DB.CreateNew(key, description);
console.log(lada);
        if (lada) return res.status()
        return res.status(201).json(
            {
                code: 201,
                status: 'True', 
                message:'Nueva clave-lada guardada'
            }).end();
    },
    
    /**
     * Funcion obtener todos los registros de claves-lada del sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si se envian todas los registros
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async Getladas (req, res) {
        const lada = await DB.GetFull();
        console.log(lada);
        var data ={
            lada
        }
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Proceso completado',
                data
            }).end();
    },

    /**
     * Funcion actualizar una clave-lada.
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si la clave-lada ha sido actualizada.
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async Putlada (req, res) {
        const id = req.params.id;
        const {key, description} = req.body;
        const lada = await DB.Update(id, key, description);
        console.log('id lada : ',id);
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Lada editada'
            }).end();
    },

    /**
     * Funcion borrar una clave-lada.
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si la clave-lada ha sido borrada.
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     * 
     */
    async Dellada (req, res) {
        const id = req.params.id;
        if (!id) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Falta id de la lada'
            }).end();
        const lada = await DB.Delete(id);
        console.log(lada);
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Lada eliminada'
            }).end();
    }

};