const express=require('express');
const getProjectRouter=express.Router();
const Project=require('../models/Project');

getProjectRouter.get('/',async(req,res)=>{
    try{
        const projects=await Project.find({}).exec();
        res.status(200).json(projects);
    }catch(error){
        console.error('Error while getting project',error);
        res.status(500).json({error:'Internal Server Error'});
    }
});

module.exports=getProjectRouter;