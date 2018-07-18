'use strict'

var express = require('express');

var CourseController = require('../controllers/course');
var api = express.Router();

api.get('/course/:id',CourseController.getCourse);
api.get('/courseClient/:id',CourseController.getCoursesClient);
api.get('/course',CourseController.getCourses);
api.post('/course',CourseController.saveCourse); 
//api.put('/education/:id',EducationController.updateClient);
api.delete('/course/:id',CourseController.deleteCourse);
module.exports = api;