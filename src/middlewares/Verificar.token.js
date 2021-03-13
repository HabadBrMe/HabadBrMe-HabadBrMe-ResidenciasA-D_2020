/**
 * @fileoverview Configuracion del Middleware de token de autenticacion
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Middleware_token
 * 
 * @requires ../models/users
 * @requires jsonwebtoken
 */
const {VerifyUser, comparePass} = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    
    /**
     * Funcion verificar la existencias del token
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {403} si no hay Bearer token en la solicitud
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    async verify (req, res, next){
        const header = req.headers['authorization'];
        
        if ( typeof header !== 'undefined' ){
            const headertoken = header.split(" ")[1];
            req.token = headertoken;
            next();
        }else{
            return res.status(401).json(
                {
                    code: 401,
                    status: 'Failed', 
                    message:'No autorizado'
                }).end();
        }
    },

    /**
     * Funcion verificar informacion de usuario del token 
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si Bearer Token no es valido 
     * @code {400} si datos de usuario del toke incorrectos
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns next() 
     */
    async verifyUserToken (req, res, next){
        const tokenUse = req.token;

        try {
            var decoded = await jwt.verify( tokenUse, process.env.JWT_SECRET);
        } catch(err) {
            console.log(err);
            return res.status(400).send(err).end();
        }

        const user = await VerifyUser(decoded.id, decoded.name);
        
        if ( !user ) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Datos de usuario incorrectos'
            }).end();
        
console.log(user);
        req.iduser = decoded.id;
        req.nameuser = decoded.name;
        next();
        
    },

    /**
     * Funcion verificar informacion de usuario administrador del token 
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si Bearer Token no es valido 
     * @code {400} si datos de usuario del toke incorrectos
     * @code {403} si no es un usuario administrador
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns next() 
     */
    async verifyAdminToken (req, res, next){
        const tokenUse = req.token;

        try {
            var decoded = await jwt.verify( tokenUse, process.env.JWT_SECRET);
        } catch(err) {
            console.log(err);
            return res.status(400).send(err).end();
        }
        const user = await VerifyUser(decoded.id, decoded.name);
        
console.log(user, decoded);
        
        if ( !user ) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Datos de usuarios incorrectos'
            }).end();
        
        const rol = await comparePass('Administrador', user.rol);

console.log(decoded, rol);
        
        if (!rol) return res.status(403).json(
            {
                code: 403,
                status: 'Failed', 
                message:'Acceso restringido'
            }).end();
        
        req.iduser = decoded.id;
        req.nameuser = decoded.name;
        next();

    }
};