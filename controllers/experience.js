'use strict'


var Experience = require ('../models/experience');

    function getExperience(req,res){
        var experienceId = req.params.id;
        Experience.findById(experienceId,(err,experience)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!experience){
                    res.status(404).send({message:'EXPERIENCIA LABORAL NO EXISTE'});
                }else{
                    res.status(200).send({experience});
                }
            }
        });
    }

    function getExperienceClient(req,res){
        var clientId = req.params.id;
        Experience.
                  find({'userId':clientId},'userId job startingYear endingYear workDescription').
                  populate({path:'userId',
                            select: 'userName systemGeneratedPassword pwdLastChanged authenticateId receiveNotifications firstName lastName lastSureName title curp birthdate doNotCall phoneHome phoneMobile phoneWork primaryAddressStreet primaryAddressCity primaryAddressState primaryAddressPostalcode primaryAddressCountry picture '}).
        exec((err,experience)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!experience){
                    res.status(404).send({message:'LA EXPERIENCIA DEL CLIENTE NO EXISTE'});
                }else{
                    console.log(experience);
                    res.status(200).send({experience});
                }
            }
        });
    }


    
    function getExperiences(req,res){
        Experience.find({},(err,experience)=>{
            if(err){
                 res.status(500).send({message:'Error en la petición'});
            }else{
                if(!experience){
                    res.status(404).send({message:'la experiencia no existe'});
                }else{
                    res.status(200).send({experience});
                }
            }
        });
    }   



function saveExperience(req,res){
    var experience= new Experience();
    var params = req.body;
    console.log(params);
    experience.userId= params.userId;
    experience.experience= params.userId;
    experience.job= params.job; 
    experience.startingYear= params.startingYear; 
    experience.endingYear= params.endingYear; 
    experience.workDescription= params.workDescription;
    experience.dateEntered = getDate();
    experience.dateModified = params.dateModified;
    experience.modifiedUserId = params.modifiedUserId;
    experience.ipModifiedUserId = params.ipModifiedUserId;
    experience.providerModifiedUserId = params.providerModifiedUserId;
    experience.modifiedUserId= params.modifiedUserId;
    experience.createdBy= params.createdBy;
    experience.description = params.description;

       experience.save((err,experienceStored)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});           
        }else{
            if(!experienceStored){
                res.status(404).send({message:'NO SE HA GUARDADO EDUCACION'});
            }else{
                res.status(200).send({experience: experienceStored});
            }          
        }
    });
} 




function updateExperience(req, res) {
    var experience = new Experience();
    var params = req.body;
    var experienceId = params._id;

    console.log("La educacion a actualizar es " + experienceId);
    var ip;

    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }



        experience.job= params.job;
        experience.startingYear= params.startingYear;
        experience.endingYear= params.endingYear;
        experience.workDescription= params.workDescription;
        experience.dateModified =  getDate();
        experience.ipModifiedUserId = ip;
        experience.providerModifiedUserId = params.providerModifiedUserId;
        experience.modifiedUserId = params.userId;
        experience.description = params.description;






    if (experienceId != null || experienceId != 'undefined') {
        Experience.findByIdAndUpdate(experienceId, {


            job: experience.job,
            startingYear: experience.startingYear,
            endingYear:experience.endingYear,
            workDescription: experience.workDescription,
            dateModified: experience.dateModified,
            modifiedUserId: experience.modifiedUserId,
            ipModifiedUserId: experience.ipModifiedUserId,
            providerModifiedUserId: experience.providerModifiedUserId,
            description: experience.description

        }, (err, experienceUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!experienceUpdated) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL CLIENTE'
                    });
                } else {
                    res.status(200).send({
                        experience: experienceUpdated
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
} //updateExperience


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

function deleteExperience(req,res){
   // var albumId = req.params.id;
    var experienceId = req.params.id;
    var update = req.body;
    Experience.findByIdAndRemove(experienceId,(err,experienceDeleted)=>{
        if(err){
             res.status(500).send({message:'ERROR AL ELIMINAR REGISTRO DE EDUCACION'});           
        }else{
            if(!experienceDeleted){
                res.status(404).send({message:'NO SE HA ELIMINADO REGISTRO DE EDUCACION'});
            }else{
                res.status(200).send({experience: experienceDeleted});
            }
           
        }       
    });
}

module.exports={getExperience,getExperiences,saveExperience,getExperienceClient,deleteExperience,updateExperience};
    