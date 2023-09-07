const mongoose=require('mongoose');
require('dotenv').config();
const uri=process.env.URL;
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' },
}

mongoose.connect(uri,options);
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));
db.once("open",function(){
    console.log("Connected Successfully");
});