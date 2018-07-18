/******************************************************************************
NAME client routes 
AUTOR DAVID DE LA SOTA
DESCRIPTION  rutas del cleinte
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

'use strict'

var express = require('express');

var ClientController = require('../controllers/client');
var api = express.Router();

//subir archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/clients'});

//autenticación
var mdAuth = require('../middlewares/authenticated');

api.post('/prueba',ClientController.prueba);

api.get('/client/:id',mdAuth.ensureAuth,ClientController.getClient);
api.get('/clients',mdAuth.ensureAuth,ClientController.getClients);
api.post('/client',ClientController.saveClient);
api.put('/client/:id',mdAuth.ensureAuth,ClientController.updateClient);
api.delete('/client/:id',mdAuth.ensureAuth,ClientController.deleteClient);
api.post('/client/login',ClientController.loginClient);
api.post('/upload-image/:id',[mdAuth.ensureAuth,md_upload],ClientController.uploadimage);
api.post('/upload-images/:id',[mdAuth.ensureAuth,md_upload],ClientController.uploadimages);
api.get('/getImageFile/:ImageFile',ClientController.getimagefile);



module.exports = api;