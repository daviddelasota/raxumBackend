'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = Schema({
	    userId: {type: Schema.ObjectId, ref:'Client'},
        type: String,
		activityId: Number,
	 	subActivityId: Number,
	 	title: String,
	 	price: String,
	 	status: Number,
    	descriptionService: String,
		mainImage: String,
        aceptedByAdministrator: Boolean,
		dateEntered: String,
	    dateModified: String,
	    modifiedUserId: String,
	    ipModifiedUserId: String,
	    providerModifiedUserId: String,
	    createdBy: String,
	    description: String,
	    deleted: Boolean
	 });

module.exports = mongoose.model('Service',ServiceSchema);



