'use strict'

var Service = require('../../models/service/service');
var SubActivity = require('../../models/service/subActivity');
var Activity = require('../../models/service/activity');
var SubCategory = require('../../models/service/subCategory');
var Category = require('../../models/service/category');


var jwt  = require('../../services/jwt');
var fs = require('fs');      //manage files and directories
var Jimp = require("jimp"); // modify image
var path = require('path'); // directory tools

// get all  activity by id

function initService(req, res){
    console.log("hola");
    require('../../models/global');
    var user = req.params.id;
    var type = req.params.type;
    var baseUrl = baseClient;
    var tmp = tmpDir;
    var dir=baseUrl+'/'+user+'/'+type+'/'+'tmp';
    deleteDir(dir);
    res.status(200).send({ message: 'borrado'  });
          
}

function getActivity(req, res) {
    var activityId = req.params.id;
    Activity.find({ "activityId" : activityId},"_id activityId description"). 
    exec((err, activity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!activity) {
                res.status(404).send({
                    message: 'LA ACTIVIDAD NO EXISTE'
                });
            } else {
                res.status(200).send({
                    activity
                });
            }
        }

    });
}


//get all activities

function getActivities(req, res) {
    var activityId = req.params.id;
    Activity.find({},"_id activityId description"). 
    exec((err, activity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!activity) {
                res.status(404).send({
                    message: 'LA ACTIVIDAD NO EXISTE'
                });
            } else {
                res.status(200).send({
                    activity
                });
            }
        }

    });
}

// save activity

function saveActivity(req, res) {
    var activity = new Activity();
    var params = req.body;

    activity.activityId = params.activityId;
    activity.description = params.description;

    activity.save((err, activityStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!activityStored) {
                res.status(404).send({
                    message: 'NO SE HA GUARDADO LA ACTIVIDAD'
                });
            } else {
                res.status(200).send({
                    activity: activityStored
                });
            }

        }
    });

}

// get all sub-activities 

function getSubActivity(req, res) {
    var subActivityId = req.params.id2;
    var activityId = req.params.id;
    SubActivity.find({ "activityId" : activityId , "subActivityId" : subActivityId },"_id activityId subActivityId description"). 
    exec((err, subActivity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!subActivity) {
                res.status(404).send({
                    message: 'LA SUB ACTIVIDAD NO EXISTE'
                });
            } else {

                res.status(200).send({
                    subActivity
                });
            }
        }

    });
}

// gets the sub-activities depending on the main activity id

function getSubActivities(req, res) {
    var activityId = req.params.id;
    SubActivity.find({"activityId" : activityId  },"_id activityId subActivityId description"). 
    exec((err, subActivity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!subActivity) {
                res.status(404).send({
                    message: 'LA ACTIVIDAD NO EXISTE'
                });
            } else {
                res.status(200).send({
                    subActivity
                });
            }
        }

    });
}

// save subactivity

function saveSubActivity(req, res) {
    var subActivity = new SubActivity();
    var params = req.body;

    subActivity.activityId = params.activityId;
    subActivity.subActivityId = params.subActivityId;   
    subActivity.description = params.description;

    subActivity.save((err, subActivityStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!subActivityStored) {
                res.status(404).send({
                    message: 'NO SE HA GUARDADO LA ACTIVIDAD'
                });
            } else {
                res.status(200).send({
                    subActivity: subActivityStored
                });
            }

        }
    });

}


function getCategory(req, res) {
    var activityId = req.params.id;
    Category.find({ "activityId" : activityId},"_id activityId description"). 
    exec((err, activity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!activity) {
                res.status(404).send({
                    message: 'LA CATEGORIA NO EXISTE'
                });
            } else {
                console.log(activity);
                res.status(200).send({
                    activity
                });
            }
        }

    });
}



function getCategories(req, res) {
    var activityId = req.params.id;
    Category.find({},"_id activityId description"). 
    exec((err, activity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!activity) {
                res.status(404).send({
                    message: 'LA ACTIVIDAD NO EXISTE'
                });
            } else {
                res.status(200).send({
                    activity
                });
            }
        }

    });
}



// get all sub-activities 

