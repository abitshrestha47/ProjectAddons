const express=require('express');
const filterprojects=express.Router();
const Project=require('../models/project');

filterprojects.get('/:id',async (req,res)=>{
    const id=req.params.id;
    console.log(id);
    try{
        const project=await Project.find({status:id}).exec();
        res.status(200).json(project);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports=filterprojects;