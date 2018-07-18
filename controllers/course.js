'use strict'

var Course = require ('../models/course');


    function getCourse(req,res){
        var courseId = req.params.id;
        Course.findById(courseId,(err,course)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!course){
                    res.status(404).send({message:'EL curso NO EXISTE'});
                }else{
                    res.status(200).send({course});
                }
            }

        });
    }

function getCourses(req,res){
    Course.find({},(err,courses)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});
        }else{
            if(!courses){
                res.status(404).send({message:'LOS CURSOS NO EXISTEN'});
            }else{
                res.status(200).send({courses});
            }
        }

    });
}   


function saveCourse(req,res){
    var course= new Course();
    var params = req.body;
        
        course.userId= params.userId ;
	    course.courseId= params.courseId;
        course.course= params.courseId;
	    course.percentage= params.percentage ;
	    course.certificate= params.certificate ;
	    course.certificateScore= params.certificateScore ;
    	course.dateEntered =  getDate();
    	course.dateModified = params.dateModified;
    	course.ipModifiedUserId = params.ipModifiedUserId;
    	course.providerModifiedUserId = params.providerModifiedUserId;
    	course.modifiedUserId = params.modifiedUserId;
    	course.createdBy = params.createdBy;
    	course.description = params.description;


       course.save((err,courseStored)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});           
        }else{
            if(!courseStored){
                res.status(404).send({message:'NO SE HA GUARDADO EL CURSO'});
            }else{
                res.status(200).send({course: courseStored});
            }           
        }
    });

} 


function deleteCourse(req,res){
    var courseId = req.params.id;
    Course.findByIdAndRemove(courseId,(err,courseDeleted)=>{
        if(err){
             res.status(500).send({message:'ERROR AL ELIMINAR CURSO'});           
        }else{
            if(!courseDeleted){
                res.status(404).send({message:'NO SE HA ELIMINADO EL Curso'});
            }else{
                res.status(200).send({course: courseDeleted});
            }
           
        }
        
    });

}

    function getCoursesClient(req,res){
        var clientId = req.params.id;
        console.log("getEducation:"+clientId);

        Course.find({'userId':clientId},'certificate percentage certificateScore',(err,course)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!course){
                    res.status(404).send({message:'LOS CURSOS POR CLIENTE NO EXITEN'});
                }else{
                    res.status(200).send({course});
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
module.exports={getCourse,getCourses,saveCourse,deleteCourse,getCoursesClient};