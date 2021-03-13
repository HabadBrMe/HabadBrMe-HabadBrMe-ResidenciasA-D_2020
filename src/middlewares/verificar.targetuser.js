/**
 * @fileoverview Configuracion del Middleware de usuarios receivers
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Middleware_receiver
 * 
 * @requires Getrelacion:../models/receivers
 */
const {Getrelacion} = require('../models/targetusers');
module.exports = {

    /**
     * Funcion verificar receiver en la base de datos
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si datos del emisor y receptor no concuerdan
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    async verifyDB (req, res, next){
        const {destination_number, origin} = req.body;
        const iduser = req.iduser;
        const targetuserfound = await Getrelacion(destination_number.substr(3,10), origin, iduser);
        if ( !targetuserfound ) return res.status(400).json(
                {
                    code: 400,
                    status: 'Failed', 
                    message:'No existe relacion numero de destino y origen'
                }).end();
console.log(targetuserfound);
        req.targetuserid= targetuserfound.targetuser_id;
        next();
        
    },

    /**
     * Funcion verificar los datos del receiver
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si longitud del emisor mayor a 10
     * @code {400} si longitud del transmisor es meyor a 20
     * @code {400} si datos del emirosr y trasmisor estan vacios
     * @code {400} si faltan datos en la solicitud
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    verifyFormat (req, res ,next){
        const {destination_number, origin} = req.body;
        if(destination_number && origin){
            if(destination_number!== ' ' && origin !== ' '){
                if(destination_number.length === 10){
                    if(origin.length < 20){
                        next();
                    }else{
                        res.status(400).send('Longitud del origen demaciado largo').end();
                    }
                }else{
                    res.status(400).send('Longitud del numero telefono demaciado largo').end();
                }
            }else{
                res.status(400).send('Se requieren numero de telefono y origen').end();
            }
        }else{
            res.status(400).send('Faltan formatos o datos de la peticion').end();
        }
    },

    /**
     * Funcion verificar formato del id del usaurio destiono
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si id del usuario destino no esta definido o es nulo
     * @code {400} si id del usuario destino no es un numero
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    verifyParamsFormat (req, res ,next){
        const id = req.params.id;
        if (!id || id === ' ') return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Falta id del usuario destino'
            }).end();
        if (!id.match(/^[0-9]+$/)) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Id del usuario destino no es un numero'
            }).end();
        next();
    }
};