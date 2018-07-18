'use strict'

var express = require('express');

var ExperienceController = require('../controllers/experience');
var api = express.Router();

//autenticación
var mdAuth = require('../middlewares/authenticated');

api.get('/experience/:id',mdAuth.ensureAuth,ExperienceController.getExperience);
api.get('/experienceClient/:id',mdAuth.ensureAuth,ExperienceController.getExperienceClient);
api.get('/experience',mdAuth.ensureAuth,ExperienceController.getExperience);
api.post('/experience',mdAuth.ensureAuth,ExperienceController.saveExperience); 
api.put('/experience',mdAuth.ensureAuth,ExperienceController.updateExperience);
api.delete('/experience/:id',mdAuth.ensureAuth,ExperienceController.deleteExperience);
module.exports = api;