function getSubCategory(req, res) {
    var subActivityId = req.params.id2;
    var activityId = req.params.id;
    SubCategory.find({ "activityId" : activityId , "subActivityId" : subActivityId },"_id activityId subActivityId description"). 
    exec((err, subActivity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!subActivity) {
                res.status(404).send({
                    message: 'LA SUB ACTIVIDAD NO EXISTE'
                });
            } else {

                res.status(200).send({
                    subActivity
                });
            }
        }

    });
}


function getSubCategories(req, res) {
    var activityId = req.params.id;
    SubCategory.find({"activityId" : activityId  },"_id activityId subActivityId description"). 
    exec((err, subActivity) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!subActivity) {
                res.status(404).send({
                    message: 'LA ACTIVIDAD NO EXISTE'
                });
            } else {
                res.status(200).send({
                    subActivity
                });
            }
        }

    });
}

function saveCategory(req, res) {
    var activity = new Category();
    var params = req.body;

    activity.activityId = params.activityId;
    activity.description = params.description;

    activity.save((err, activityStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!activityStored) {
                res.status(404).send({
                    message: 'NO SE HA GUARDADO LA ACTIVIDAD'
                });
            } else {
                res.status(200).send({
                    activity: activityStored
                });
            }

        }
    });

}

function saveSubCategory(req, res) {
    var subActivity = new SubCategory();
    var params = req.body;

    subActivity.activityId = params.activityId;
    subActivity.subActivityId = params.subActivityId;   
    subActivity.description = params.description;

    subActivity.save((err, subActivityStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!subActivityStored) {
                res.status(404).send({
                    message: 'NO SE HA GUARDADO LA ACTIVIDAD'
                });
            } else {
                res.status(200).send({
                    subActivity: subActivityStored
                });
            }

        }
    });

}

function getImageServiceFile(req,res){
    var imageFile= req.params.imageFile;
    var userId= req.params.userId;
    var serviceId= req.params.serviceId;
    var type= req.params.type;

    var pathFile = './uploads/clients/'+userId+'/'+type+'/'+serviceId+'/'+imageFile;
    fs.exists(pathFile,function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
                res.status(404).send({message:'NO EXISTE LA IMAGEN'+ pathFile })         

        }
    });
}//getImageServiceFile




function getServicesByUserId(req, res) {
    var userId = req.params.id;
    Service.find({ "userId" : userId, "deleted" : false},"_id activityId subActivityId deleted description dateEntered mainImage descriptionService status price title type userId"). 
    exec((err, service) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!service) {
                res.status(404).send({
                    message: 'El SERVICIO NO EXISTE'
                });
            } else {
                res.status(200).send({
                    service
                });
            }
        }

    });
}//

function getServicesByUserId(req, res) {
    var userId = req.params.id;
    Service.find({ "userId" : userId, "deleted" : false},"_id activityId subActivityId deleted description dateEntered mainImage descriptionService status price title type userId"). 
    exec((err, service) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!service) {
                res.status(404).send({
                    message: 'El SERVICIO NO EXISTE'
                });
            } else {
                res.status(200).send({
                    service
                });
            }
        }

    });
}//
function getServicesByUserIdAndActivityAndSubActivity(req, res) {
    var userId = req.params.serviceUserId;
    var serviceId = req.params.serviceId;
    var activityId = req.params.activityId;    
    var subActivityId = req.params.subActivityId;
    
    Service.find({ "userId" : userId, "_id":serviceId, "activityId":activityId, "subActivityId":subActivityId ,"deleted" : false},"_id activityId subActivityId deleted description dateEntered mainImage descriptionService status price title type userId"). 
    exec((err, service) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!service) {
                res.status(404).send({
                    message: 'El SERVICIO NO EXISTE'
                });
            } else {
                res.status(200).send({
                    service
                });
            }
        }

    });
}//

