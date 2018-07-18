'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubActivitySchema = Schema({
	 activityId: String,
	 subActivityId: String,
	 description: String
	 });

module.exports = mongoose.model('SubActivity',SubActivitySchema);