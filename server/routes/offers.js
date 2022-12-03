const express=require('express');
const router=express.Router();
const Offer=require('../models/Offers');
const User=require('../models/Users');

//updating the the status of the offers
router.patch('/',(request,response)=>{
  
    const id=request.body.id;
    const stat=request.body.stat;

    Offer.findOneAndUpdate(
        { _id: id }, 
        { $set: { status: stat} })
    .then( result => {
        if(result){
            response.send({ status:'success',msg: 'Response sent.' });
        }else{
            response.send({status:'failed', msg: 'Error!, Updating Offer' });
        }
    });

})

//deleted the offers
router.delete('/:id',(request,response)=>{
  
    Offer.deleteOne({ _id: request.params.id })
    .then( result => {
        if( result.deletedCount === 1 ){
            response.send({ status: "success",msg:"Message has been Deleted Successfully" });
        }
    });
})

router.post('/read',(request,response)=>{
    User.findOne({token:request.body.token},{_id:1}).then(result=>{
        
        if(result._id){
            Offer.find({employee_ID:result._id}).populate('employer_ID',{firstName:1,lastName:1}).then(results=>{
                if(results.length>0){
                    response.send({status:'success', msg: results });
                }else{
                    response.send({status:'failed', msg: 'No Record Found!.' });
                }
            })
        }else{
            response.send({status:'failed', msg: 'Intruder Detected!.' });
        }
        
    })
})

//save Offers
router.post('/', async ( request, response ) => {
    User.findOne({token:request.body.token},{_id:1}).then(result=>{
        if(result._id){
            let offer={
                employer_ID:result._id,
                employee_ID:request.body.to,
                status:request.body.status
            };
            const newOffer = new Offer({
                ...offer
            });
            newOffer.save().then( result => { 
                if(result){
                    response.send({status:'success', msg: 'Request has been sent!. ' });
                }else{
                    response.send({status:'failed', msg: 'Insert Failed' });
                }
            })
            
        }else{
            response.send({status:'failed', msg: 'Intruder Detected!.' });
        }
    })

    
});


module.exports=router;