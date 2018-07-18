'use strict'

var express = require('express');

var EducationController = require('../controllers/education');
var api = express.Router();

//autenticación
var mdAuth = require('../middlewares/authenticated');

api.get('/education/:id',mdAuth.ensureAuth,EducationController.getEducation);
api.get('/educationClient/:id',mdAuth.ensureAuth,EducationController.getEducationClient);
api.get('/education',mdAuth.ensureAuth,EducationController.getEducations);
api.post('/education',mdAuth.ensureAuth,EducationController.saveEducation); 
api.put('/education',mdAuth.ensureAuth,EducationController.updateEducation);
api.delete('/education/:id',mdAuth.ensureAuth,EducationController.deleteEducation);
module.exports = api;