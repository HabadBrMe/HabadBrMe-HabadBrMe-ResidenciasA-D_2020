/**
 * @fileoverview Configuracion del Controlador de usuarios
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Controller_user
 * 
 * @requires Model_Users
 * 
 */
const DB = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    
    /**
     * Funcion de acceso al sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {400} si el nombre de usuario no entrado en el sistema
     * @code {400} si el password no coincide con el usuario en el sistema
     * @code {200} si se permite el acceso y el token
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async login (req, res) {
        const {user_name, password} = req.body;
console.log(user_name.toLowerCase());
        const db = await DB.GetUserName(user_name);
        if(!db) return res.status(400).json(
            {
                code: 400,
                status: 'Failed', 
                message:'Usuario de sistema no encontrado'
            }).end();
        const result = await DB.comparePass(password, db.password);
console.log(password, db.password, result);
        if( !result ) return res.status(400).send('Password de Usuario de sistema incorrecto').end();
        const token = jwt.sign({id:db.user_id, name: db.name, rol: db.rol}, process.env.JWT_SECRET,{
            expiresIn: 86400
        });
        var data ={
            Name: db.user_name,
            token
        };
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Acceso completado',
                data
            }).end();
    },

    /**
     * Funcion de crear usuario del sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {400} si el usuario ya esta registrado
     * @code {200} si se guarda el nuevo usuario
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async Newuser (req, res) {
        const {user_name, password} = req.body;
        const userfound = await DB.GetUserName(user_name);
        if(userfound) return res.status(400).send('Error usuario ya resistrado').end();
        const newpassword = await DB.encryptPass(password);
        const newrol = await DB.encryptPass('Usuario Sistema');
        const result = await DB.CreateNew(user_name, newpassword, newrol)
        console.log(result);
        return res.status(201).json(
            {
                code: 201,
                status: 'True', 
                message:'Nuevo usuario del sistema guardado'
            }).end();
    },

    /**
     * Funcion obtener todos los usuarios del sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si obtiene todo los registros de los usuarios
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async GetUser (req, res) {
        const {user_name} = req.body;
        const result = await DB.GetFull(user_name);
        console.log(result);
        return res.status(200).send(result).end();
    },

    /**
     * Funcion de actualizar informacion del usuario del sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si se actuliza el usuario del sistema
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async PutUser (req, res) {
        const {user_name, password} = req.body;
        const id = req.params.id;
console.log(id, user_name, password);
        const newpassword = await DB.encryptPass(password);
        const result = await DB.Update(id, user_name, newpassword);
        console.log(result);
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Actualizacion exitosa'
            }).end();
    },

    /**
     * Funcion de eliminar usuario del sistema
     * @async  
     * @function 
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si se eliminar el usuario del sistema
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async Deluser (req, res) {
        const id = req.params.id;
        console.log('controlle ' + id);
        const result = await DB.Delete(id);
        console.log(result);
        return res.status(200).json(
            {
                code: 200,
                status: 'True', 
                message:'Eliminacion exitosa'
            }).end();
    },

    /**
     * Funcion de prueba para el registro  de usuario adiministrador del sistema
     * @async  
     * @function
     * @param {express.Request} req Argumento de solicitud HTTP
     * @param {express.Response} res Argumento de respuesta HTTP
     * @code {200} si el proceso ha sido completado
     * @response {object} res respuesta 
     * @response {number} res.status() numero de codigo de la respuesta
     * @response {object} res.json() objeto tipo json con informacion de la respuesta
     * @response {object} res.end(); finalizacion de la respuesta
     * @returns {{code: string|number, status: string, message: string, data: object}}
     */
    async RegisterUserAdmin (req, res) {
        const {user_name, password, rol} = req.body;
        const newpassword = await DB.encryptPass(password);
        console.log(user_name, password , newpassword);
        const newrol = await DB.encryptPass(rol);
        console.log(user_name, password , newpassword, rol, newrol);
        const result = await DB.CreateNew(user_name, newpassword, newrol);
        console.log(result);
        return res.status(200).send(user_name, password , newpassword, rol, newrol).end();
    }
};