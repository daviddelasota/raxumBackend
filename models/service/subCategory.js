'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubCategorySchema = Schema({
	 activityId: String,
	 subActivityId: String,
	 description: String
	 });

module.exports = mongoose.model('SubCategory',SubCategorySchema);