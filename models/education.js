'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EducationSchema = Schema({
    userId: {type: Schema.Types.ObjectId, ref:'Client'},
    educationalLevel: String,
    educationalInstitution: String,
    degree: String,
    startingYear: String,
    endingYear: String,
    dateEntered: String,
    dateModified: String,
    modifiedUserId: String,
    ipModifiedUserId: String,
    providerModifiedUserId: String,
    createdBy: String,
    description: String
});


module.exports = mongoose.model('Education',EducationSchema);

