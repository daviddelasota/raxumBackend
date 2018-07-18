'use strict'

var express = require('express');

var CurriculumController = require('../controllers/curriculum');
var api = express.Router();

//autenticación
var mdAuth = require('../middlewares/authenticated');
 
//api.get('/cv/curriculumClient/:cl/:csl/:pL/:lid',mdAuth.ensureAuth,CurriculumController.getCurriculumClient);
api.get('/cv/curriculumClient/:pasc/:elc/:dc/:cl/:csl/:pL/:lid/:cis/:csis/:pis/:sk',mdAuth.ensureAuth,CurriculumController.getCurriculumClient);

api.post('/saveCurriculum',CurriculumController.saveCurriculum);


module.exports = api;