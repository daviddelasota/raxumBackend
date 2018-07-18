'use strict'

var Curriculum = require('../models/curriculum');
var Client = require ('../models/client');
var Education = require('../models/education');
var Experience = require ('../models/experience');
var Languaje = require ('../models/languaje');
var ItSkill = require ('../models/itSkill');




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
                    curriculum
                });
            }
        }

    });
}


function saveCurriculum(req,res){
    var curriculum= new Curriculum();
    var params = req.body;

console.log("entró a curriculum")
   // Curriculum.findOne({userName:client.userName})

    curriculum.userId=params.userId;

    Curriculum.findOne({userId:curriculum.userId},(err,duplicateClient)=>{
        if(err){             
            res.status(500).send({message:'Error en la petición de la existencia de curriculum'});           
        }else{
            if(!duplicateClient){

                            curriculum.userId = params.userId;
                            curriculum.education = params.userId;
                            curriculum.itSkill = params.userId;
                            curriculum.languaje = params.userId;
                            curriculum.experience = params.userId;
                            curriculum.personalobjective = params.userId;
                            curriculum.dateEntered =  getDate();
                            curriculum.dateModified = params.dateModified;
                            curriculum.ipModifiedUserId = params.ipModifiedUserId;
                            curriculum.providerModifiedUserId = params.providerModifiedUserId;
                            curriculum.modifiedUserId = params.modifiedUserId;
                            curriculum.createdBy = params.createdBy;
                            curriculum.description = params.description;
     
                            curriculum.save((err,curriculumStored)=>{
                                if(err){
                                    res.status(500).send({message:'Error en la petición'});    
                                    console.log("1");       
                                }else{
                                    if(!curriculumStored){
                                        res.status(404).send({message:'NO SE HA GUARDADO EL CURRICULUM'});
                                        console.log("2");
                                    }else{
                                        res.status(200).send({client: curriculumStored});
                                        console.log("3");
                                    }
                                
                                }
                            });                           
            }else{
                            res.status(400).send({message: 'EL CURRICULUM EXISTE'});

            }
        }
    });  

} //END saveClient

function getCurriculumClient2(req, res) {
    var clientId = req.params.id;



Curriculum.
aggregate([
   {
      $lookup:
        {
          from: "educations",
          localField: "education",
          foreignField: "userId",
          as: "education"
        }
    },
/*    {
        $project:{
            "education.userId": clientId
        }
     },*/
    {
      $lookup:
        {
          from: "languajes",
          localField: "languaje",
          foreignField: "userId",
          as: "languaje"
        }
   },   
   {
      $lookup:
        {
          from: "itskills",
          localField: "itSkill",
          foreignField: "userId",
          as: "itSkill"
        }
   },
   {
      $lookup:
        {
          from: "personalobjectives",
          localField: "personalobjective",
          foreignField: "userId",
          as: "personalobjective"
        }
   }]).exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                

                //Curriculum.
                //find({ userId: clientId }, function (err, adventure) {console.log(adventure);});

                res.status(200).send({
                    curriculum
                });
            }
        }

    });


/*    Curriculum.

    find({
        'userId': clientId
    }, '_id experience languaje itSkill education userId ').
    populate({
        path: 'userId',
        select: 'userName firstName lastName lastSureName title curp birthdate doNotCall phoneHome phoneMobile phoneWork primaryAddressStreet primaryAddressCity primaryAddressState primaryAddressPostalcode primaryAddressCountry picture'
    }).
    exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                console.log(curriculum);
                res.status(200).send({
                    curriculum
                });
            }
        }

    });*/
}

function getCurriculumClient1(req, res) {
    var clientId = req.params.id;

 Curriculum.

    find({
        'userId': clientId
    }, '_id experience languaje itSkill education userId ').
    populate({
        path: 'userId',
        select: 'userName firstName lastName lastSureName title curp birthdate doNotCall phoneHome phoneMobile phoneWork primaryAddressStreet primaryAddressCity primaryAddressState primaryAddressPostalcode primaryAddressCountry picture'
    }).
    exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                console.log(curriculum);
                res.status(200).send({
                    curriculum
                });
            }
        }

    });
}

