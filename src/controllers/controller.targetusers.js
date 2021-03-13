/**
 * @fileoverview Configuracion del Controlador de usuarios destinos
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Controller_receiver
 * 
 * @requires Model_Receivers
 * 
 */
const DB = require('../models/targetusers');
const lada = require('../models/keylada');

module.exports = {
    
    /**
     * Funcion crear un nuevo usuario destino en el sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {400} si el numero de telefono y el origen ya estan registrados
     * @code {200} si se registro nuevo usuario destino
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
    */ 
    async Newreceiver (req, res) {
        const {destination_number, origin} = req.body;
        const iduser = req.iduser;

        const targetuserfound = await DB.Getrelacion(destination_number.substr(3,10), origin, iduser);
console.log('creando', targetuserfound)
        if(targetuserfound) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Numero de telefono y origen ya resistrada'
            }).end();
        const ladafound = await lada.Verify(destination_number.substr(0,3));
        if(!ladafound) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'clave-lada no soportada por el sistema'
            }).end();
        const result = await DB.CreateNew(destination_number.substr(3,10), origin, ladafound.keylada_id, iduser);
console.log(result);
        
        return res.status(201).json(
            {
                code: 201,
                status: 'True', 
                message:'Nuevo usuario destino guardado'
            }).end();
    },

    /**
     * Funcion obtener todos los usuarios destinos del usurio del sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si se obtiene todos los registros
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
    */ 
    async Getreceivers (req, res) {
        const iduser = req.iduser;
        const data = await DB.GetFull(iduser);
console.log(data);
        
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Proceso completado',
                data
            }).end();
    },


    /**
     * Funcion actualizar el registro de un usuario destino
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si actulizo el registro
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
    */ 
    async Putreceiver (req, res) {
        const {destination_number, origin} = req.body;
        const id = req.params.id;
        const iduser = req.iduser;
        
        const ladafound = await lada.Verify(destination_number.substr(0,3));
        if(!ladafound) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'clave-lada no soportada por el sistema'
            }).end();
        const result = await DB.Update(id, destination_number.substr( 3 , 10 ), origin, ladafound.keylada_id, iduser);
console.log(result);
        
        if (result.rowCount == 0) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Actualizacion fallida usuario destino no encontrado'
            }).end();
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Actualizacion exitosa'
            }).end();
    },

    /**
     * Funcion de eliminacion del usuario destino
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {string | number} req.params.id id del usuario destino
     * @param {string | number} req.iduser id del usuario del sistema
     * @code {400} si no se elimino el usuario destiono
     * @code {200} si se elimino el usuario destiono
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
    */ 
    async Delreceiver (req, res) {
        const id = req.params.id;
        const iduser = req.iduser;

        const result = await DB.Delete(id, iduser);
console.log(result);
        
        if( result.rowCount == 0) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Eliminacion fallida usuario destino no encontrado'
            }).end();
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Eliminacion exitosa'
            }).end();
    }

};