function deleteService(req, res) {
    var service = new Service();
    var params = req.body;
    var serviceId = params._id;

    console.log("entro");
    console.log(params);

    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }


    service.dateModified = getDate();
    service.modifiedUserId = params.userId;
    service.ipModifiedUserId = ip;
    service.providerModifiedUserId = params.providerModifiedUserId;
    service.description = 'controller service.js';



    if (serviceId != null || serviceId != 'undefined') {
        Service.findByIdAndUpdate(serviceId, {

            deleted: true,
            dateModified: service.dateModified,
            modifiedUserId: service.modifiedUserId,
            ipModifiedUserId: service.ipModifiedUserId,
            providerModifiedUserId: service.providerModifiedUserId,
            description: service.description
        }, (err, serviceDeleted) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!serviceDeleted) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL CLIENTE'
                    });
                } else {
                    res.status(200).send({
                        service: serviceDeleted
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
} //deleteService

function pauseService(req, res) {
    
    var service = new Service();
    var params = req.body;
    var serviceId = params._id;


    service.dateModified = getDate();
    service.modifiedUserId = params.userId;
    //service.ipModifiedUserId = ip;
    service.providerModifiedUserId = params.providerModifiedUserId;
    service.description = 'controller service.js';



    if (serviceId != null || serviceId != 'undefined') {
        Service.findByIdAndUpdate(serviceId, {

            status: 0,
            dateModified: service.dateModified,
            modifiedUserId: service.modifiedUserId,
            ipModifiedUserId: service.ipModifiedUserId,
            providerModifiedUserId: service.providerModifiedUserId,
            description: service.description
        }, (err, serviceDeleted) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!serviceDeleted) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL CLIENTE'
                    });
                } else {
                    res.status(200).send({
                        service: serviceDeleted
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
} //pauservice

function activeService(req, res) {
    
    var service = new Service();
    var params = req.body;
    var serviceId = params._id;


    service.dateModified = getDate();
    service.modifiedUserId = params.userId;
    //service.ipModifiedUserId = ip;
    service.providerModifiedUserId = params.providerModifiedUserId;
    service.description = 'controller service.js';



    if (serviceId != null || serviceId != 'undefined') {
        Service.findByIdAndUpdate(serviceId, {

            status: 1,
            dateModified: service.dateModified,
            modifiedUserId: service.modifiedUserId,
            ipModifiedUserId: service.ipModifiedUserId,
            providerModifiedUserId: service.providerModifiedUserId,
            description: service.description
        }, (err, serviceDeleted) => {
            if (err) {
                res.status(500).send({
                    message: 'ERROR ACTUALIZAR REGISTRO'
                });
            } else {
                if (!serviceDeleted) {
                    res.status(404).send({
                        message: 'NO SE HA ACTUALIZADO EL CLIENTE'
                    });
                } else {
                    res.status(200).send({
                        service: serviceDeleted
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
} //activeservice


//upload image

function uploadimages(req, res) {

    var service = new Service();
    var userId = req.params.id;
    var type = req.params.type;
    var file_name = 'NOT UPLOAD'; // set inicial name



    if (userId == req.user.sub) { //user id vs middleware autheticated
        if (req.files.Filedata) { //get file data
            var file_path = req.files.Filedata.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var filde_dir = file_split[0] + '\\' + file_split[1] + '\\';
            var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];

            if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg') {


                var dir = makeUserDir(filde_dir, userId, type , 'tmp');
                /* create image in the default directory 
                2.- copy this in user directory
                3.- resize image in tmp directory
                4.- delete the first image (upload)
                */
                createImages(filde_dir, userId, type, dir, file_name, file_ext, 10);
                var images;

                //deleteImage( filde_dir+file_name);

                /*               
                a delay is created to wait for the image to upload correctly,
                then the array of the images contained in the directory is obtained
                */

                setTimeout(function() {
                    images = getDirectoryFiles(filde_dir, userId, type+'/tmp');
                    deleteImage( filde_dir+file_name);
                    res.status(200).send(images);
                }, 2000);
            }

        }
    }
}//uploadimages

function uploadimages2(req, res) {

    var service = new Service();
    var userId = req.params.id;
    var type = req.params.type;
    var serviceId = req.params.service;  
    var file_name = 'NOT UPLOAD'; // set inicial name



    if (userId == req.user.sub) { //user id vs middleware autheticated
        if (req.files.Filedata) { //get file data
            var file_path = req.files.Filedata.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var filde_dir = file_split[0] + '\\' + file_split[1] + '\\';
            var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];

            if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg') {


                var dir = makeUserDir(filde_dir, userId, type , serviceId);
                console.log("********************************************");
                console.log(dir);
                console.log("********************************************");

                /* create image in the default directory 
                2.- copy this in user directory
                3.- resize image in tmp directory
                4.- delete the first image (upload)
                */
                createImages(filde_dir, userId, type, dir, file_name, file_ext, 10);
                var images;

                //deleteImage( filde_dir+file_name);

                /*               
                a delay is created to wait for the image to upload correctly,
                then the array of the images contained in the directory is obtained
                */

                setTimeout(function() {
                    images = getDirectoryFiles(filde_dir, userId, type+'/'+serviceId);
                    deleteImage( filde_dir+file_name);
                    res.status(200).send(images);
                }, 2000);
            }

        }
    }
}//uploadimages

function delteFirstFile(file_dir){
    fs.rename('/path/to/Afghanistan.png', '/path/to/AF.png', function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
}



function makeUserDir(file_dir,userId,type,tmp){
    var dir = file_dir + userId;
    //create user dir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    var dir = dir+'/' + type;;
    //create user dir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    
    var dir = dir+'/' + tmp;;
    //create user dir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }


    return (dir);
}





function createImages(file_dir,userId,type, dir, file_name, file_ext, maxImages) {


                var files=fs.readdirSync(dir, files);
                if (!files) {
                    res.status(404).send({
                        message: 'Error en el archivo'
                    });
                } else {
                    var name = 0;
                    name = file_name;
                    resizeImage(file_dir, dir, file_name, name);
                    deleteOldestFile(dir,maxImages);
                }
    return(file_name);


}


function getDirectoryFiles(file_dir, userId, type) {
    var dir= file_dir +  userId + '/'+ type;
    var files=fs.readdirSync(dir, files).sort();;
            var out = [];
            files.forEach(function(file) {
                var stats = fs.statSync(dir + "/" + file);
                if(!(file.substr(0, 4)=="tmb_")){
                    if (stats.isFile()) {
                        out.push({
                            "file": file
                        });
                    }
                }
            });
                return(out);

}

function getMainImagesService(req, res) {

    var userId = req.params.userId;
    var type = req.params.type;
    var serviceId = req.params.serviceId;  
    var activityId = req.params.activityId;  
    var subActivityId = req.params.subActivityId;  


    var service = new Service();

    Service.find({"userId" : userId, "_id" : serviceId,
                  "activityId" :activityId ,"subActivityId" :subActivityId  },"mainImage"). 
    exec((err, mainImage) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!mainImage) {
                res.status(404).send({
                    message: 'LA ACTIVIDAD NO EXISTE'
                });
            } else {
                console.log(mainImage[0].mainImage);

                var ImageFile= mainImage[0].mainImage;
                var pathFile = './uploads/clients/'+userId+'/'+type+'/'+serviceId+'/'+ImageFile;
                console.log(pathFile);
                fs.exists(pathFile,function(exists){
                    if(exists){
                        res.sendFile(path.resolve(pathFile));
                    }else{
                            res.status(404).send({message:'NO EXISTE LA IMAGEN'})         

                    }
                });




            }
        }

    });
}

function getMainImagesServiceByName(req, res) {

    var userId = req.params.userId;
    var type = req.params.type;
    var serviceId = req.params.serviceId;  
    var activityId = req.params.activityId;  
    var subActivityId = req.params.subActivityId;  
    var ImageFile = req.params.image;  



                var pathFile = './uploads/clients/'+userId+'/'+type+'/'+serviceId+'/'+ImageFile;
                console.log(pathFile);
                fs.exists(pathFile,function(exists){
                    if(exists){
                        res.sendFile(path.resolve(pathFile));
                    }else{
                            res.status(404).send({message:'NO EXISTE LA IMAGEN'})         

                    }
                });



}

function getImagesServiceDirectoryFiles(req, res) {

    var userId = req.params.userId;
    var type = req.params.type;
    var serviceId = req.params.serviceId;  
    var activityId = req.params.activityId;  
    var subActivityId = req.params.subActivityId;  

    var dir= "uploads/clients/" +  userId + '/'+ type+ '/'+serviceId+ '/';
    console.log(dir);
        fs.exists(dir,function(exists){
        if(exists){
                console.log("existe");
        }else{
                console.log("no existe");         

        }
    });

    var files=fs.readdirSync(dir, files).sort();;
            var out = [];
            files.forEach(function(file) {
                var stats = fs.statSync(dir + "/" + file);
                if(!(file.substr(0, 4)=="tmb_")){
                    if (stats.isFile()) {
                        out.push({
                            "file": file
                        });
                    }
                }
            });
                console.log(out);
                res.status(200).send({out});

}
function deleteOldestFile(dir,maxImages) {
    //console.log("el directorio es "+ dir);
    var fs = require("fs");
    var num = 0;
    var num2 = 0;


 var files=fs.readdirSync(dir, files);

 var out = [];
    files.forEach(function(file) {
        var stats = fs.statSync(dir + "/" +file);
        if(stats.isFile()) {
            out.push({"file":file, "mtime": stats.mtime.getTime()});
        }
    });
    num=files.length-1;
    num=num-1;
    num2=num+1;

    if(files.length>=maxImages){
        //console.log(out);
        out.sort(function(a,b) {
            return b.mtime - a.mtime;
        })
        deleteImage( dir+ '/' + out[num].file);
        deleteImage( dir+ '/' + out[num2].file);
    }
    



}

function resizeImage(filde_dir,dir,file_name,name){

    resizeImageBig(filde_dir,dir,file_name,name);
    name = 'tmb_'+name;
    resizeImageSmall(filde_dir,dir,file_name,name)
}//resizeImage

function resizeImageSmall(filde_dir,dir,file_name,name){

    var file =filde_dir+file_name;
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(64, 64)            // resize 
             .quality(75)                 // set JPEG quality 
            // .greyscale()                 // set greyscale 
             .write(dir+'/'+name); // save 
             if(err){console.log(err);}
    });
}//resizeImage

function resizeImageBig(filde_dir,dir,file_name,name){

    var file =filde_dir+file_name;
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(300, 300)            // resize 
             .quality(100)                 // set JPEG quality 
            // .greyscale()                 // set greyscale 
             .write(dir+'/'+name); // save 
             if(err){console.log(err);}
    });
}//resizeImage

