const express=require('express');
const filterprojects=express.Router();
const Project=require('../models/Project');
const mongoose=require('mongoose');

filterprojects.get('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const project=await Project.findById(id).exec();
        res.status(200).json(project);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports=filterprojects;