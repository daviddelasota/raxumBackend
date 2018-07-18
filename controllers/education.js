'use strict'

var Education = require('../models/education');

function getEducation(req, res) {
    var educationId = req.params.id;
    Education.findById(educationId, (err, education) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!education) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                res.status(200).send({
                    education
                });
            }
        }

    });
}


function getEducationClient(req, res) {
    var clientId = req.params.id;

    Education.
    find({
        'userId': clientId
    }, '_id userId educationalLevel educationalInstitution degree startingYear endingYear').
    populate({
        path: 'userId',
        select: 'userName systemGeneratedPassword pwdLastChanged authenticateId receiveNotifications firstName lastName lastSureName title curp birthdate doNotCall phoneHome phoneMobile phoneWork primaryAddressStreet primaryAddressCity primaryAddressState primaryAddressPostalcode primaryAddressCountry picture '
    }).
    exec((err, education) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!education) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                console.log(education);
                res.status(200).send({
                    education
                });
            }
        }

    });
}



function getEducations(req, res) {
    Education.find({}, (err, education) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!education) {
                res.status(404).send({
                    message: 'LOS CLIENTES NO EXISTEN'
                });
            } else {
                res.status(200).send({
                    education
                });
            }
        }

    });
}

function saveEducation(req, res) {
    var education = new Education();
    var params = req.body;

    education.userId = params.userId;
    education.educationalLevel = params.educationalLevel,
        education.educationalInstitution = params.educationalInstitution,
        education.degree = params.degree,
        education.startingYear = params.startingYear;
    education.endingYear = params.endingYear;
    education.dateEntered = getDate();
    education.dateModified = params.dateModified;
    education.modifiedUserId = params.modifiedUserId;
    education.ipModifiedUserId = params.ipModifiedUserId;
    education.providerModifiedUserId = params.providerModifiedUserId;
    education.modifiedUserId = params.modifiedUserId;
    education.createdBy = params.createdBy;
    education.description = params.description;

    education.save((err, educationStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!educationStored) {
                res.status(404).send({
                    message: 'NO SE HA GUARDADO EDUCACION'
                });
            } else {
                res.status(200).send({
                    client: educationStored
                });
            }

        }
    });

}


function getDate() {

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    hoy = dd + '/' + mm + '/' + yyyy;
    return (hoy);
}

function deleteEducation(req, res) {
    var education = new Education();
    var educationId = req.params.id;


    console.log("borrar-------------------------------------------------"+educationId);
    
    Education.findByIdAndRemove(educationId, (err, educationDeleted) => {
        if (err) {
            res.status(500).send({
                message: 'ERROR AL ELIMINAR REGISTRO DE EDUCACION'
            });
        } else {
            if (!educationDeleted) {
                res.status(404).send({
                    message: 'NO SE HA ELIMINADO REGISTRO DE EDUCACION'
                });
            } else {
                res.status(200).send({
                    education: educationDeleted
                });
            }

        }

    });

}


/******************************************************************************
NAME updateClient
AUTOR DAVID DE LA SOTA
DESCRIPTION actualiza usuarios de la base de datos 
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
function updateEducation(req, res) {
    var education = new Education();
    var params = req.body;
    var educationId = params._id;

    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }


    education.userId = params.userId;
    education.educationalLevel = params.educationalLevel;
    education.educationalInstitution = params.educationalInstitution;
    education.degree = params.degree;
    education.startingYear = params.startingYear;
    education.endingYear = params.endingYear;
    education.dateEntered = params.dateEntered;
    education.dateModified = getDate();
    education.modifiedUserId = params.userId;
    education.ipModifiedUserId = ip;
    education.providerModifiedUserId = params.providerModifiedUserId;
    education.createdBy = params.createdBy;
    education.description = params.description;



    if (educationId != null || educationId != 'undefined') {
        Education.findByIdAndUpdate(educationId, {

            educationalLevel: education.educationalLevel,
            educationalInstitution: education.educationalInstitution,
            degree: education.degree,
            startingYear: education.startingYear,
            endingYear: education.endingYear,
            dateModified: education.dateModified,
            modifiedUserId: education.modifiedUserId,
            ipModifiedUserId: education.ipModifiedUserId,
            providerModifiedUserId: education.providerModifiedUserId,
            description: education.description
        }, (err, educationUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!educationUpdated) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL CLIENTE'
                    });
                } else {
                    res.status(200).send({
                        education: educationUpdated
                    });
                }

            }

        });
    } else {
        console.log("DATOS INVALIDOS PARA ACTUALIZAR 2");
        res.status(404).send({
            message: 'NO SE HA ACTUALIZADO EL CLIENTE'
        });
    }
} //updateEducation

module.exports = {
    getEducation,
    getEducations,
    saveEducation,
    getEducationClient,
    deleteEducation,
    updateEducation
};