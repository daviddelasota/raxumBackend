'use strict'

var express = require('express');

var ServiceController  = require('../controllers/service/service');
var api = express.Router();

//upload files
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir:'./uploads/clients'});


//autentication
var mdAuth = require('../middlewares/authenticated');

api.get('/service/getImageServiceFile/:type/:userId/:serviceId/:imageFile',ServiceController.getImageServiceFile);

api.get('/service/:serviceUserId/:serviceId/:activityId/:subActivityId',mdAuth.ensureAuth,ServiceController.getServicesByUserIdAndActivityAndSubActivity);
api.get('/service/initService/:id/:type',ServiceController.initService);
api.post('/service/saveService',mdAuth.ensureAuth,ServiceController.saveService);
api.post('/service/updateService',mdAuth.ensureAuth,ServiceController.updateService);
api.post('/service/deleteService',mdAuth.ensureAuth,ServiceController.deleteService);
api.post('/service/pauseService',mdAuth.ensureAuth,ServiceController.pauseService);
api.post('/service/activeService',mdAuth.ensureAuth,ServiceController.activeService);
api.get('/service/edit/serv/:id',mdAuth.ensureAuth,ServiceController.getServicesByUserId);


api.get('/service/activity/:id',mdAuth.ensureAuth,ServiceController.getActivity);
api.get('/service/activities',mdAuth.ensureAuth,ServiceController.getActivities);
api.post('/service/activity',mdAuth.ensureAuth,ServiceController.saveActivity);
api.post('/service/subActivity',mdAuth.ensureAuth,ServiceController.saveSubActivity);

api.get('/service/subActivities/:id',mdAuth.ensureAuth,ServiceController.getSubActivities);
api.get('/service/subactivity/:id/:id2',mdAuth.ensureAuth,ServiceController.getSubActivity);
api.post('/service/subActivity',mdAuth.ensureAuth,ServiceController.saveSubActivity);


api.get('/service/category/:id',mdAuth.ensureAuth,ServiceController.getCategory);
api.get('/service/categories',mdAuth.ensureAuth,ServiceController.getCategories);
api.post('/service/category',mdAuth.ensureAuth,ServiceController.saveCategory);

api.get('/service/subCategories/:id',mdAuth.ensureAuth,ServiceController.getSubCategories);
api.get('/service/subcategory/:id/:id2',mdAuth.ensureAuth,ServiceController.getSubCategory);
api.post('/service/subcategory',mdAuth.ensureAuth,ServiceController.saveSubCategory);




api.get('/service/mainImage/:serviceId/:type/:userId/:activityId/:subActivityId',ServiceController.getMainImagesService);
api.get('/service/imagelist/:serviceId/:type/:userId/:activityId/:subActivityId',ServiceController.getImagesServiceDirectoryFiles);
api.get('/service/mainImage/:serviceId/:type/:userId/:activityId/:subActivityId',ServiceController.getMainImagesService);
api.get('/service/mainImage/:serviceId/:type/:userId/:activityId/:subActivityId/:image',ServiceController.getMainImagesServiceByName);
api.get('/service/mainImage/2/3/4/check/:serviceId/:userId/:mainImage',ServiceController.getimageUserServicefile);

api.post('/service/upload-images/:id/:type',[mdAuth.ensureAuth,md_upload],ServiceController.uploadimages);
api.post('/service/upload-images/:id/:type/:service',[mdAuth.ensureAuth,md_upload],ServiceController.uploadimages2);
api.get('/service/getImageFile/:ImageFile',ServiceController.getimagefile);
//api.get('/service/getDirectoryFiles/:dir/:client',mdAuth.ensureAuth,ServiceController.getDirectoryFiles);



module.exports = api;