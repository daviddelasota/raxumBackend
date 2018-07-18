'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CurriculumSchema = Schema({
    userId: String,
    education: String,
    itSkill: String,
    languaje: String,
    experience: {type: Schema.Types.ObjectId, refPath:'Experience'},
    personalobjective: {type: Schema.Types.ObjectId, refPath:'Personalobjective'},
    dateEntered: String,
    dateModified: String,
    modifiedUserId: String,
    ipModifiedUserId: String,
    providerModifiedUserId: String,
    createdBy: String,
    description: String
}, { toJSON: { virtuals: true } });


CurriculumSchema.virtual('profileClient', {
  ref: 'Client', // The model to use
  localField: 'userId', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
CurriculumSchema.virtual('personalObjective', {
  ref: 'PersonalObjective', // The model to use
  localField: 'userId', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
CurriculumSchema.virtual('educationClient', {
  ref: 'Education', // The model to use
  localField: 'education', // Find people where `localField`
  foreignField: 'education', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
CurriculumSchema.virtual('itSkillClient', {
  ref: 'ItSkill', // The model to use
  localField: 'itSkill', // Find people where `localField`
  foreignField: 'itSkill', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
CurriculumSchema.virtual('languajeClient', {
  ref: 'Languaje', // The model to use
  localField: 'languaje', // Find people where `localField`
  foreignField: 'languaje', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

module.exports = mongoose.model('Curriculum',CurriculumSchema);

