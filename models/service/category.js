'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
	 activityId: String,
	 description: String
	 });

module.exports = mongoose.model('Category',CategorySchema);

	 
