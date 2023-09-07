const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    projectname:{
        type:String,
        required:true,
    },
    duedate:{
        type:Date,
        required:true,
    },
    status:{
        type:Number,
        enum:[0,1,2],
        default:0,
    }
})

const Project=mongoose.model("projects",projectSchema);
module.exports=Project;