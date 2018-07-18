    'use strict'

var express = require('express');

var ItSkillController = require('../controllers/ItSkill');
var api = express.Router();

//autenticación
var mdAuth = require('../middlewares/authenticated');

api.get('/itskill/:id',mdAuth.ensureAuth,ItSkillController.getItSkill);
api.get('/itskillClient/:id',mdAuth.ensureAuth,ItSkillController.getItSkillClient);
api.get('/itskill',mdAuth.ensureAuth,ItSkillController.getItSkills);
api.post('/itskill',mdAuth.ensureAuth,ItSkillController.saveItSkill); 
api.put('/itskill',mdAuth.ensureAuth,ItSkillController.updateItSkill); 
api.delete('/itskill/:id',mdAuth.ensureAuth,ItSkillController.deleteItSkill);
module.exports = api;
