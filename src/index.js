 /**
 * @fileoverview Archivo de arranque de la aplicacion, inicia el servidor con el puerto programado.
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @see {@link https://github.com GitHub}
 * 
 * @requires app
 */
const app = require ('./app');

app.listen(app.get('port'),()=>{
    console.log('Servidor en el puerto ' + app.get('port'));
});