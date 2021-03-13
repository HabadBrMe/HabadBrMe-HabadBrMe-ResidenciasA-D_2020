/**RutaInicial
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Inicial
 *     summary: Ruta principal del servicio
 *     description:
 *     responses:
 *       200:
 *         description: Servicio de API, Funcinando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Servicio de API, Funcinando
 */

/**RutaLogin
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Ruta de acceso al servicio
 *     description: Ruta para obtener autorizacion en la aplicacion con nombre y contraseña, respondiendo con un token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Correo electronico del usuario.
 *                 example: ejemplo@gmail.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: 0Ejemplo$Password
 *                            
 *     responses:
 *       200:
 *         description: cuando el proceso ha terminado con exito se muestra la siguiente respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Proceso completo.
 *                     data:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Nombre del usuario
 *                           example: Haba@gmail.com
 *                         token:
 *                           type: string
 *                           description: Token de autenticacion
 *                           example: jljdijh23jkjdfldkslksd
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: El correo electronico no se encuentra en el sistema.
 */

/**RutaRegister
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Ruta de registro de usuarios a la aplicacion
 *     description: Ruta para crear un nuevo usuario en la aplicacion con nombre (correo electronico) y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: ejemplo@gmail.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: 0Ejemplo$Password
 *     responses:
 *       201:
 *         description: Servicio de API, Funcinando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 201
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Nuevo usuario del sistema guardado.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Error la contraseña es demaciada corta.
 */

/**RutaUpdateUser
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *       - Administrador
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de actualizacion de usuarios de la aplicacion
 *     description: Ruta para actulizar el registro de un usuario en la aplicacion con nombre y contraseña.
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id numericio del usuario a actulizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: ejemplo@gmail.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: 0Ejemplo$Password
 *     responses:
 *       200:
 *         description: Cuando la actualizacion del usuario fue exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Actualizacion exitosa.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: El nombre de usuario es requerido.
 *       403:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 403
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Acceso restringido.
 */

/**RutaDeleteUser
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - Administrador
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de eliminacion de usuario de la aplicacion
 *     description: Ruta para eliminar un usuario en la aplicacion solo administrador.
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id numericio del usuario a actulizar
 *     responses:
 *       200:
 *         description: Cuando la eliminacion del usuario fue exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Eliminacion exitosa.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Error el id del usuario a eliminar es requerido.
 *       403:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 403
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Acceso restringido.
 */

/**RutaSendMessage
 * @swagger
 * /SendMessage:
 *   post:
 *     tags:
 *       - Usuario
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de servicio de enviar mensaje de la aplicacion
 *     description: Ruta para enviar el mesaje por WhatsApp
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               multimodal:
 *                 type: file
 *                 description: URL del Archivo audio, video o imagen
 *                 example: Ejemplo.png
 *               message:
 *                 type: string
 *                 description: Texto del mensaje a enviar
 *                 example: "JK23-01, H: 9:37, Mensaje de prueba"
 *               origin:
 *                 type: string
 *                 description: Codigo del sistema monitorieado
 *                 example: Ruta 12-45 A10
 *               destination_number:
 *                 type: string
 *                 description: Numero celular del usuario destino
 *                 example: 7351919747
 *     responses:
 *       200:
 *         description: se ha conpleta el proceso completo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Proceso completo.
 *                 data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        description: Token de autenticacion
 *                        example: jljdijh23jkjdfldkslksd
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Error no se encuentran el numero del usuario destino y el origen.
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 */

/**RutaGetMessage
 * @swagger
 * /Message:
 *   get:
 *     tags:
 *       - Administrador
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de obtener los mensajes enviados por Whatsapp
 *     description: Ruta para obtenr una lista de los mensajes enviados por el sistema.
 *     responses:
 *       200:
 *         description: se ha conpleta el proceso completo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Proceso completo.
 *                 data:
 *                    type: object
 *                    properties:
 *                      multimodal:
 *                        type: file
 *                        description: URL del Archivo audio, video o imagen
 *                        example: Ejemplo.png
 *                      message:
 *                        type: string
 *                        description: Texto del mensaje a enviar
 *                        example: "JK23-01, H: 9:37, Mensaje de prueba"
 *                      origin:
 *                        type: string
 *                        description: Codigo del sistema monitorieado
 *                        example: Ruta 12-45 A10
 *                      destination_number:
 *                        type: string
 *                        description: Numero celular del usuario destino
 *                        example: 7351919747
 *       403:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 403
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Acceso restringido. 
 */

/**RutaTestSendMessage
 * @swagger
 * /test:
 *   post:
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de servicio de enviar mensaje de la aplicacion
 *     description: Ruta para enviar el mesaje por WhatsApp
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               multimodal:
 *                 type: file
 *                 description: URL del Archivo audio, video o imagen
 *                 example: Ejemplo.png
 *               message:
 *                 type: string
 *                 description: Texto del mensaje a enviar
 *                 example: "JK23-01, H: 9:37, Mensaje de prueba"
 *               origin:
 *                 type: string
 *                 description: Codigo del sistema monitorieado
 *                 example: Ruta 12-45 A10
 *               destination_number:
 *                 type: string
 *                 description: Numero celular del usuario destino
 *                 example: 7351919747
 *     responses:
 *       200:
 *         description: se ha conpleta el proceso completo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Proceso completo.
 *                 data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        description: Token de autenticacion
 *                        example: jljdijh23jkjdfldkslksd
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: El recurso externo es requerido.
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 */

 /**RutaRegisterLada
 * @swagger
 * /lada:
 *   post:
 *     tags:
 *       - Administrador
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de crecar nueva clave lada en la aplicacion
 *     description: Ruta para registrar nueva clave-lada y una descripcion
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: integer
 *                 description: clave lada
 *                 example: 735
 *               description:
 *                 type: string
 *                 description: Pequeña descripcion de la clave-lada
 *                 example: Morelos, Cuautla
 *     responses:
 *       201:
 *         description: si se termina el proceso de guardar clave-lada completamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 201
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: message:'Nueva clave-lada guardada'.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: la clave-lada es debe de ser numeros.
 *       403:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 403
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Acceso restringido.
 *                 
 */

 /**RutaGetLada
 * @swagger
 * /lada:
 *   get:
 *     tags:
 *       - Usuario
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta obtener todas clave-lada
 *     description: Obtener un lista de todas las clave-lada y descripcion del sistema.
 *     responses:
 *       200:
 *         description: SI el proceso fue exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Proceso completado
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 */

