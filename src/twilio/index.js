/**
 * @fileoverview Configuracion y metodos del servicio Twilio
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Service_Twilio
 * 
 * @see {@link https://www.twilio.com/docs/api}
 * 
 * @requires dotenv
 * @requires twilio
 */
require('dotenv').config();

/**
 * Configuracion de la conexion de Twilio
 * @typedef {Object} client
 * @property {string} countSid codigo Sid de Twilio
 * @property {string} authToken codigo autenticacion de Twilio
 */

/**
 * @type {client}
 */
const client = require('twilio')(process.env.TWILIO_ASID, process.env.TWILIO_TOKEN);


/**
   * Funcion subir una recurso externo en cloudinary
   * @async
   * @function
   * @param {string|number} numberTO    numero del usuario receiver
   * @param {string} text   texto del mensaje
   * @returns {object} resultado de la consulta
   */
async function sendMessage(numberTO, text){

    try{
        
        const sms = await client.messages.create({
            body: text,
            to: 'whatsapp:+521'+ numberTO,
            from: 'whatsapp:+14155238886'
        })

        return sms;

    }catch (error){

        const data={
            errores : 'Error '+error.status
        };
        
        return data;
    }
}

module.exports = {sendMessage};