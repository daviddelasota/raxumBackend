'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = Schema({
	 activityId: String,
	 description: String
	 });

module.exports = mongoose.model('Activity',ActivitySchema);

	 
