const express = require('express');
const router = express.Router();
const UserType=require('../models/Usertype')

/* Return all usertype*/
router.get('/', ( request, response ) => {
    UserType.find()
    .then( result => {
        if( typeof result === 'object' ){
            response.send( result );
        }
    });

});

// Create a new usertype
router.post('/', ( request, response ) => {
    let newUserType = new UserType( request.body );
    newUserType.save().then( result => {
        response.send({ status: "New usertype created" });
    });
});

// Update a usertype
router.put('/:id', ( request, response ) => {
    const id = request.params.id;
    Post.UserType(
        { _id: id }, 
        { $set: { ...request.body } })
    .then( result => {
        if( result.modifiedCount === 1 ){
            response.send({ status: "Usertype has been updated" });
        }
    });
});

// Delete a usertype
router.delete('/:id', ( request, response ) => {
    Post.deleteOne({ _id: request.params.id })
    .then( result => {
        if( result.deletedCount === 1 ){
            response.send({
                status: "Usertype has been deleted"
            });
        }
    });
});

module.exports = router;