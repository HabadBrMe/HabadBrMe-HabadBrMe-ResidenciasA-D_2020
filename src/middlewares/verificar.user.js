const { user } = require("../db/conexion");

/**
 * @fileoverview Configuracion del Middleware de usuarios
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Middleware_user
 */
module.exports = {

    /**
     * Funcion verificar en la base de datos
     * @function
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si falta nombre del usuario
     * @code {400} si falta contraseña del usuario
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    verifyFormat (req, res, next){
        const {user_name, password} = req.body;

        if( !user_name ) 
            return res.status(400).json(
                {
                    code: 400,
                    status: 'Failed', 
                    message:'Falta nombre de usuario (correo electronico)'
                }).end();
                
        const emailGoogle = user_name.split("@")[1];
        
        if( emailGoogle.toLowerCase() !== 'gmail.com' ) 
            return res.status(400).json(
                {
                    code: 400,
                    status: 'Failed', 
                    message: 'El correo no tiene el formado de ejemplo@gmail.com'
                }).end();

        if( !password ) 
            return res.status(400).json(
                {
                    code: 400,
                    status: 'Failed', 
                    message:'Falta contraseña del usuario'
                }).end();
    var mayuscula = false;
    var minuscula = false;
    var numero = false;
    var caracter_raro = false;
    
    for(var i = 0;i<password.length;i++)
    {
        if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)
        {
            mayuscula = true;
        }
        else if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
        {
            minuscula = true;
        }
        else if(password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
        {
            numero = true;
        }
        else
        {
            caracter_raro = true;
        }
    }
    
    if(!mayuscula && !minuscula && !caracter_raro && !numero ) return res.status(400).json(
        {
            code: 400,
            status: 'Failed', 
            message:'La contraseña del usuario debe de tener al menos, un numero, un simbolo, una letra mayuscula y menuscula',
            data: {
                mayuscula,
                minuscula,
                caracter_raro,
                numero
            }
        }).end();
    
        
        if( password.length < 10 ) 
            return res.status(400).json(
                {
                    code: 400,
                    status: 'Failed', 
                    message:'La contraseña del usuario es demaciada corta'
                }).end();
        
        next();
    }
}