function deleteImage(file){
    var fs = require("fs");
    fs.unlinkSync(file);
}// deleteImage

function deleteDir(path){
var fs = require('fs');
var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
deleteFolderRecursive(path);
}// deleteDir

function deleteImageByClientID(userId,filde_dir){
   var client= new Client();
    Client.findById(userId,(err,clientStored)=>{
           if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!client){
                    res.status(404).send({message:'EL CLIENTE NO EXISTE'});
                }else{
                    if(clientStored){
                        //sconsole.log(clientStored);
                          fs.unlink(filde_dir+clientStored.picture,(err)=>{
                                if(err){console.log('extension no valida y no se borroxtttt')}else{ console.log('Extension no valida tttt')}
                            });
                         
                            fs.unlink(filde_dir+'tmb_'+clientStored.picture,(err)=>{
                                if(err){console.log('extension no valida y no se borroxtttt')}else{ console.log('Extension no valida tttt')}
                            });
                //res.status(200).send({client});              
                    }
                }
            }                        

    });
}//end deleteImageByClientID


function createDirIfNotExist (directory, callback) {
  return new Promise(function (resolve, reject) {
    fs.stat(directory, function (err, stats) {
      // Check if error defined and the error code is "not exists"
      if (err) {
        if (err.code === 'ENOENT') {
          fs.mkdir(directory, (err) => {
            if (err) reject(err)
            resolve('made folder')
          })
        } else {
          // just in case there was a different error:
          reject(err)
        }
      } else {
        resolve('folder already existed')
      }
    })
  })
}

