'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalObjectiveSchema = Schema({
    userId:{type: Schema.ObjectId, ref:'Client'},
    personalobjective:String,
    personalProfile:String,
    personalObjective:String,
    dateEntered:String,
    dateModified:String,
    modifiedUserId:String,
    ipModifiedUserId:String,
    providerModifiedUserId:String,
    createdBy:String,
    description:String
});

module.exports = mongoose.model('PersonalObjective',PersonalObjectiveSchema);


