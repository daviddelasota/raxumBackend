/******************************************************************************
NAME client Controller
AUTOR DAVID DE LA SOTA
DESCRIPTION  controllador de usuarios de RAXUM
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

'use strict'
var bcrypt = require('bcrypt-nodejs');
var Client = require ('../models/client');
var jwt  = require('../services/jwt');

var fs = require('fs');
var Jimp = require("jimp");


var path = require('path');


function prueba(req,res){
        var params = req.body;
        console.log("entro");
       // console.log(req.body,userName);
        console.log(params.userName);


}


/******************************************************************************
NAME getClient
AUTOR DAVID DE LA SOTA
DESCRIPTION obtiene cliente deacuerdo a un parametro establecido
DATE 17/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

    function getClient(req,res){
        var clientId = req.params.id;
        Client.findById(clientId,(err,client)=>{
            if(err){
                res.status(500).send({message:'Error en la petición'});
            }else{
                if(!client){
                    res.status(404).send({message:'EL CLIENTE NO EXISTE'});
                }else{
                    res.status(200).send({client});
                }
            }

        });
    }//getClient



/******************************************************************************
NAME getClients
AUTOR DAVID DE LA SOTA
DESCRIPTION devuelve todos los usuarios
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

function getClients(req,res){
    Client.find({},(err,clients)=>{
        if(err){
             res.status(500).send({message:'Error en la petición'});
        }else{
            if(!clients){
                res.status(404).send({message:'LOS CLIENTES NO EXISTEN'});
            }else{
                res.status(200).send({clients});
            }
        }

    });
}   

/******************************************************************************
NAME saveClient
AUTOR DAVID DE LA SOTA
DESCRIPTION inserta usuarios de la base de datos encriptando la contraseña
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

function saveClient(req,res){
    var client= new Client();
    var params = req.body;

    console.log(params.userName);

    Client.findOne({userName:client.userName})

    client.userName=params.userName;

    Client.findOne({userName:client.userName.toLowerCase()},(err,duplicateClient)=>{
        if(err){             
            res.status(500).send({message:'Error en la petición de la existencia de usuario'});           
        }else{
            if(!duplicateClient){
                            bcrypt.hash(params.userHash,null,null,function(err,hash){
                                client.userHash= hash;
                            });
                            
                            client.systemGeneratedPassword=params.systemGeneratedPassword;
                            client.pwdLastChanged=params.pwdLastChanged;
                            client.authenticateId=params.authenticateId;
                            client.receiveNotifications=params.receiveNotifications;
                            
                            client.firstName = params.firstName;
                            client.lastName = params.lastName;
                            client.lastSureName = params.lastSureName;
                            client.title = params.title;
                            client.curp = params.curp;
                            client.birthdate = params.birthdate;
                            client.doNotCall = params.doNotCall;
                            client.phoneHome = params.phoneHome;
                            client.phoneMobile = params.phoneMobile;
                            client.phoneWork = params.phoneWork;
                            client.primaryAddressStreet = params.primaryAddressStreet;
                            client.primaryAddressCity = params.primaryAddressCity;
                            client.primaryAddressState = params.primaryAddressState;
                            client.primaryAddressPostalcode = params.primaryAddressPostalcode;
                            client.primaryAddressCountry = params.primaryAddressCountry;
                            client.picture = params.picture;
                            client.dateEntered =  getDate();
                            client.dateModified = params.dateModified;
                            client.ipModifiedUserId = params.ipModifiedUserId;
                            client.providerModifiedUserId = params.providerModifiedUserId;
                            client.modifiedUserId = params.modifiedUserId;
                            client.createdBy = params.createdBy;
                            client.description = params.description;
                            client.deleted = params.deleted;

                            client.save((err,clientStored)=>{
                                if(err){
                                    res.status(500).send({message:'Error en la petición'});           
                                }else{
                                    if(!clientStored){
                                        res.status(404).send({message:'NO SE HA GUARDADO EL ALBUM'});
                                    }else{
                                        res.status(200).send({client: clientStored});
                                    }
                                
                                }
                            });                           
            }else{
                            res.status(400).send({message: 'EL CLIENTE EXISTE'});

            }
        }
    });  

} //END saveClient

/******************************************************************************
NAME updateClient
AUTOR DAVID DE LA SOTA
DESCRIPTION actualiza usuarios de la base de datos 
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
function updateClient(req,res){
    var client= new Client();

    var clientId = req.params.id;
    var params = req.body;

    console.log("EL CLIENTE A A CTUALIZAR ES "+clientId);
    client.title = params.title;
    client.curp = params.curp;
    client.doNotCall = params.doNotCall;
    client.phoneHome = params.phoneHome;
    client.phoneMobile = params.phoneMobile;
    client.phoneWork = params.phoneWork;
    client.primaryAddressStreet = params.primaryAddressStreet;
    client.primaryAddressCity = params.primaryAddressCity;
    client.primaryAddressState = params.primaryAddressState;
    client.primaryAddressPostalcode = params.primaryAddressPostalcode;
    client.primaryAddressCountry = params.primaryAddressCountry;
    client.picture = params.picture;
    client.dateModified = getDate();
    client.modifiedUserId = params.modifiedUserId;
    client.ipModifiedUserId = params.ipModifiedUserId;
    client.providerModifiedUserId = params.providerModifiedUserId;

    console.log("client.doNotCall"+client.doNotCall);
    console.log("clientId"+clientId);
    var getIP = require('ipware')().get_ip;

console.log(req.connection.remoteAddress);
var ipInfo = getIP(req);
    console.log(ipInfo);


    if(clientId != null || clientId  != 'undefined'){
        Client.findByIdAndUpdate(clientId,
                                {
                                title:client.title,
                                curp:client.curp,
                                doNotCall:client.doNotCall,
                                phoneHome:client.phoneHome,
                                phoneMobile:client.phoneMobile,
                                phoneWork:client.phoneWork,
                                primaryAddressStreet:client.primaryAddressStreet,
                                primaryAddressCity:client.primaryAddressCity,
                                primaryAddressState:client.primaryAddressState,
                                primaryAddressPostalcode:client.primaryAddressPostalcode,
                                primaryAddressCountry:client.primaryAddressCountry,
                                picture:client.picture, 
                                dateModified: client.dateModified, 
                                modifiedUserId: client.modifiedUserId,
                                ipModifiedUserId: client.ipModifiedUserId,
                                providerModifiedUserId: client.providerModifiedUserId   
                                },(err,clientUpdated)=>{
                                if(err){
                                    res.status(500).send({message:'ERROR ACTUALIZAR REGISTRO'});           
                                }else{
                                    if(!clientUpdated){
                                        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
                                    }else{
                                        res.status(200).send({client: clientUpdated});
                                    }
                                
                                }
                                
                            });
    }else{
        console.log("DATOS INVALIDOS PARA ACTUALIZAR 2");
        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
    }
}//updateClient

/******************************************************************************
NAME deleteClient
AUTOR DAVID DE LA SOTA
DESCRIPTION elimina usuario de la base de datos actualiza a a 0 variable 
DATE 16/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
function deleteClient(req,res){
    var client= new Client();

    var clientId = req.params.id;
    var params = req.body;

    client.deleted = params.deleted;
    client.dateModified = getDate();
    client.modifiedUserId = params.modifiedUserId;
    client.ipModifiedUserId = params.ipModifiedUserId;
    client.providerModifiedUserId = params.providerModifiedUserId;

    if(clientId != null || clientId  != 'undefined'){
        Client.findByIdAndUpdate(clientId,
                                {
                                deleted:client.deleted,
                                dateModified: client.dateModified, 
                                modifiedUserId: client.modifiedUserId,
                                ipModifiedUserId: client.ipModifiedUserId,
                                providerModifiedUserId: client.providerModifiedUserId   
                                },(err,clientUpdated)=>{
                                if(err){
                                    res.status(500).send({message:'ERROR ACTUALIZAR REGISTRO'});           
                                }else{
                                    if(!clientUpdated){
                                        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
                                    }else{
                                        res.status(200).send({album: clientUpdated});
                                    }
                                
                                }
                                
                            });
    }else{
        console.log("DATOS INVALIDOS PARA ACTUALIZAR 2");
        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
    }
}//deleteClient

/******************************************************************************
NAME loginClient
AUTOR DAVID DE LA SOTA
DESCRIPTION login del usuario
DATE 17/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

function loginClient(req,res){
    var client= new Client();
    var params = req.body;
    var userName= params.userName;
    client.userName=params.userName;
    client.userHash=params.userHash

    Client.findOne({userName:client.userName.toLowerCase()},(err,clientStored)=>{
        if(err){             
            res.status(500).send({message:'Error en la petición de la existencia de usuario'});           
        }else{
            if(clientStored){
                bcrypt.compare(client.userHash,clientStored.userHash,(err,check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({token: jwt.createToken(clientStored)});
                        }else{
                            res.status(200).send({clientStored});    
                        }
                    }else{
                        res.status(404).send({mesage:'el usuario no ha podido loguearse password incorrecto'});
                    }
                });

            }
            else{
                res.status(200).send({mesage:'el usuario no ha podido loguearse usuario no registrado'});
            }
        }
    });
}//end loginClient

/******************************************************************************
NAME deleteImageByClientID
AUTOR DAVID DE LA SOTA
DESCRIPTION elimina imagen previa del usuario para evitar acomulaciones
DATE 17/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

function deleteImageByClientID(userId,filde_dir){
   var client= new Client();
   console.log("el usuario es"+userId+"el documento file es"+filde_dir); 
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

function resizeImage64(filde_dir,file_name){

//var dir = '.';

    //var gm = require('../')
   // var gm = require('gm');
    var file =filde_dir+file_name;

Jimp.read(file, function (err, lenna) {
    if (err) throw err;
    lenna.resize(64, 64)            // resize 
         .quality(90)                 // set JPEG quality 
        // .greyscale()                 // set greyscale 
         .write(filde_dir+'tmb_'+file_name); // save 

         if(err){console.log(err);}
});


}//resizeImage

function resizeImage150(filde_dir,file_name){

//var dir = '.';

    //var gm = require('../')
   // var gm = require('gm');
    var file =filde_dir+file_name;

Jimp.read(file, function (err, lenna) {
    if (err) throw err;
    lenna.resize(150, 150)            // resize 
         .quality(100)                 // set JPEG quality 
        // .greyscale()                 // set greyscale 
         .write(filde_dir+'tmb2_'+file_name); // save 

         if(err){console.log(err);}
});


}//resizeImage


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


function uploadimages(req,res){
console.log("----------------------------------------");
           
           var client= new Client();
           var userId = req.params.id;
           var file_name= 'NOT UPLOAD';
           console.log("req.user.sub");
           console.log(req.user.sub);
           console.log("----------------------------------------");
           console.log(req.files.Filedata);
           console.log("----------------------------------------");
           
        if(userId==req.user.sub){ //user id vs middleware autheticated
            if(req.files.Filedata){
                var file_path = req.files.Filedata.path;
                var file_split= file_path.split('\\');
                var file_name = file_split[2];
                var filde_dir = file_split[0] +'\\'+ file_split[1]+'\\';
                var ext_split = file_name.split('\.');
                var file_ext = ext_split[1];
             //   console.log(userId+"->>>>>>>>>>>>>>>>>>>"+req.user.sub)
                //
                if(file_ext == 'png' || file_ext=='jpg' || file_ext== 'jpeg'){

                        
                        console.log(file_path);
                        console.log(file_split);
                        console.log(file_name);
                        console.log(filde_dir);
                        console.log(ext_split);
                        console.log(file_ext);

                }
            }
        }



}


/******************************************************************************
NAME uploadimage
AUTOR DAVID DE LA SOTA
DESCRIPTION sube imagen avatar y actualiza nombre eb la base de datos
DATE 18/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/

function uploadimage(req,res){
           var client= new Client();
           var userId = req.params.id;
           var file_name= 'NOT UPLOAD';
           console.log("req.body");
           console.log(req.body);
           //console.log("----------------------------------------");
           


           //console.log("REQ FILES"+JSON.stringify(req.files.name));
        if(userId==req.user.sub){ //user id vs middleware autheticated
            if(req.files){
                var file_path = req.files.image.path;
                var file_split= file_path.split('\\');
                var file_name = file_split[2];
                var filde_dir = file_split[0] +'\\'+ file_split[1]+'\\';
                var ext_split = file_name.split('\.');
                var file_ext = ext_split[1];
             //   console.log(userId+"->>>>>>>>>>>>>>>>>>>"+req.user.sub)
                //
                if(file_ext == 'png' || file_ext=='jpg' || file_ext== 'jpeg'){
                        
                        //console.log(cliente);


deleteImageByClientID(userId,filde_dir);
//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+filde_dir+file_name);
resizeImage64(filde_dir,file_name);
resizeImage150(filde_dir,file_name);
//654654654



                        Client.findByIdAndUpdate(userId,
                                                {
                                                picture:file_name,
                                                dateModified: getDate(), 
                                                modifiedUserId: userId,
                                                ipModifiedUserId: req.params.ipModifiedUserId,
                                                providerModifiedUserId: req.params.providerModifiedUserId,
                                                description:'controlers/client/.uploadimage'}
                                                ,{new: true},(err, clientUpdated)=>{
                                                if(err){
                                                    res.status(500).send({message:'ERROR ACTUALIZAR REGISTRO'});           
                                                }else{
                                                    if(!clientUpdated){
                                                        res.status(404).send({message:'NO SE HA ACTUALIZADO EL CLIENTE'});
                                                    }else{
                                                        res.status(200).send({client:  clientUpdated, picture:file_name});
                                                    }
                                                
                                                }
                                                
                                            });
                }else{
                    fs.unlink(file_path,(err)=>{
                        if(err){console.log('extension no valida y no se borrox')}else{ console.log('Extension no valida xxx')}
                    });
                    res.status(200).send({message:'EXTENSION NO VALIDA'})                  
                }
            }else{
                res.status(200).send({message:'NO SE DETECTO FICHERO'})
            }
        }else{return res.status(500).send({message:'USUARIO NO VALIDO PARA ACTUALIZAR'})}
}//uploadimage

/******************************************************************************
NAME getimagefile
AUTOR DAVID DE LA SOTA
DESCRIPTION muestra en navegador una imagen dada segun el nombre de un archivo
DATE 20/08/2017
MODIFICATION 00/00/0000
MODIFICATION DESCRIPTION
MODIFICATION USER
******************************************************************************/
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
module.exports={prueba,getClient,getClients,saveClient,updateClient,deleteClient,loginClient,uploadimage,uploadimages,getimagefile};