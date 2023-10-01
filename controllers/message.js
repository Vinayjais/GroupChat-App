const express = require('express');
const Message = require('../models/message');
const bodyParser = require('body-parser');
const User = require('../models/message');
const AWS = require('aws-sdk');
const multer = require('multer');
require('dotenv').config();


exports.PostMessage = (req,res,next) =>{
    const msg = req.body.message;
    const userId = req.user.id;
    const groupid = req.body.groupId;
   
    Message.create({

        message: msg,
        userId: userId,
        groupId: groupid
    })
    .then(()=>{
   
        res.status(200).json({success: true});
    })
     .catch((err) =>{
        console.log(err);
     });

     
};

exports.getMsg = (req,res,next) =>{
       
    const groupId = req.header('GroupId');
     const user = req.user.id;

     try {
         User.findOne({where:{id: user}})
         .then(()=>{
            Message.findAll({where:{groupId: groupId}})
            .then((msg) =>{
                //  console.log(msg)
                res.status(200).json({ success : true , messages : msg , userId: user});
            })
            .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err))

     } catch (error) {
        console.log(error);
     }
};



function uploadToS3(data , fileName){
    const BUCKET_NAME = process.env. BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;


    let s3Bucket = new AWS.S3({

       accessKeyId :IAM_USER_KEY,
       secretAccessKey : IAM_USER_SECRET,
      // bucket:BUCKET_NAME
    });

    
         const params = {
             Bucket : BUCKET_NAME,
             Key:  fileName,
             Body: data,
             ACL : 'public-read'
         }
  
          return new Promise( (res ,rej ) =>{
                  
            s3Bucket.upload(params,  (err, s3response) =>{
                if(err){

                    console.log("Somthing WentWrong..",err)
                    rej(err);

                }
                else{
                  console.log(s3response.Location);  
                     res(s3response.Location)
                }
          })
 
          })
       
    


};


exports.sendImage =( req, res, next) =>{
     

   
   console.log(req.file)

   

     if(req.file){
       
         
         const fileName = `image_${Date.now().toString()}.jpg`;
        uploadToS3( req.file.buffer, fileName)
        .then((result)=>{
            
            return res.json({message:'uploaded successfully', imgUrl: result})
            

        })
        .catch((err) =>{
          console.log(err)
        })
     }   
};
