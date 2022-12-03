const express=require('express');
const router=express.Router();
const isImage=require('is-image');
const User=require('../models/Users');

//uploads the images for the users and products
router.post('/', (request, response) => {
   if (/^image/.test(request.files.selectedFile.mimetype)){
        request.files.selectedFile.mv(`./Uploads/users/${request.files.selectedFile.name}`);
        //response.send({msg:"Image Uploaded Successfully",name:request.files.selectedFile.name});

        //the token is updated when the user is logging out.
      User.findOneAndUpdate(
         { _id: request.body.id }, 
         { $set: { userImage: request.files.selectedFile.name} })
      .then( result => {
         
         if(result){
             response.send({status:'success', msg: 'profile image changed successfully!. ' });
         }else{
            response.send({status:'failed', msg: 'Logout Failed' });
          }
      });
   }
   
});

module.exports=router;