'use strict'

var Languaje = require ('../models/languaje');


    function getLanguaje(req,res){
        var languajeId = req.params.id;
        Languaje.findById(languajeId,(err,languaje)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!languaje){
                    res.status(404).send({message:'EL lenguaje NO EXISTE'});
                }else{
                    res.status(200).send({languaje});
                }
            }

        });
    }

function getLanguajes(req,res){
    Languaje.find({},(err,languajes)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});
        }else{
            if(!languajes){
                res.status(404).send({message:'LOS LENGUAJES NO EXISTEN'});
            }else{
                res.status(200).send({languajes});
            }
        }

    });
}   

    function getLanguajeClient(req,res){
        var clientId = req.params.id;
        console.log("getEducation:"+clientId);

        Languaje.find({'userId':clientId},'languajeId percentage certificate certificateScore',(err,lenguaje)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!lenguaje){
                    res.status(404).send({message:'EL LENGUAJE POR CLIENTE NO EXITEN'});
                }else{
                    res.status(200).send({lenguaje});
                }
            }

        });
    }
function saveLanguaje(req,res){
    var languaje= new Languaje();
    var params = req.body;
        
        languaje.userId= params.userId ;
        languaje.languaje= params.userId ;
        languaje.languajeId= params.languajeId;
	    languaje.percentage= params.percentage ;
	    languaje.certificate= params.certificate ;
	    languaje.certificateScore= params.certificateScore ;
    	languaje.dateEntered =  getDate();
    	languaje.dateModified = params.dateModified;
    	languaje.ipModifiedUserId = params.ipModifiedUserId;
    	languaje.providerModifiedUserId = params.providerModifiedUserId;
    	languaje.modifiedUserId = params.modifiedUserId;
    	languaje.createdBy = params.createdBy;
    	languaje.description = params.description;


       languaje.save((err,languajeStored)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});           
        }else{
            if(!languajeStored){
                res.status(404).send({message:'NO SE HA GUARDADO EL LENGUAJE'});
            }else{
                res.status(200).send({languaje: languajeStored});
            }           
        }
    });

} 



function deleteLanguaje(req, res) {
    var languaje = new Languaje();
    var languajeId = req.params.id;

   
    Languaje.findByIdAndRemove(languajeId, (err, languajeDeleted) => {
        if (err) {
            res.status(500).send({
                message: 'ERROR AL ELIMINAR REGISTRO DE EDUCACION'
            });
        } else {
            if (!languajeDeleted) {
                res.status(404).send({
                    message: 'NO SE HA ELIMINADO REGISTRO DE EDUCACION'
                });
            } else {
                res.status(200).send({
                    languaje: languajeDeleted
                });
            }

        }

    });

}// deleteLanguaje

function getDate(){

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    hoy = dd+'/'+mm+'/'+yyyy;
    return (hoy);
}


/******************************************************************************
NAME updateLanguaje
AUTOR DAVID DE LA SOTA
DESCRIPTION actualiza usuarios de la base de datos 
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
function updateLanguaje(req, res) {
    var languaje = new Languaje();
    var params = req.body;
    var languajeId = params._id;

    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }

    languaje.userId  = params.userId;
    languaje.languajeId  = params.languajeId;
    languaje.percentage  = params.percentage;
    languaje.certificate  = params.certificate;
    languaje.certificateScore  = params.certificateScore;
    languaje.dateEntered = params.dateEntered;
    languaje.dateModified = getDate();
    languaje.modifiedUserId = params.userId;
    languaje.ipModifiedUserId = ip;
    languaje.providerModifiedUserId = params.providerModifiedUserId;
    languaje.createdBy = params.createdBy;
    languaje.description = params.description;





    if (languajeId != null || languajeId != 'undefined') {
        Languaje.findByIdAndUpdate(languajeId, {

            languajeId: languaje.languajeId,
            percentage: languaje.percentage,
            certificate: languaje.certificate,
            certificateScore: languaje.certificateScore,
            dateModified: languaje.dateModified,
            modifiedUserId: languaje.modifiedUserId,
            ipModifiedUserId: languaje.ipModifiedUserId,
            providerModifiedUserId: languaje.providerModifiedUserId,
            description: languaje.description
        }, (err, languajeUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!languajeUpdated) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL LANGUAJE|'
                    });
                } else {
                    res.status(200).send({
                        languaje: languajeUpdated
                    });
                }

            }

        });
    } else {
        console.log("DATOS INVALIDOS PARA LANGUAJE");
        res.status(404).send({
            message: 'NO SE HA ACTUALIZADO EL LANGUAJE'
        });
    }
} //updateEducation

module.exports={getLanguaje,getLanguajes,saveLanguaje,deleteLanguaje,getLanguajeClient,updateLanguaje};