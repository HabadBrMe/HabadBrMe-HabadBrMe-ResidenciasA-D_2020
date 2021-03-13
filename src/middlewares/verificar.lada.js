/**
 * @fileoverview Configuracion del Middleware de claves de ladas
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Middleware_lada
 * 
 * @requires Verify:../models/keylada
 */
const {Verify} = require('../models/keylada');

module.exports = {
    
    /**
     * Funcion verificar en la base de datos
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si no existe la lada en el sistema
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    async VerifyDB (req, res, next){
        const {destination_number} = req.body;
        const lada = await Verify(destination_number.substr(0,3));
        
        if ( !lada ) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Lada no soportada por el sistema'
            }).end();
        
        next();
    },

    /**
     * Funcion verificar en la base de datos
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si faltan datos en la solicitud
     * @code {400} si datos estan vacios en la solicitud
     * @code {400} si longitud de la clave no es 3 o 2
     * @code {400} si longitud de la ddescripcion desmaciado largo 
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    verifyFormat (req, res ,next){
        const {key, description} = req.body;
        
        if(!key && !description) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Faltan formatos o datos de la peticion'
            }).end();
        
        if(key === ' ' && description === ' ') return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Faltan datos en la peticion'
            }).end();

        if (!key.match(/^[0-9]+$/) ) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'La clave-lada debe de ser numeros'
            }).end();

        if(key.length === 3 || key.length === 2) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Formato de la dala incorrecto'
            }).end();
        
        if(description.length > 25) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Descripcion desmaciado largo'
            }).end();

        next();
    }
};