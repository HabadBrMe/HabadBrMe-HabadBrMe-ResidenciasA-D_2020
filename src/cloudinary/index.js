 /**
 * @fileoverview Configuracion y metodos del servicio Cloudinary
 * @version     0.1
 * @author      Habad BrMe <habadbramed@gmail.com>
 * 
 * @module Service_Cloudinary
 * 
 * @see {@link https://cloudinary.com/documentation}
 * 
 * @requires dotenv
 * @requires cloudinary
 * @requires fs
 */
require('dotenv').config();
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

  /**
  * Configuracion de cloudinary 
  * @see https://cloudinary.com/documentation/how_to_integrate_cloudinary
  * @typedef {Object} cloudinary
  * @property {string} CLOUD_NAME nombre de la carperta en cloudinary
  * @property {string} CLOUD_KEY api_key de cloudinary
  * @property {string} CLOUD_SECRET api_secret de cloudinary
  */

  /**
   * @type {cloudinary}
   */
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 
  });

  /**
   * Funcion subir una recurso externo en cloudinary
   * @async
   * @function
   * @param {string}  urlRext ubicacion del recurso externo
   * @returns {object} resultado de la consulta
   */
  async function saveCloud(urlRext){

      try{

        const result = await cloudinary.v2.uploader.upload(urlRext, 
          { resource_type: "auto" });
        
        await fs.unlink(urlRext);
        
        return result.url;

      }catch (error){
        
        const data={
          errores : 'Error '+ error.http_code
        };
        
        return data;
      }
  }

module.exports = {saveCloud};