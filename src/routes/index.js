/**
 * @fileoverview Configuracion de rutas del sistema
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Routers
 * 
 */
const { Router} = require('express');

const route = Router();
const token = require('../middlewares/Verificar.token');
const user = require('../middlewares/verificar.user');
const targetuser = require('../middlewares/verificar.targetuser');
const lada = require('../middlewares/verificar.lada');
const ControllerUser = require('../controllers/controller.users');
const ControllerReceiver = require('../controllers/controller.targetusers');
const ControllerLada = require('../controllers/controller.keylada');
const ControllerMessage = require('../controllers/controller.message');
const {verifyMessage} = require('../middlewares/verificardatos');
const controllerUsers = require('../controllers/controller.users');

/**
 * Ruta inicial de la aplicacion
 *
 * @name RutaInicial
 * @path {GET} / 
 * @param {express.Request} req Argumento de solicitud HTTP
 * @param {express.Response} res Argumento de respuesta HTTP
 * 
 * @code {200} si servicio funcionando correctamente
 * 
 */
route.get('/',(req, res)=>{
    res.status(200).json(
        {
            code: 200,
            status: 'True', 
            message:'Servicio de API, Funcinando'
        }).end();
});

/**
 * Ruta de acceso de usuarios a la aplicacion
 *
 * @name RutaLogin
 * @path {GET} /login 
 * @chain {@link module:Middleware_user.verifyFormat }
 * @chain {@link module:Controller_user.login }
 *
 */
route.post('/login', user.verifyFormat, ControllerUser.login)
.get('/login', user.verifyFormat, ControllerUser.login);

/**
 * Ruta de registro de usuarios a la aplicacion
 *
 * @name RutaRegister
 * @path {POST} /register
 * @chain {@link module:Middleware_user.verifyFormat }
 * @chain {@link module:Controller_user.Newuser }
 * 
 */
route.post('/register', user.verifyFormat, ControllerUser.Newuser);

/**
 * Ruta de actualizacion de informacion de usuario de la aplicacion
 *
 * @name RutaUpdateUser
 * @path {PUT} /user/:userid
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyAdminToken }
 * @chain {@link module:Middleware_user.verifyFormat }
 * @chain {@link module:Controller_user.PutUser }
 * 
 */
route.put('/user/:id',[token.verify,token.verifyAdminToken, user.verifyFormat ], ControllerUser.PutUser);

/**
 * Ruta de eliminacion de usuarios de la aplicacion
 *
 * @name RutaDeleteUser
 * @path {DELETE} /user/:userid
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyAdminToken }
 * @chain {@link module:Controller_user.Deluser }
 * 
 */
route.delete('/user/:id',[token.verify, token.verifyAdminToken], ControllerUser.Deluser);

//route.post('/usertest', ControllerUser.test);

/**
 * Ruta de servicio de enviar mensaje de la aplicacion
 *
 * @name RutaSendMessage
 * @path {POST} /SendMessage
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Middleware_message.verifyMessage }
 * @chain {@link module:Middleware_lada.VerifyDB }
 * @chain {@link module:Middleware_receiver.verificareceiver }
 * @chain {@link module:ControllerMessage.UploadMessage }
 * 
 */
route.post('/SendMessage', [token.verify, token.verifyUserToken, verifyMessage, lada.VerifyDB, targetuser.verifyDB ], ControllerMessage.UploadMessage);

/**
 * Ruta para obtener todos los mensaje.
 *
 * @name RutaGetMessage
 * @path {GET} /Message
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyAdminToken }
 * @chain {@link module:ControllerMessage.GetMessages }
 * 
 */
 route.get('/Message', [token.verify, token.verifyAdminToken], ControllerMessage.GetMessages);

/**
 * Ruta de test de prueba del servicio de enviar mensaje de la aplicacion
 *
 * @name RutaTestSendMessage
 * @path {POST} /test
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Middleware_message.verifyMessage }
 * @chain {@link module:Middleware_lada.VerifyDB }
 * @chain {@link module:Middleware_receiver.verificareceiver }
 * @chain {@link module:ControllerMessage.TestMessage }
 * 
 */
route.post('/test', [token.verify, token.verifyUserToken, verifyMessage, lada.VerifyDB, targetuser.verifyDB ], ControllerMessage.TestMessage);

/**
 * Ruta de obtener todas las claves lada de la aplicacion
 *
 * @name RutaGetLada
 * @path {GET} /lada
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Controller_keylada.Getladas }
 * 
 */
route.get('/lada', [token.verify, token.verifyUserToken], ControllerLada.Getladas);

/**
 * Ruta de registro de claves lada de la aplicacion
 *
 * @name RutaRegisterLada
 * @path {POST} /lada
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyAdminToken }
 * @chain {@link module:Middleware_lada.verifyFormat}
 * @chain {@link module:Controller_keylada.Newlada }
 * 
 */
route.post('/lada', [token.verify, token.verifyAdminToken, lada.verifyFormat], ControllerLada.Newlada);

/**
 * Ruta de actualizacion de claves lada de la aplicacion
 *
 * @name RutaUpdateLada
 * @path {PUT} /lada/:id
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyAdminToken }
 * @chain {@link module:Middleware_lada.verifyFormat}
 * @chain {@link module:Controller_keylada.Putlada }
 * 
 */
route.put('/lada/:id', [token.verify, token.verifyAdminToken, lada.verifyFormat], ControllerLada.Putlada);

/**
 * Ruta de eliminacion de claves lada de la aplicacion
 *
 * @name RutaDeleteLada
 * @path {DELETE} /lada/:id
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyAdminToken }
 * @chain {@link module:Controller_keylada.Dellada}
 */
route.delete('/lada/:id',[token.verify, token.verifyAdminToken], ControllerLada.Dellada);

/**
 * Ruta de obtener todos los usuarios destinos la aplicacion
 *
 * @name RutaGetTargetUser
 * @path {GET} /tergetuser
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Controller_receiver.Getreceivers}
 */
route.get('/targetuser',[token.verify, token.verifyUserToken], ControllerReceiver.Getreceivers);

/**
 * Ruta de registrar un usuario destino la aplicacion
 *
 * @name RutaRegisterTargetUser
 * @path {POST} /tergetuser
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Middleware_receiver.verifyReceiverFormat }
 * @chain {@link module:Controller_receiver.Newreceiver }
 */
route.post('/targetuser', [token.verify, token.verifyUserToken, targetuser.verifyFormat], ControllerReceiver.Newreceiver);

/**
 * Ruta de actualizacion de un usuario destino la aplicacion
 *
 * @name RutaUpdateTargetUser
 * @path {PUT} /tergetuser/:id
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Middleware_receiver.verifyReceiverFormat }
 * @chain {@link module:Controller_receiver.Putreceiver }
 */
route.put('/targetuser/:id', [token.verify, token.verifyUserToken, targetuser.verifyFormat, targetuser.verifyParamsFormat], ControllerReceiver.Putreceiver);

/**
 * Ruta de eliminar un usuario destino la aplicacion
 *
 * @name RutaDeleteTargetUser
 * @path {DELETE} /tergetuser/:id
 * @chain {@link module:Middleware_token.verify }
 * @chain {@link module:Middleware_token.verifyUserToken }
 * @chain {@link module:Controller_receiver.Delreceiver }
 */
route.delete('/targetuser/:id', [token.verify, token.verifyUserToken, targetuser.verifyParamsFormat], ControllerReceiver.Delreceiver);

module.exports = route;