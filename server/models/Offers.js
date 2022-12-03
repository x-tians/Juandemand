const mongoose=require('mongoose');
const offerSchema=new mongoose.Schema({
    employer_ID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    employee_ID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type:String,
        required:true,
        trim:true
    }
    
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Offer',offerSchema)