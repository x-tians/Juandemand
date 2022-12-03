const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    from_ID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    to_ID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    dateTime:{
        type:Date,
        required:true,
        trim:true
    },
    seen:{
        type:Number,
        required:true,
        trim:true
    },
    deletedTo:{
        type:Number,
        required:true,
        trim:true
    },
    deletedFrom:{
        type:Number,
        required:true,
        trim:true
    }
    
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Message',messageSchema)