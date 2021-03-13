/**
 * @fileoverview Configuracion del Middleware de mensajes
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Middleware_message
 * 
 */
module.exports = {
    
    /**
     * Funcion verificar los datos para el modulo de message
     * @async
     * @function  
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @param {express.NextFunction} next Argumento de devolución de llamada
     * @code {400} si faltan datos en la solicitud
     * @code {400} si datos estan vacios en la solicitud
     * @code {400} si largo del mensaje es mayor a 100
     * @code {400} si largo del numero telefonico es mayor a 10
     * @code {400} si el numero telefonico contiene otros caractes no numericos
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {Object} next() funcion devolucion del middleware
     */
    verifyMessage (req, res, next){
        const {message, destination_number, origin} = req.body;
        const archivo = req.file;
console.log(archivo);

        if ( !message  && !destination_number && !origin && !archivo ) 
            return res.status(400).json({
                    code: 400,
                    status: 'Failed', 
                    message: 'Faltan datos de la peticion'
                }).end();
        
        if( message === ' ' && destination_number === ' ' && origin === ' ' ) 
            return res.status(400).json({
                code: 400,
                status: 'Failed',
                message: 'Faltan datos estan vacios'
            }).end();
        
        if ( message.length > 100 ) 
            return res.status(400).json({
                code: 400,
                status: 'Failed',
                message: 'Texto del Mensaje demaciado largo'
            }).end();
        
        if ( destination_number.length !== 10 ) 
            return res.status(400).json({
                code: 400,
                status: 'Failed',
                message: 'Numero telefonico debe de ser 10 digitos'
            }).end();
        
        if ( !destination_number.match(/^[0-9]+$/) )
            return res.status(400).json({
                code: 400,
                status: 'Failed',
                message: 'Numero telefonico debe de ser numeros'
            }).end();
        
        next();
    }

};