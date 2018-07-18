/******************************************************************************
NAME jwt service
AUTOR DAVID DE LA SOTA
DESCRIPTION  servicio generador token
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secretkey = 'Raxum_10_24_15'

exports.createToken = function(user){
    var payload ={
        sub:user._id,
        iat: moment().unix(),
        exp:moment().add(30,'days').unix,
    };
    return jwt.encode(payload,secretkey);
}