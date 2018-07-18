'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = Schema({
    userId: {type: Schema.ObjectId, ref:'Client'},
    course:String, 
    courseId:Number,
    percentage:Number,
    certificate:String,
    certificateScore: Number,
    dateEntered:String,
    dateModified:String,
    modifiedUserId: String,
    ipModifiedUserId:String,
    providerModifiedUserId:String,
    createdBy: String,
    description:String
});

module.exports = mongoose.model('Course',CourseSchema);


