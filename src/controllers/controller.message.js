/**
 * @fileoverview Configuracion del Controlador de mensajes
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Controller_message
 * 
 * @requires Model_Messages
 * @requires Service_Cloudinary
 * @requires Service_Twilio
 */
const DBsave = require('../models/messages');
const WhatSendSMS = require('../twilio/index');
const CludSaveRExt = require('../cloudinary/index');


    
    /**
     * Funcion enviar el mensaje
     * module:Controller_message.UploadMessage
     * @async  
     * @function
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si se ha conpleta el proceso completo.
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */ 
    const UploadMessage = async (req, res) =>{
        const {message, origin, destination_number} = req.body;
        const targetuserid= req.targetuserid;
        const cloud = await CludSaveRExt.saveCloud(req.file.path);
        var textFull = message + ' Recurso ext: ';
    
        if(cloud.errores){
            textFull= origin + ", " + textFull + cloud.errores;
        }else{
            textFull= origin + ", " + textFull + cloud;
        }

        const sms = await WhatSendSMS.sendMessage(destination_number, textFull);
        var dbsave;
        if(sms.errores){
            dbsave = await DBsave.SaveMessage(message, targetuserid, cloud, sms, sms);    
        }else{
            dbsave = await DBsave.SaveMessage(message, targetuserid, cloud, sms.sid, sms.status);
        }
        

        return res.status(201).json(
            {
                code: 201,
                status: 'True', 
                message:'Mensaje Enviado y registrado'
            }).end();
    }

    /**
     * Funcion enviar el mensaje
     * module:Controller_message.UploadMessage
     * @async  
     * @function
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si se ha conpleta el proceso completo.
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */ 
 const GetMessages = async (req, res) =>{
    
    const data = await DBsave.GetFullMessages();
console.log(data);
    return res.status(201).json(
        {
            code: 201,
            status: 'True', 
            message:'Mensaje Enviado y registrado',
            data
        }).end();
}

    /**
     * Funcion prueba de UploadMessage
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si la prueba ha sido completada
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}} respuesta del controlador
     */
    const TestMessage = async (req, res) => {
        const {message} = req.body;
console.log(req.file);
        const cloud = req.file.path;
        const now = await Date();
        const sid = '124587665';
        const status = 'accep' ;
        const targetuserid= req.targetuserid;
        var data = {
            message, 
            targetuserid,
            cloud, 
            sid, 
            date: now,
            status
        };
        const dbsave = await DBsave.SaveMessage(message, targetuserid, cloud, sid, status); 
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Test de mensaje completado', 
                data ,
                dbsave
            }).end();
    }
    module.exports = { UploadMessage, TestMessage, GetMessages};