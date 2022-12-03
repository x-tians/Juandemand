const express=require('express');
const router=express.Router();
const User=require('../models/Users');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let toks=null;
let pwd=null;

//the token is updated when the user is logging out.
router.patch('/',(request,response)=>{
    const date=new Date();
    const toks=bcrypt.hashSync(date+'-', salt);
    User.findOneAndUpdate(
        { token: request.body.token }, 
        { $set: { token: toks} })
    .then( result => {
        if(result){
            response.send({status:'success', msg: 'Logout success!. ' });
        }else{
            response.send({status:'failed', msg: 'Logout Failed' });
        }
    });
});

//find and match email and password
router.post('/',(request,response)=>{
    
        //find the email
        User.findOne({email:request.body.email}).then(result=>{
            if(result===null){
                response.send({status:'failed',decrypt:false });
            }else{
                 //match the password
                 const decrypt=bcrypt.compareSync(request.body.pwd, result.password);
                 if(decrypt){
                     toks=result.token;
                     pwd=request.body.password;
                     response.send({status:'success',decrypt,token:toks});
                 }else{
                     response.send({status:'failed',decrypt });
                 }
            }
        });
        
    
})

module.exports=router;
