'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExperienceSchema = Schema({
      userId:{type: Schema.Types.ObjectId, ref:'Client'},
      experience: String,
      job: String,
      startingYear: String,
      endingYear: String,
      workDescription: String,
      dateEntered: String,
      dateModified: String,
      modifiedUserId: String,
      ipModifiedUserId: String,
      providerModifiedUserId: String,
      createdBy: String,
      description: String
});

module.exports = mongoose.model('Experience',ExperienceSchema);