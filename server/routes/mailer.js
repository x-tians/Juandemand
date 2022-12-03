const express=require('express');
const router=express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();
const SMTP_USER=process.env.SMTP_USER;
const SMTP_PWD=process.env.SMTP_PWD;
const User=require('../models/Users');

const between=(min, max)=>{  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
//send the otp to email of the user
router.get('/:email',(request, response)=>{
  User.findOne({email:request.params.email}).then(result=>{
        if(result===null){
            const otp=between(1000,10000);
            sendEmail(request.params.email,otp);
            console.log(otp);
            response.send({status:true,msg:'A confirmation code has been sent to your email.',otp});
        }else{
            response.send({status:false,msg:'Email address already taken.'});
        }
    })
});



const sendEmail=(email,otp)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SMTP_USER,
          pass: SMTP_PWD
        }
        
      });
      
      var mailOptions = {
        from: 'juandemand@gmail.com',
        to: email,
        subject: 'Registration Confirmation Code',
        html: `<h2 style='color: #2185d0; font-size:larger; font-weight: 100;'>JuanDemand</h2><br/>
        <h2 style='color: #1f1f1f; font-size:medium; font-weight: 100;' >Hello ${email},</h2><br/>
        <p>Here is your confirmation code.</p>
        <h3 style='font-size:larger'>${otp}</h3>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}



module.exports=router;