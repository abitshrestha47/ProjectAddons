const express=require('express');
const updatestatusRouter=express.Router();
const Project=require('../models/project');
const mongoose=require('mongoose');

updatestatusRouter.put('/:id',async (req,res)=>{
    const {status}=req.body;
    const id=req.params.id;
    var ObjectID;
    ObjectID= new mongoose.Types.ObjectId(id);
    try{
        const updatedProject=await Project.findByIdAndUpdate(
        ObjectID,{$set:{status:status}},{new:true});
        res.json(updatedProject);
    }catch(err){
        console.log(err);
        res.status(500).json({ERROR:"internal server error"});
    }
})

module.exports=updatestatusRouter;