function getCurriculumClient3(req, res) {
    var clientId = req.params.id;
Curriculum.
    find({
        'userId': clientId
    }, '_id education').
    populate({
        path: 'education'
    }).
    exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                console.log(curriculum);
                res.status(200).send({
                    curriculum
                });
            }
        }

    });
 /*Curriculum.
   find().populate({patch: 'userId'}).exec((err, educationCV) => {
        if(err){
            res.status(500).send({message:'Error de conexión a la BD'});
        }else{
            if(!educationCV){
                res.status(404).send({message: 'No existe el curso'});
            }else{
                Education.
                    populate(educationCV, {path: 'userId'}, (err, education) => {
                    
                    if(err){
                        res.status(500).send({message: 'Error en la peticiona la BD'});
                    }else{
                        res.status(200).send(educationCV);
                    }
                });
            }
        }
    });*/
    
}
function getCurriculumClient4(req, res) {

    var clientId = req.params.id;
    var certicateLanguaje = 'ToFL RUSo';
    var certificateScoreLanguaje= 500;
    var percentageLanguaje= 89;
    var languajeId=6;

    var certicateItSkill = 'scrum';
    var certificateScoreItSkill= 500;
    var percentageItSkill= 79;
    var skill= 'SCRUM';

Education.
    find({
       // 'userId': clientId
    }, '_id education languaje itSkill').
   /* populate({
        path: 'educationClient'
    }).*/
   /* populate({
        path: 'itSkillClient',
        match: { certificateScore: { $gte: certificateScoreItSkill }},
        match: { certificate: {$in: [ certicateItSkill.toUpperCase(), certicateItSkill.toLowerCase()] }},
        match: { percentage: { $gte: percentageLanguaje }},
        match: { skill: {$in: [ skill.toUpperCase(), skill.toLowerCase()] }}
 
    }). */   
    populate({
        path: 'languajeClient',
            populate:{
        path: 'itSkillClient',
        match: { certificateScore: { $gte: certificateScoreItSkill }},
        match: { certificate: {$in: [ certicateItSkill.toUpperCase(), certicateItSkill.toLowerCase()] }},
        match: { percentage: { $gte: percentageLanguaje }},
        match: { skill: {$in: [ skill.toUpperCase(), skill.toLowerCase()] }}
 
    },
        match: { certificateScore: { $gte: certificateScoreLanguaje }},
        match: { certificate: {$in: [ certicateLanguaje.toUpperCase(), certicateLanguaje.toLowerCase()] }},
        match: { percentage: { $gte: percentageLanguaje }},
        match: { languajeId: { $eq: languajeId }}
    }).        
    exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
                console.log(curriculum);
                res.status(200).send({
                    curriculum
                });
            }
        }

    });
 /*Curriculum.
   find().populate({patch: 'userId'}).exec((err, educationCV) => {
        if(err){
            res.status(500).send({message:'Error de conexión a la BD'});
        }else{
            if(!educationCV){
                res.status(404).send({message: 'No existe el curso'});
            }else{
                Education.
                    populate(educationCV, {path: 'userId'}, (err, education) => {
                    
                    if(err){
                        res.status(500).send({message: 'Error en la peticiona la BD'});
                    }else{
                        res.status(200).send(educationCV);
                    }
                });
            }
        }
    });*/
    
}
function getCurriculumClient(req, res) {
    /*var clientId = req.params.id;
    var certicateLanguaje = 'ToFL RUSo';
    var certificateScoreLanguaje= 500;
    var percentageLanguaje= 89;
    var languajeId=6;
*/

    var primaryAddressStateClient= req.params.pasc;
    var educationalLevelClient= req.params.elc;
    var degreeClient= req.params.dc;
    var certificateScoreLanguaje= req.params.csl;
    var certicateLanguaje = req.params.cl;
    var percentageLanguaje= req.params.pL;
    var languajeId=req.params.lid;
    var certicateItSkill = req.params.cis;
    var certificateScoreItSkill= req.params.csis;
    var percentageItSkill= req.params.pis;
    var skill= req.params.sk;

    console.log("primaryAddressStateClient="+ req.params.pasc);
    console.log("educationalLevelClient="+ req.params.elc);
    console.log("degreeClient="+ req.params.dc);
    console.log("certificateScoreLanguaje="+ req.params.csl);
    console.log("certicateLanguaje ="+ req.params.cl);
    console.log("percentageLanguaje="+ req.params.pL);
    console.log("languajeId="+req.params.lid);
    console.log("certicateItSkill ="+ req.params.cis);
    console.log("certificateScoreItSkill="+ req.params.csis);
    console.log("percentageItSkill="+ req.params.pis);
    console.log("skill="+ req.params.sk);

    //var certicateLanguaje = 'ToFL RUSo';
    //var certificateScoreLanguaje= 500;
    //var percentageLanguaje= 89;
    //var languajeId=6;

//    var certicateItSkill = 'scrum';
//    var certificateScoreItSkill= 500;
//    var percentageItSkill= 79;
//    var skill= 'SCRUM';

    var certicateItSkill = req.params.cis;
    var certificateScoreItSkill= req.params.csis;
    var percentageItSkill= req.params.pis;
    var skill= req.params.sk;


/*primaryAddressStateClient=9
educationalLevelClient=4
degreeClient=MERCADOTECNIA
certificateScoreLanguaje=500
certicateLanguaje =ToFL RUSo
percentageLanguaje=89
languajeId=6
certicateItSkill =scrum
certificateScoreItSkill=500
percentageItSkill=70
skill=SCRUM*/

Curriculum.
aggregate([
   {
         $lookup:
        {
          from: "educations",
          localField: "userId",
          foreignField: "education",
          let: {
                educationalLevel: "$educationalLevel"
          },
          as: "educationClient"           
        },
        pipeline: [
                {
                    $match: {

                        $expr: {
                         $and: [
                            {
                               $eq: [
                                  "$educationalLevel",
                                  1
                               ]
                            }
                        ]}
                    }
                }
        ]
    }
 //   { "$unwind": "$educationClient" },
    //{ $match: { educationalLevel: { $eq: 1 }}}
    ]).
    exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
               // console.log(curriculum);


                for(var i = 0; i < curriculum.length; i++) {

                    if((curriculum[i].languajeClient == null)||(curriculum[i].itSkillClient == null)||(curriculum[i].profileClient == null)) {
                       //curriculum.splice(i, 1);
                       // break;
                    }else{

                        console.log("");
                    }

                }

                console.log("************************************");
                console.log(JSON.stringify(curriculum, null, 2));
                console.log("************************************");
                res.status(200).send({
                    curriculum
                });
            }
        }

    });
 /*Curriculum.
   find().populate({patch: 'userId'}).exec((err, educationCV) => {
        if(err){
            res.status(500).send({message:'Error de conexión a la BD'});
        }else{
            if(!educationCV){
                res.status(404).send({message: 'No existe el curso'});
            }else{
                Education.
                    populate(educationCV, {path: 'userId'}, (err, education) => {
                    
                    if(err){
                        res.status(500).send({message: 'Error en la peticiona la BD'});
                    }else{
                        res.status(200).send(educationCV);
                    }
                });
            }
        }
    });*/
    
}

