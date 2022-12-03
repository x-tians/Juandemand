const mongoose=require('mongoose');
const userTypeSchema=new mongoose.Schema({
    userType:{
        type:String,
        required:true,
        trim:true
    }
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Usertype',userTypeSchema)