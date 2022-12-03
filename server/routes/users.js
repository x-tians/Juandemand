const express=require('express');
const router=express.Router();
const User=require('../models/Users');
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const paginate = require('express-paginate');

//get all the addresses from the users
router.get('/address',(request,response)=>{
    User.find({},{address:1}).then(result=>{
        if(result!==null){
            response.send({ status:'success', msg: result});
        }else{
            response.send({ status:'failed', msg: 'Error! querying' });
        }
    })
})

//get all the addresses from the users
router.post('/filter',(request,response)=>{

    User.findOne({token:request.body.token}).then((result)=>{
        if(result!==null){
            if(request.body.work.trim()!=''){
                User.find(
                    { userType:{$ne:result.userType}, address: { $elemMatch: { municipality: request.body.municipality} }, skills: request.body.work  }
                 ).then(results=>{
                    response.send({status:'success',data: results});
                 })

            }else{
                User.find(
                    { userType:{$ne:result.userType}, address: { $elemMatch: { municipality: request.body.municipality} } }
                 ).then(results=>{
                    response.send({status:'success',data: results});
                 })
            }
            
        }else{
            response.send({ status:'failed', msg: 'No Record Found!' });
        }
    });

    
    
})


//get all user information
router.post('/user',(request,response)=>{
    User.findOne({token:request.body.token}).then(async(result)=>{
        if(result!==null){
            try {
                const [ results, itemCount ] = await Promise.all([
                    User.find({userType:{$ne:result.userType}}).populate('userType').limit(request.query.limit).skip(request.skip).lean().exec(),
                    User.count({})
                ]);
             
                const pageCount = Math.ceil(itemCount / request.query.limit);
                if(results.length>0){
                    response.send({
                        object: 'list',
                        has_more: paginate.hasNextPages(request)(pageCount),
                        data: results,
                        pageCount,
                        itemCount,
                        pages: paginate.getArrayPages(request)(pageCount, pageCount, request.query.page)
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }else{
            response.send({ status:'failed', msg: 'Error!, Intruder Detected!' });
        }
    })
})

//Retreive the user information
router.post('/profile',(request,response)=>{
    const userToken=request.body.token;
        User.findOne({token:userToken}).populate('userType').then(result=>{
            if(result!==null){
                //let users=result;
                //users.password=pwd;
                response.send({status:'success',result});
        }else{
            response.send({ status:'failed', msg: 'Error!, Intruder Detected!' });
        }
    });
})

//updating the user information
router.put('/',(request,response)=>{
    
    let userInfo=request.body.user;
    const userToken=request.body.token;
    User.updateOne(
        { token: userToken }, 
        { $set: { ...userInfo } })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status:'success', msg: 'Profile Updated Successfully!' });
        }else{
            response.send({ status:'failed', msg: 'Error!, Intruder Detected!' });
        }
    });
    
})

//updating the password of user information
router.patch('/',(request,response)=>{
  
    const oldPassword=request.body.oldPwd;
    const newPassword=request.body.newPwd;
    const userToken=request.body.userTok;
    const newEmail=request.body.email;
    
    User.findOne({token:userToken}).then(result=>{
        if(result===null){
            response.send({ msg: 'Intruder Detected.' });
        }else{
            const decrypt=bcrypt.compareSync(oldPassword, result.password);
            if(decrypt){
                const hashedPassword =  bcrypt.hashSync(newPassword, salt );
                User.findOneAndUpdate(
                    { token: userToken }, 
                    { $set: { password: hashedPassword,email:newEmail} })
                .then( result => {
                    if(result){
                        response.send({ status:'success',msg: 'Password Updated Successfully!.' });
                    }else{
                        response.send({status:'failed', msg: 'Error!, Intruder Detected!' });
                    }
                });
            }else{
                response.send({ msg: 'Invalid Old Password!.' });
            }
        }
    })
})

//save users
router.post('/', async ( request, response ) => {
    let users=request.body.user;
    const hashedPassword = await bcrypt.hash( users.password, 10 );
    const newUser = new User({
        ...users,
        password: hashedPassword
    });
    User.find({email:users.email}).then(result=>{
        if(result.length>0){
            response.send({status:'failed', msg: 'Email is already taken!. ' });
        }else{
            newUser.save().then( result => { 
                if(result){
                    response.send({status:'success', msg: 'Congratulations! You have successfully registered!. ' });
                }else{
                    response.send({status:'failed', msg: 'Insert Failed' });
                }
            })
        }
    })

});

module.exports=router;