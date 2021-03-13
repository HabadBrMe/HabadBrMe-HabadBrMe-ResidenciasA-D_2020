 /**
 * @fileoverview Archivo de configuracion de la aplicacion
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @see {@link https://github.com GitHub}
 * 
 * @module app
 * 
 * @requires dotenv
 * @requires express
 * @requires morgan
 * @requires multer
 * @requires path
 * @requires uuid
 * @requires app
 * @requires swagger-ui-express
 * @requires module:Swagger-Config
 */

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const Path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/config');

/**
 * configuración de puerto del sistema
 */
app.set('port', process.env.PORT || 3000);
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine','ejs');

/**
 * configuracion de los middlewares multer, morgan, express
 */
const storage = multer.diskStorage({
    destination: Path.join(__dirname, 'public/uploads'),
    filename:(req, file, cb)=>{
        cb(null, uuidv4() + Path.extname(file.originalname));
    }
});
app.use(morgan('dev'));
app.use(multer({
    storage,
    fileFilter:(req, file, cb) =>{
        const filetypes = /jpeg|jpg|png|mp4|mp3|mpeg/;
        const minetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(Path.extname(file.originalname));

        if(minetype && extname){
            return cb(null, true);
        }
        cb("Error: formato de archivo no soportado");
    }
}).single('multimodal'));

app.use(express.json());

app.use(express.urlencoded({extended: true}));
/**
 * Configuracion de las Rutas
 */
app.use('/api/v1',require('./routes/index'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;