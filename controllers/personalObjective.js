'use strict'

var PersonalObjective = require ('../models/personalObjective');


    function getPersonalObjective(req,res){
        var personalObjectiveId = req.params.id;
        PersonalObjective.findById(personalObjectiveId,(err,personalObjective)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!personalObjective){
                    res.status(404).send({message:'EL objetivo personal NO EXISTE'});
                }else{
                    res.status(200).send({personalObjective});
                }
            }

        });
    }

function getPersonalObjectives(req,res){
    PersonalObjective.find({},(err,personalObjectives)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});
        }else{
            if(!personalObjectives){
                res.status(404).send({message:'LOS objetivos personales NO EXISTEN'});
            }else{
                res.status(200).send({personalObjectives});
            }
        }

    });
}   


/*function savePersonalObjectives(req,res){
    var personalObjective= new PersonalObjective();
    var params = req.body;
        
        personalObjective.userId = params.userId ;
	    personalObjective.personalProfile = params.personalProfile ;
        personalObjective.personalObjective = params.personalObjective ;
    	personalObjective.dateEntered =  getDate();
    	personalObjective.dateModified = params.dateModified;
    	personalObjective.ipModifiedUserId = params.ipModifiedUserId;
    	personalObjective.providerModifiedUserId = params.providerModifiedUserId;
    	personalObjective.modifiedUserId = params.modifiedUserId;
    	personalObjective.createdBy = params.createdBy;
    	personalObjective.description = params.description;


       personalObjective.save((err,personalObjectiveStored)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});           
        }else{
            if(!personalObjectiveStored){
                res.status(404).send({message:'NO SE HA GUARDADO EL OBJETIVO PERSONAL'});
            }else{
                res.status(200).send({personalObjective: personalObjectiveStored});
            }           
        }
    });

} 
*/
function savePersonalObjectives(req,res){
    var personalObjective= new PersonalObjective();
    var params = req.body;
    var clientId = params.userId;
    //console.log("LA CADENA ES "+JSON.stringify(params));
    //console.log("EL CLIENTE A A CTUALIZAR ES  "+clientId);

        personalObjective.userId = params.userId ;
        personalObjective.personalObjective = params.userId ;
        personalObjective.personalProfile = params.personalProfile ;
        personalObjective.personalObjective = params.personalObjective ;
        personalObjective.dateEntered =  getDate();
        personalObjective.dateModified = params.dateModified;
        personalObjective.ipModifiedUserId = params.ipModifiedUserId;
        personalObjective.providerModifiedUserId = params.providerModifiedUserId;
        personalObjective.modifiedUserId = params.modifiedUserId;
        personalObjective.createdBy = params.createdBy;
        personalObjective.description = params.description;



    if(clientId != null || clientId  != 'undefined'){
                                PersonalObjective.update({userId: clientId} ,
                                {        userId:personalObjective.userId, 
        personalProfile:personalObjective.personalProfile, 
        personalObjective:personalObjective.personalObjective,
        dateEntered:personalObjective.dateEntered, 
        dateModified:personalObjective.dateModified,
        ipModifiedUserId:personalObjective.ipModifiedUserId,
        providerModifiedUserId:personalObjective.providerModifiedUserId, 
        modifiedUserId:personalObjective.modifiedUserId ,
        createdBy:personalObjective.createdBy ,
        description:personalObjective.description  
                                },{upsert: true},(err,personalObjectiveUpdated)=>{
                                if(err){
                                    //console.log("500"+err);
                                    res.status(500).send({message:'ERROR ACTUALIZAR REGISTRO'});           
                                }else{
                                    if(!personalObjectiveUpdated){
                                        //console.log("404");
                                        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
                                    }else{
                                        //console.log("200");
                                        res.status(200).send({personalObjective: personalObjectiveUpdated});
                                    }
                                
                                }
                                
                            });
    }else{
        console.log("DATOS INVALIDOS PARA ACTUALIZAR 2");
        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
    }
}


function updatePersonalObjective(req,res){
    var personalObjective= new PersonalObjective();


    var params = req.body;
    var clientId = params._id;

    console.log("EL CLIENTE A A CTUALIZAR ES "+JSON.stringify(params));

    console.log("EL CLIENTE A A CTUALIZAR ES "+clientId);

    personalObjective.personalProfile = params.personalProfile;
    personalObjective.personalObjective = params.personalObjective;
    personalObjective.dateModified = getDate();
    personalObjective.modifiedUserId = params.modifiedUserId;
    personalObjective.ipModifiedUserId = params.ipModifiedUserId;
    personalObjective.providerModifiedUserId = params.providerModifiedUserId;

    if(clientId != null || clientId  != 'undefined'){
        PersonalObjective.findByIdAndUpdate(clientId,
                                {personalProfile: personalObjective.personalProfile,
                                personalObjective: personalObjective.personalObjective,
                                dateModified: personalObjective.dateModified, 
                                modifiedUserId: personalObjective.modifiedUserId,
                                ipModifiedUserId: personalObjective.ipModifiedUserId,
                                providerModifiedUserId: personalObjective.providerModifiedUserId   
                                },(err,personalObjectiveUpdated)=>{
                                if(err){
                                    res.status(500).send({message:'ERROR ACTUALIZAR REGISTRO'});           
                                }else{
                                    if(!personalObjectiveUpdated){
                                        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
                                    }else{
                                        res.status(200).send({personalObjective: personalObjectiveUpdated});
                                    }
                                
                                }
                                
                            });
    }else{
        console.log("DATOS INVALIDOS PARA ACTUALIZAR 2");
        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
    }
}



function deletePersonalObjective(req, res) {
    var personalObjective = new PersonalObjective();
    var personalObjectiveId = req.params.id;

    console.log(">>>>>>>>>>>>>>"+personalObjectiveId);

   
    PersonalObjective.findByIdAndRemove(personalObjectiveId, (err, personalObjectiveDeleted) => {
        if (err) {
            res.status(500).send({
                message: 'ERROR AL ELIMINAR REGISTRO DE EDUCACION'
            });
        } else {
            if (!personalObjectiveDeleted) {
                res.status(404).send({
                    message: 'NO SE HA ELIMINADO REGISTRO DE EDUCACION'
                });
            } else {
                res.status(200).send({
                    personalObjective: personalObjectiveDeleted
                });
            }

        }

    });

}// deleteItSkill

    function getPersonalObjectiveClient(req,res){
        var clientId = req.params.id;
        console.log("getEducation:"+clientId);

        PersonalObjective.find({'userId':clientId},'personalProfile personalObjective',(err,personalObjective)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!personalObjective){
                    res.status(404).send({message:'LOS CURSOS POR CLIENTE NO EXITEN'});
                }else{
                    res.status(200).send({personalObjective});
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
module.exports={getPersonalObjective,getPersonalObjectives,savePersonalObjectives,deletePersonalObjective,getPersonalObjectiveClient,updatePersonalObjective};