function getimagefile(req,res){
    var ImageFile= req.params.ImageFile;
    var pathFile = './uploads/clients/'+ImageFile;
    fs.exists(pathFile,function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
                res.status(404).send({message:'NO EXISTE LA IMAGEN'})         

        }
    });
}//getimagefile

function getimageUserServicefile(req,res){

    var service = new Service();

    var userId = req.params.userId;
    var serviceId = req.params.serviceId;
    var mainImage = req.params.mainImage;
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"); 

    console.log(userId); 
    console.log(serviceId);
    console.log(mainImage);

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"); 


       Service.find({'userId':userId, '_id': serviceId, 'mainImage':mainImage  },'mainImage',(err,imageService)=>{
            if(err){
                res.status(500).send({message:'Error en la petición.'});
            }else{
                if(!imageService){
                    res.status(404).send({message:'La imagen no existe.'});
                }else{
                    res.status(200).send({imageService});
                    console.log("todo")
                }
            }

        });


}//getimageUserServicefile

function saveService(req, res) {
    var service = new Service();
    var params = req.body;
    require('../../models/global');
    console.log(params.type);
    service.userId = params.userId;
    service.type = params.type;
    service.activityId = params.activityId;
    service.subActivityId = params.subActivityId;
    service.title = params.title;
    service.price = params.price;
    service.status = params.status;
    service.descriptionService = 'service.js';
    service.mainImage = params.mainImage;
    service.aceptedByAdministrator = params.aceptedByAdministrator;
    service.dateEntered = getDate();
    service.dateModified = params.dateModified;
    service.ipModifiedUserId = params.ipModifiedUserId;
    service.providerModifiedUserId = params.providerModifiedUserId;
    service.modifiedUserId = params.modifiedUserId;
    service.createdBy = params.createdBy;
    service.description = params.description;
    service.deleted = params.deleted;

    service.save((err, serviceStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!serviceStored) {
                res.status(404).send({
                    message: 'NO SE HA GUARDADO EL SERVICIO'
                });
            } else {
                changeServiceTmpDir(baseClient, serviceStored.userId, '/'+service.type, '/tmp', serviceStored._id);
                //console.log(serviceStored);
                res.status(200).send({
                    service: serviceStored
                });
            }

        }
    });

}//saveService

