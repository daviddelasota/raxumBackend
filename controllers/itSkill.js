'use strict'

var ItSkill = require ('../models/itSkill');


    function getItSkill(req,res){
        var ItSkillId = req.params.id;
        ItSkill.findById(ItSkillId,(err,itSkill)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!itSkill){
                    res.status(404).send({message:'EL curso NO EXISTE'});
                }else{
                    res.status(200).send({itSkill});
                }
            }

        });
    }

function getItSkills(req,res){
    ItSkill.find({},(err,itSkills)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});
        }else{
            if(!itSkills){
                res.status(404).send({message:'LOS HABILIDADES TECNOLOGICAS NO EXISTEN'});
            }else{
                res.status(200).send({itSkills});
            }
        }

    });
}   


function saveItSkill(req,res){
    var itSkill= new ItSkill();
    var params = req.body;
        
        itSkill.userId= params.userId ;
        itSkill.itSkill= params.userId ;
        itSkill.skill= params.skill;
	    itSkill.percentage= params.percentage ;
	    itSkill.certificate= params.certificate ;
	    itSkill.certificateScore= params.certificateScore ;
    	itSkill.dateEntered =  getDate();
    	itSkill.dateModified = params.dateModified;
    	itSkill.ipModifiedUserId = params.ipModifiedUserId;
    	itSkill.providerModifiedUserId = params.providerModifiedUserId;
    	itSkill.modifiedUserId = params.modifiedUserId;
    	itSkill.createdBy = params.createdBy;
    	itSkill.description = params.description;


       itSkill.save((err,itSkillStored)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});           
        }else{
            if(!itSkillStored){
                res.status(404).send({message:'NO SE HA GUARDADO EL CURSO'});
            }else{
                res.status(200).send({itSkill: itSkillStored});
            }           
        }
    });

} 

/******************************************************************************
NAME updateItSkill
AUTOR DAVID DE LA SOTA
DESCRIPTION actualiza usuarios de la base de datos 
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
function updateItSkill(req, res) {
    var itSkill = new ItSkill();
    var params = req.body;
    var itSkillId = params._id;

    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }


    itSkill.userId= params.userId;
    itSkill.skill= params.skill;
    itSkill.percentage= params.percentage;
    itSkill.certificate= params.certificate;
    itSkill.certificateScore= params.certificateScore;
    itSkill.dateEntered = params.dateEntered;
    itSkill.dateModified = getDate();
    itSkill.modifiedUserId = params.userId;
    itSkill.ipModifiedUserId = ip;
    itSkill.providerModifiedUserId = params.providerModifiedUserId;
    itSkill.createdBy = params.createdBy;
    itSkill.description = params.description;





    if (itSkillId != null || itSkillId != 'undefined') {
        ItSkill.findByIdAndUpdate(itSkillId, {

            skill: itSkill.skill,
            percentage: itSkill.percentage,
            certificate: itSkill.certificate,
            certificateScore: itSkill.certificateScore,
            dateModified: itSkill.dateModified,
            modifiedUserId: itSkill.modifiedUserId,
            ipModifiedUserId: itSkill.ipModifiedUserId,
            providerModifiedUserId: itSkill.providerModifiedUserId,
            description: itSkill.description
        }, (err, ItSkillUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!ItSkillUpdated) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL LANGUAJE|'
                    });
                } else {
                    res.status(200).send({
                        itSkill: ItSkillUpdated
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
} //updateIt

function deleteItSkill(req, res) {
    var itSkill = new ItSkill();
    var itSkillId = req.params.id;

   
    ItSkill.findByIdAndRemove(itSkillId, (err, ItSkillDeleted) => {
        if (err) {
            res.status(500).send({
                message: 'ERROR AL ELIMINAR REGISTRO DE EDUCACION'
            });
        } else {
            if (!ItSkillDeleted) {
                res.status(404).send({
                    message: 'NO SE HA ELIMINADO REGISTRO DE EDUCACION'
                });
            } else {
                res.status(200).send({
                    itSkill: ItSkillDeleted
                });
            }

        }

    });

}// deleteItSkill

    function getItSkillClient(req,res){
        var clientId = req.params.id;
        console.log("getEducation:"+clientId);

        ItSkill.find({'userId':clientId},'skill percentage certificate certificateScore',(err,itSkill)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!itSkill){
                    res.status(404).send({message:'LOS CURSOS POR CLIENTE NO EXITEN'});
                }else{
                    res.status(200).send({itSkill});
                }
            }

        });
    }

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
module.exports={getItSkill,getItSkills,saveItSkill,deleteItSkill,getItSkillClient,updateItSkill};