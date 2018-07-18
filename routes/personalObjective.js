'use strict'

var express = require('express');

var PersonalObjectiveController = require('../controllers/personalObjective');
var api = express.Router();

//autenticación
var mdAuth = require('../middlewares/authenticated');


api.get('/personalObjective/:id',mdAuth.ensureAuth,PersonalObjectiveController.getPersonalObjective);
api.get('/personalObjectiveClient/:id',mdAuth.ensureAuth,PersonalObjectiveController.getPersonalObjectiveClient);
api.get('/personalObjective',mdAuth.ensureAuth,PersonalObjectiveController.getPersonalObjectives);
api.post('/personalObjective',mdAuth.ensureAuth,PersonalObjectiveController.savePersonalObjectives); 
api.put('/personalObjective',mdAuth.ensureAuth,PersonalObjectiveController.updatePersonalObjective);
api.delete('/personalObjective/:id',mdAuth.ensureAuth,PersonalObjectiveController.deletePersonalObjective);
module.exports = api;