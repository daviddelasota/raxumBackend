'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguajeSchema = Schema({
    userId:{type: Schema.ObjectId, ref:'Client'},
    languaje:String,
    languajeId:String,
    percentage:String,
    certificate:String,
    certificateScore: String,
    dateEntered:String,
    dateModified:String,
    modifiedUserId:String,
    ipModifiedUserId:String,
    providerModifiedUserId:String,
    createdBy:String,
    description:String
});

module.exports = mongoose.model('Languaje',LanguajeSchema);


