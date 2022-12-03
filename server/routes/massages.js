const express=require('express');
const router=express.Router();
const Message=require('../models/messages');

//save messages
router.post('/', async ( request, response ) => {
    let message=request.body.message;
    const newMessage = new Message({
        ...message
    });

    newMessage.save().then( result => { 
        if(result){
            response.send({status:'success', msg: 'Message send successfully!. ' });
        }else{
            response.send({status:'failed', msg: 'Insert Failed' });
        }
    })
});
 router.get('/:id',(request,response)=>{
    Message.find({to_ID:request.params.id}).populate('from_ID','email').then(result=>{
        if(result.length>0){
            response.send({status:'success',result});
        }else{
            response.send({ status:'failed', msg: 'No message found!' });
        }
    })
 })

 //updating the password of user information
router.patch('/:id',(request,response)=>{
    Message.findOneAndUpdate(
        { _id:request.params.id }, 
        { $set: { deletedFrom: request.body.deletedFrom,deletedTo:request.body.deletedTo} })
    .then( result => {
        if(result){
            response.send({status:'success', msg: 'Message deleted successfully!. ' });
        }else{
            response.send({status:'failed', msg: 'Delete Failed' });
        }
    });
})

module.exports=router;