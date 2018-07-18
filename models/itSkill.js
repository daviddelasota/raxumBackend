'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItSkillSchema = Schema({
    userId:{type: Schema.ObjectId, ref:'Client'},
    itSkill:String,
    skill:String,
    percentage:String,
    certificate:String,
    certificateScore: String,
    dateEntered:String,
    dateModified:String,
    modifiedUserId:String,
    ipModifiedUserId:String,
    providerModifiedUserId:String,
    createdBy: String,
    description:String
});

module.exports = mongoose.model('ItSkill',ItSkillSchema);


