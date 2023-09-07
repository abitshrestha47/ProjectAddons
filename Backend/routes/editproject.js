const express=require('express');
const editprojectRouter=express.Router();
const Project=require('../models/Project');
const mongoose=require('mongoose');
// const {ObjectId}=require('bson');

editprojectRouter.get('/:id',async(req,res)=>{
    var ObjectID;
    const id=req.params.id;
        ObjectID= new mongoose.Types.ObjectId(id);
        console.log(ObjectID);
    try{
        const project=await Project.findById(ObjectID).exec();
        res.status(200).json(project);
    }catch(err){
        console.error('Error getting project',err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

editprojectRouter.put('/:id',async(req,res)=>{
    var ObjectID;
    const id=req.params.id;
    const {editprojectname,editdate}=req.body;
    ObjectID=new mongoose.Types.ObjectId(id);
    try{
        const updateProject={
            $set:{
                projectname:editprojectname,
                duedate:editdate,
            }
        }
        const project = await Project.findByIdAndUpdate(ObjectID, updateProject);
        if(project){
            res.status(200).json({message:'successfully updated'});
        }
    }catch(err){
        console.log(err.message);
    }
})

module.exports = editprojectRouter;