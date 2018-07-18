'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    userName: String,
    userHash: String,
    systemGeneratedPassword: String,
    pwdLastChanged: String,
    authenticateId: String,
    receiveNotifications: Number,
    firstName: String,
    lastName: String,
    lastSureName: String,
    title: String,
    curp: String,
    birthdate: String,
    doNotCall: Number,
    phoneHome: String,
    phoneMobile: String,
    phoneWork: String,
    primaryAddressStreet: String,
    primaryAddressCity: String,
    primaryAddressState: String,
    primaryAddressPostalcode: String,
    primaryAddressCountry: String,
    picture: String,
    dateEntered: String,
    dateModified: String,
    modifiedUserId: String,
    ipModifiedUserId: String,
    providerModifiedUserId: String,
    createdBy: String,
    description: String,
    deleted: String
});

ClientSchema.virtual('educationClient', {
  ref: 'Education', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'userId', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

module.exports = mongoose.model('Client',ClientSchema);