function updateService(req, res) {

    var service = new Service();
    var params = req.body;
    require('../../models/global');
    service._id = params._id;
    service.userId = params.userId;
    service.activityId = params.activityId;
    service.subActivityId = params.subActivityId;
    service.title = params.title;
    service.price = params.price;
    service.description = params.description;
    service.mainImage = params.mainImage;
    service.dateModified = getDate();
    service.ipModifiedUserId = params.ipModifiedUserId;
    service.providerModifiedUserId = params.providerModifiedUserId;
    service.modifiedUserId = params.modifiedUserId;
    service.descriptionService = 'service.js';




    if(service.userId != null || service.userId  != 'undefined'){
        Service.findByIdAndUpdate(service._id,
                                {
                                title: service.title,
                                price: service.price,
                                description: service.description,
                                mainImage: service.mainImage,
                                dateModified: service.dateModified ,
                                ipModifiedUserId: service.ipModifiedUserId,
                                providerModifiedUserId: service.providerModifiedUserId,
                                modifiedUserId: service.modifiedUserId,
                                descriptionService: service.descriptionService
                                },(err,serviceUpdated)=>{
                                if(err){
                                    res.status(500).send({message:'ERROR ACTUALIZAR REGISTRO'});           
                                }else{
                                    if(!serviceUpdated){
                                        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
                                    }else{
                                        res.status(200).send({service: serviceUpdated});
                                    }
                                
                                }
                                
                            });
    }else{
        console.log("DATOS INVALIDOS PARA ACTUALIZAR ");
        res.status(404).send({message:'NO SE HA ACTUALIZADO EL SERVICIO'});
    }
  
}//updateService
function changeServiceTmpDir(dir,user,type,tmp,id){
    var fs = require('fs');
    fs.rename(dir+user+type+tmp, dir+user+type+'/'+id, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
}



function getDate(){

    var toDay = new Date();
    var dd = toDay.getDate();
    var mm = toDay.getMonth()+1; //hoy es 0!
    var yyyy = toDay.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    toDay = dd+'/'+mm+'/'+yyyy;
    return (toDay);
}


module.exports={initService, saveService,updateService,getActivity, getActivities,saveActivity,getSubActivity, getSubActivities,getCategory,getCategories,getSubCategory,getSubCategories,saveSubCategory,saveCategory,getMainImagesService,getMainImagesServiceByName,getImagesServiceDirectoryFiles, getimageUserServicefile,saveSubActivity,uploadimages,uploadimages2,getimagefile,getServicesByUserId,getImageServiceFile,deleteService,pauseService,activeService,getServicesByUserIdAndActivityAndSubActivity};
