const express=require('express')
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const uploadImage=require('./routes/uploads');
const user=require('./routes/users');
const auth=require('./routes/auths');
const paginate = require('express-paginate');
const mailer=require('./routes/mailer');
const fileUpload = require('express-fileupload');
const Message = require('./routes/massages');
const Offer = require('./routes/offers');
const helmet = require('helmet');
const UserTypes=require('./routes/Usertypes');
require('dotenv').config();
const port=process.PORT || process.env.PORT;

//midddleware
const morgan=require('morgan');
const server=express();
server.use(fileUpload({
    limits: {
        fileSize: 10000000, // limit the uploaded image Around 10MB
    },
    abortOnLimit: true,
}));
server.use(paginate.middleware(10, 50));
server.use(express.static('Uploads/'))
server.use(cors());
server.use(bodyParser.json());
server.use('/api/v1/uploads',uploadImage);
server.use('/api/v1/auths',auth);
server.use('/api/v1/users',user);
server.use('/api/v1/mailer',mailer);
server.use('/api/v1/messages',Message);
server.use('/api/v1/offers',Offer);
server.use('/api/v1/usertypes',UserTypes);
server.use(morgan('dev'));
server.use(helmet());

// Database connection
mongoose.connect(process.env.URI);
const con =mongoose.connection;
con.once('open',()=>{
    console.log('database connection successful')
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

//process.on('uncaughtException', (e)=>{
//    console.log(e._message);
//  });