function getCurriculumClient5(req, res) {
    /*var clientId = req.params.id;
    var certicateLanguaje = 'ToFL RUSo';
    var certificateScoreLanguaje= 500;
    var percentageLanguaje= 89;
    var languajeId=6;
*/

    var primaryAddressStateClient= req.params.pasc;
    var educationalLevelClient= req.params.elc;
    var degreeClient= req.params.dc;
    var certificateScoreLanguaje= req.params.csl;
    var certicateLanguaje = req.params.cl;
    var percentageLanguaje= req.params.pL;
    var languajeId=req.params.lid;
    var certicateItSkill = req.params.cis;
    var certificateScoreItSkill= req.params.csis;
    var percentageItSkill= req.params.pis;
    var skill= req.params.sk;

    console.log("primaryAddressStateClient="+ req.params.pasc);
    console.log("educationalLevelClient="+ req.params.elc);
    console.log("degreeClient="+ req.params.dc);
    console.log("certificateScoreLanguaje="+ req.params.csl);
    console.log("certicateLanguaje ="+ req.params.cl);
    console.log("percentageLanguaje="+ req.params.pL);
    console.log("languajeId="+req.params.lid);
    console.log("certicateItSkill ="+ req.params.cis);
    console.log("certificateScoreItSkill="+ req.params.csis);
    console.log("percentageItSkill="+ req.params.pis);
    console.log("skill="+ req.params.sk);

    //var certicateLanguaje = 'ToFL RUSo';
    //var certificateScoreLanguaje= 500;
    //var percentageLanguaje= 89;
    //var languajeId=6;

//    var certicateItSkill = 'scrum';
//    var certificateScoreItSkill= 500;
//    var percentageItSkill= 79;
//    var skill= 'SCRUM';

    var certicateItSkill = req.params.cis;
    var certificateScoreItSkill= req.params.csis;
    var percentageItSkill= req.params.pis;
    var skill= req.params.sk;


/*primaryAddressStateClient=9
educationalLevelClient=4
degreeClient=MERCADOTECNIA
certificateScoreLanguaje=500
certicateLanguaje =ToFL RUSo
percentageLanguaje=89
languajeId=6
certicateItSkill =scrum
certificateScoreItSkill=500
percentageItSkill=70
skill=SCRUM*/

Curriculum.
    find({
    //    'userId': clientId
    }, '_id userId education languaje itSkill').
    /*populate({
        path: 'personalObjective'
    }).*/        
   populate({
        path: 'profileClient',
            match: { primaryAddressState: { $eq: primaryAddressStateClient },
        }
    }).   
    populate({
        path: 'educationClient',
                    match: { educationalLevel: { $eq: educationalLevelClient }},
                    match: { degree: { $eq: degreeClient.toUpperCase() }}
    }).  
/*   populate({
        path: 'profileClient',
        match: { primaryAddressState: { $eq: primaryAddressStateClient }}
    }). 
/
    populate({
        path: 'itSkillClient',
        match: { certificateScore: { $gte: certificateScoreItSkill }},
        match: { certificate: {$in: [ certicateItSkill.toUpperCase(), certicateItSkill.toLowerCase()] }},
        match: { percentage: { $gte: percentageLanguaje }},
        match: { skill: {$in: [ skill.toUpperCase(), skill.toLowerCase()] }}
 
    }).    
    populate({
        path: 'languajeClient',
        match: { certificateScore: { $gte: certificateScoreLanguaje }},
        match: { certificate: {$in: [ certicateLanguaje.toUpperCase(), certicateLanguaje.toLowerCase()] }},
        match: { percentage: { $gte: percentageLanguaje }},
        match: { languajeId: { $eq: languajeId }}
    }).*/        
    exec((err, curriculum) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                //console.log(curriculum);
                message: 'Error en la petición'
            });
        } else {
            if (!curriculum) {
                res.status(404).send({
                    message: 'EL CV EDUCACIONAL NO EXISTE'
                });
            } else {
               // console.log(curriculum);


                for(var i = 0; i < curriculum.length; i++) {

                    if((curriculum[i].languajeClient == null)||(curriculum[i].itSkillClient == null)||(curriculum[i].profileClient == null)) {
                       //curriculum.splice(i, 1);
                       // break;
                    }else{

                        console.log("");
                    }

                }

                console.log("************************************");
                console.log(JSON.stringify(curriculum, null, 2));
                console.log("************************************");
                res.status(200).send({
                    curriculum
                });
            }
        }

    });
 /*Curriculum.
   find().populate({patch: 'userId'}).exec((err, educationCV) => {
        if(err){
            res.status(500).send({message:'Error de conexión a la BD'});
        }else{
            if(!educationCV){
                res.status(404).send({message: 'No existe el curso'});
            }else{
                Education.
                    populate(educationCV, {path: 'userId'}, (err, education) => {
                    
                    if(err){
                        res.status(500).send({message: 'Error en la peticiona la BD'});
                    }else{
                        res.status(200).send(educationCV);
                    }
                });
            }
        }
    });*/
    
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



module.exports = {
   getCurriculumClient,saveCurriculum
};