/**RutaUpdateLada
 * @swagger
 * /lada/{id}:
 *   put:
 *     tags:
 *       - Administrador
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de actualizacion de clave-lada de la aplicacion
 *     description: Ruta para actulizar el registro de un usuario en la aplicacion con nombre y contraseña.
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id numericio de la clave-lada a actulizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: integer
 *                 description: clave lada
 *                 example: 735
 *               description:
 *                 type: string
 *                 description: Pequeña descripcion de la clave-lada
 *                 example: Morelos, Cuautla
 *     responses:
 *       200:
 *         description: Cuando la actualizacion de la clave-lada fue exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Actualizacion clave-lada exitosa.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: el id de la clave-lada es requerido..
 *       403:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 403
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Acceso restringido.
 */

 /**RutaDeleteLada
 * @swagger
 * /lada/{id}:
 *   delete:
 *     tags:
 *       - Administrador
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de eliminacion de clave-lada de la aplicacion
 *     description: Ruta para eliminar un usuario en la aplicacion solo administrador.
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id numericio del usuario a actulizar
 *     responses:
 *       200:
 *         description: Cuando la eliminacion del usuario fue exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Eliminacion de clave-lada exitosa.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: El id de la clave-lada es requerido.
 *       403:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 403
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Acceso restringido.
 */


 /**RutaRegisterTargetUser
 * @swagger
 * /targetuser:
 *   post:
 *     tags:
 *       - Usuario
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de crecar nueva clave lada en la aplicacion
 *     description: Ruta para registrar nueva clave-lada y una descripcion
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               destination_number:
 *                 type: string
 *                 description: numero telefonico del usuario destino
 *                 example: 7351919746
 *               origin:
 *                 type: string
 *                 description: clave o codigo del sistema monitoreado
 *                 example: RB_T05 09
 *     responses:
 *       201:
 *         description: si se termina el proceso de guardar receivers completamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Nueva usuario destino y origen guardado.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: el lada del nuemero del usuario destino no es soportado por el sistema.
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 *                 
 */

 /**RutaGetTargetUser
 * @swagger
 * /targetuser:
 *   get:
 *     tags:
 *       - Usuario
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta obtener todas usuarios destinos y origin
 *     description: Obtener un lista de todas las usuarios destino y origen del usuario del sistema.
 *     responses:
 *       200:
 *         description: SI el proceso fue exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                    type: integer
 *                    description: Codigo de respuesta
 *                    example: 200
 *                 status:
 *                    type: string
 *                    description: Estado del codigo de respusta
 *                    example: True
 *                 message:
 *                    type: string
 *                    description: Mensaje del sistema
 *                    example: Proceso completado
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 */

/**RutaUpdateTargetUser
 * @swagger
 * /targetuser/{id}:
 *   put:
 *     tags:
 *       - Usuario
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de actualizacion de usuarios de la aplicacion
 *     description: Ruta para actulizar el registro de un usuario en la aplicacion con nombre y contraseña.
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id numerico del usuario destino a actulizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number_phone:
 *                 type: string
 *                 description: numero telefonico del usuario destino
 *                 example: 7351919746
 *               origin:
 *                 type: string
 *                 description: clave o codigo del sistema monitoreado
 *                 example: RB_T05 09
 *     responses:
 *       200:
 *         description: Cuando la actualizacion del usuario destino y origin fue exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Actualizacion exitosa.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: el numero del usuario destino es requerido.
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 */

 /**RutaDeleteTargetUser
 * @swagger
 * /targetuser/{id}:
 *   delete:
 *     tags:
 *       - Usuario
 *     security: [ { bearerAuth: [] } ]
 *     summary: Ruta de eliminacion de usuario de la aplicacion
 *     description: Ruta para eliminar un usuario en la aplicacion solo administrador.
 *     parameters:
 *       - in: path 
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: id numericio del usuario origen a eliminar
 *     responses:
 *       200:
 *         description: Cuando la eliminacion del usuario fue exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 200
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: True
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: Eliminacion exitosa.
 *       400:
 *         description: cuando ocurra un erro se respondera con la siguiente esturatura.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 400
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: el id del usuario destino es requerido.
 *       401:
 *         description: Cuando no se cuenta con los permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: integer
 *                       description: Codigo de respuesta
 *                       example: 401
 *                     status:
 *                       type: string
 *                       description: Estado del codigo de respusta
 *                       example: Failed
 *                     message:
 *                       type: string
 *                       description: Mensaje del sistema
 *                       example: No autorizado
 */

