'use strict'

var express = require('express');

var LanguajeController = require('../controllers/languaje');
var api = express.Router();

var mdAuth = require('../middlewares/authenticated');


api.get('/languaje/:id',mdAuth.ensureAuth,LanguajeController.getLanguaje);
api.get('/languajeClient/:id',mdAuth.ensureAuth,LanguajeController.getLanguajeClient);
api.get('/languaje',mdAuth.ensureAuth,LanguajeController.getLanguajes);
api.post('/languaje',mdAuth.ensureAuth,LanguajeController.saveLanguaje); 
api.put('/languaje',mdAuth.ensureAuth,LanguajeController.updateLanguaje);
api.delete('/languaje/:id',mdAuth.ensureAuth,LanguajeController.deleteLanguaje);
module.exports = api;